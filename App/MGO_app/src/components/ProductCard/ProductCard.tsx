import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';

type Product = {
  id: string;
  category: string;
  description: string;
  images: string[]; // Array of image URLs
  price: string;
  product_name: string;
  product_name_lowercase: string;
  user: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const firstImageUrl = product.images[0];

  return (
    <View style={styles.card}>
      <Image source={{uri: firstImageUrl}} style={styles.image} />
      <Text style={styles.name}>{product.product_name}</Text>
      <Text style={styles.name}>{product.price}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );
};

// Add your StyleSheet styles here

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
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
    backgroundColor: '#007bff',
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
