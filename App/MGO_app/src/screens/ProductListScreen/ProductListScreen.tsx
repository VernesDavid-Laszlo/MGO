import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
  Text,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ProductCard from '../../components/ProductCard/ProductCard';
import {Colors} from '../../utils/Colors';
import {RouterKey} from '../../routes/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/RoutesMapping';
import {RouteProp} from '@react-navigation/native';

// Define the Product type based on your Firestore data structure
type Product = {
  id: string;
  category: string;
  description: string;
  images: string[];
  price: string;
  product_name: string;
  product_name_lowercase: string;
  user: string;
};

type ProductListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  RouterKey.PRODUCTLIST
>;

type ProductListScreenRouteProp = RouteProp<
  RootStackParamList,
  RouterKey.PRODUCTLIST
>;

type ProductListScreenProps = {
  navigation: ProductListScreenNavigationProp;
  route: ProductListScreenRouteProp;
};
const ProductListScreen: React.FC<ProductListScreenProps> = ({route}) => {
  const {categoryId} = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchProducts = async () => {
    setIsLoading(true);
    setIsRefreshing(true);

    try {
      const querySnapshot = await firestore()
        .collection('products')
        .where('category', '==', categoryId)
        .get();

      const fetchedProductsPromises = querySnapshot.docs.map(async doc => {
        const productData = doc.data() as Omit<Product, 'id'>;
        const productId = doc.id; // Get the product ID from the document

        const imageUrls = await Promise.all(
          productData.images.map(async imageName => {
            const imageRef = storage().ref(
              `Products/${productId}/${imageName}`,
            );
            try {
              const imageUrl = await imageRef.getDownloadURL();
              return imageUrl;
            } catch (error) {
              console.error(`Error fetching image ${imageName}:`, error);
              return ''; // Return an empty string or a placeholder image URL
            }
          }),
        );

        return {
          ...productData,
          id: doc.id,
          images: imageUrls.filter(url => url !== ''), // Filter out any empty strings
        };
      });

      const fetchedProducts = await Promise.all(fetchedProductsPromises);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const onRefresh = () => {
    fetchProducts();
  };

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Sorry, currently no products available in this category.
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={({item}) => <ProductCard product={item} />}
        ListEmptyComponent={renderEmptyComponent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            title="Refreshing..." // This is for iOS
          />
        }
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#757575',
    textAlign: 'center',
  },
  loadingContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  loadingText: {
    fontSize: 18,
    color: Colors.WHITE,
  },
});

export default ProductListScreen;
