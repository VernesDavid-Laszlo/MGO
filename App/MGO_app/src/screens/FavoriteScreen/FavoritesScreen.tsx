import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, RefreshControl} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ProductCard from '../../components/ProductCard/ProductCard';

const FavoritesScreen: React.FC = () => {
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  type Product = {
    id: string;
    category: string;
    description: string;
    images: string[];
    price: string;
    product_name: string;
    user: string;
  };

  const fetchFavorites = useCallback(async () => {
    setIsRefreshing(true);
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites) {
      const ids = JSON.parse(favorites);
      const products: Product[] = [];

      for (const id of ids) {
        const docSnap = await firestore().collection('products').doc(id).get();
        if (docSnap.exists) {
          const productData = docSnap.data() as Product;

          // Fetch image URLs from Firebase Storage
          const imageUrls = await Promise.all(
            productData.images.map(async imageName => {
              try {
                const imageRef = storage().ref(`Products/${ids}/${imageName}`);
                return await imageRef.getDownloadURL();
              } catch (error) {
                console.error(
                  `Error fetching image URL for ${imageName}:`,
                  error,
                );
                return ''; // Return an empty string or a placeholder image URL
              }
            }),
          );

          products.push({...productData, id: docSnap.id, images: imageUrls});
        }
      }

      setFavoriteProducts(products);
    }
    setIsRefreshing(false);
  }, []); // Add any dependencies used in fetchFavorites, if necessary

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <FlatList
      data={favoriteProducts}
      keyExtractor={item => item.id}
      renderItem={({item}) => <ProductCard product={item} />}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={fetchFavorites}
          title="Refreshing..." // This is for iOS
        />
      }
    />
  );
};

export default FavoritesScreen;
