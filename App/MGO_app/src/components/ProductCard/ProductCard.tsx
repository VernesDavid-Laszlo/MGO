import React, {useState, useEffect} from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeartBlack from '../../assets/heart.svg';
import HeartRed from '../../assets/heart2.svg';
import {RouterKey} from '../../routes/Routes';
import {Colors} from '../../utils/Colors';

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
      favoriteIds = favoriteIds.filter(id => id !== product.id);
    } else {
      favoriteIds.push(product.id);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoriteIds));
    setIsFavorited(!isFavorited);
  };

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
            navigation.navigate(RouterKey.PRODUCT_DETAILS_CARD, {product: product})
        }>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};
// Add your StyleSheet styles here

const styles = StyleSheet.create({
  heartIcon: {
    left: 320,
    bottom: 15,
  },
  mailicons: {
    left: 280,
    top: 9,
  },
  card: {
    backgroundColor: Colors.LIGHTGRAY,
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    elevation: 3, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  button: {
    backgroundColor: Colors.PURPLE,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProductCard;
