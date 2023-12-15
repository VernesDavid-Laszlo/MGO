import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {styles} from './HomeScreenStyle';
import {
  collection,
  getFirestore,
} from '@react-native-firebase/firestore/lib/modular';
import {getDocs} from '@react-native-firebase/firestore/lib/modular/query';

type Category = {
  id: string;
  image: string;
  category_name: string;
};

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const colRef = collection(db, 'category');

      try {
        const snapshot = await getDocs(colRef);
        const categoriesData = snapshot.docs.map(doc => {
          const data = doc.data() as Category;
          return {
            id: doc.id,
            ...data,
          };
        });
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data from Firestore:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.appStyle}>
      <Text style={styles.bodyText}>Main Categories</Text>
      <View style={styles.cardContainer}>
        {categories.map(category => (
          <View key={category.id} style={styles.categoryItem}>
            <Image
              source={{uri: category.image}}
              style={styles.categoryImage}
              onError={e => {
                console.log('Error loading image:', e.nativeEvent.error);
              }}
            />
            <Text style={styles.categoryText}>{category.category_name}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomePage;
