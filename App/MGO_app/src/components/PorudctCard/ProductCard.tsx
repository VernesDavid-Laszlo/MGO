import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import storage from '@react-native-firebase/storage';
import styles from './ProductCardStyle';
type CardProps = {
  text: string;
  imageSrc: string;
  categoryId: string;
  navigation: any;
};

const Card: React.FC<CardProps> = ({
  text,
  imageSrc,
  categoryId,
  navigation,
}) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const imageRef = storage().ref(`Home_category_images/${imageSrc}`);
        const url = await imageRef.getDownloadURL(); // Correct way to get the download URL
        setImageUrl(url);
      } catch (error) {
        console.error(
          'Error fetching image URL from Firebase Storage: ',
          error,
        );
      }
    };

    fetchImageUrl();
  }, [imageSrc]);
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductScreen', {categoryId})}>
      <View style={styles.imageContainer}>
        {imageUrl ? (
          <Image source={{uri: imageUrl}} style={styles.cardImage} />
        ) : (
          <Text>Loading image...</Text>
        )}
      </View>
      <Text style={styles.cardText}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Card;
