import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeartBlack from '../../assets/heart.svg';
import HeartRed from '../../assets/heart2.svg';
import {RouterKey} from '../../routes/Routes';
import {styles} from './ProductCardStyle';

type Product = {
  id: string;
  category: string;
  description: string;
  images: string[];
  price: string;
  product_name: string;
  user: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const navigation = useNavigation();
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const favorites = await AsyncStorage.getItem('favorites');
      if (favorites) {
        const ids = JSON.parse(favorites);
        setIsFavorited(ids.includes(product.id));
      }
    };

    checkFavoriteStatus();
  }, [product.id]);

  const handleFavoritePress = async () => {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoriteIds = favorites ? JSON.parse(favorites) : [];

    if (favoriteIds.includes(product.id)) {
      // @ts-ignore
      favoriteIds = favoriteIds.filter(id => id !== product.id);
    } else {
      favoriteIds.push(product.id);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoriteIds));
    setIsFavorited(!isFavorited);
  };

  // @ts-ignore
  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={handleFavoritePress}>
        {isFavorited ? (
          <HeartRed style={styles.heartIcon} />
        ) : (
          <HeartBlack style={styles.heartIcon} />
        )}
      </TouchableOpacity>
      <Image source={{uri: product.images[0]}} style={styles.image} />
      <Text style={styles.name}>{product.product_name}</Text>
      <Text style={styles.name}>{product.price}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate(RouterKey.PRODUCT_DETAILS_CARD, {product})
        }>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductCard;
