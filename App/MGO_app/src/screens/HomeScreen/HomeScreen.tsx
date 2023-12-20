import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ScrollView, Text, View} from 'react-native';
import {styles} from './HomeScreenStyle';
import {
  collection,
  getFirestore,
} from '@react-native-firebase/firestore/lib/modular';
import {getDocs} from '@react-native-firebase/firestore/lib/modular/query';
import storage from '@react-native-firebase/storage';

type Category = {
  id: string;
  image: string;
  category_name: string;
};
const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const colRef = collection(db, 'category');

      try {
        setIsLoading(true);
        const snapshot = await getDocs(colRef);
        const categoryDataPromises = snapshot.docs.map(async doc => {
          const data = doc.data() as Category;
          const imageRef = storage().ref(`Home_category_images/${data.image}`);
          const imageUrl = await imageRef.getDownloadURL();
          return {
            id: doc.id,
            image: imageUrl,
            category_name: data.category_name,
          };
        });

        const categoriesData = await Promise.all(categoryDataPromises);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.appStyle}>
      <Text style={styles.bodyText}>Main Categories</Text>
      <View style={styles.cardContainer}>
        {categories.map(category => (
          <View key={category.id} style={styles.categoryItem}>
            <Image
              source={{uri: category.image}}
              style={styles.categoryImage}
            />
            <Text style={styles.categoryText}>{category.category_name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomePage;
