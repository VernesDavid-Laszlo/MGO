import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  collection,
  getFirestore,
} from '@react-native-firebase/firestore/lib/modular';
import {styles} from './HomeScreenStyle';
import {RouterKey} from '../../routes/Routes';
import storage from '@react-native-firebase/storage';
import {getDocs} from '@react-native-firebase/firestore/lib/modular/query';
import {RootStackParamList} from '../../routes/RoutesMapping';
import {StackNavigationProp} from '@react-navigation/stack';

type Category = {
  id: string;
  image: string;
  category_name: string;
};
type HomePageNavigationProp = StackNavigationProp<
  RootStackParamList,
  RouterKey.HOME_SCREEN
>;
const HomePage: React.FC<{navigation: HomePageNavigationProp}> = ({
  navigation,
}) => {
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

  const handleCategoryPress = (categoryId: string) => {
    console.log('Homepage category id given to the listscreen: ' + categoryId);
    navigation.navigate(RouterKey.PRODUCTLIST, {categoryId});
  };

  const renderCategory = ({item}: {item: Category}) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => handleCategoryPress(item.id)}>
      <Text style={styles.categoryText}>{item.category_name}</Text>
      <Image source={{uri: item.image}} style={styles.categoryImage} />
    </TouchableOpacity>
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
    <View style={styles.appStyle}>
      <Text style={styles.bodyText}>Main Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        numColumns={2}
      />
    </View>
  );
};

export default HomePage;
