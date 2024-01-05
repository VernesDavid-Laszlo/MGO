import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Text,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ProductCard from '../../components/ProductCard/ProductCard';
import {Colors} from '../../utils/Colors';

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

type ProductListScreenProps = {
  route: {
    params: {
      categoryId: string;
    };
  };
};

const ProductListScreen: React.FC<ProductListScreenProps> = ({route}) => {
  const {categoryId} = route.params;
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
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
      }
    };

    fetchProducts();
  }, [categoryId]);

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        Sorry, currently no products available in this category.
      </Text>
    </View>
  );
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={item => item.id}
          renderItem={({item}) => <ProductCard product={item} />}
          ListEmptyComponent={renderEmptyComponent} // Use this prop to render the empty component
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  // ... (existing styles)
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
    flex: 1,
    justifyContent: 'center', // Középre helyezi a tartalmat függőlegesen
    alignItems: 'center', // Középre helyezi a tartalmat vízszintesen
    backgroundColor: Colors.BACKGROUND_COLOR,
    padding: 20,
  },
  loadingText: {
    fontSize: 18, // Betűméret
    marginBottom: 10,
    color: Colors.WHITE,
  },
});
export default ProductListScreen;
