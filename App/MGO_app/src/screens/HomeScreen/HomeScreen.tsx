import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  Text,
  View,
} from 'react-native';
import {styles} from './HomeScreenStyle';
import {
  collection,
  getFirestore,
} from '@react-native-firebase/firestore/lib/modular';
import {getDocs} from '@react-native-firebase/firestore/lib/modular/query';
import storage from '@react-native-firebase/storage';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../routes/RoutesMapping';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {RouterKey} from '../../routes/Routes';

type Category = {
  id: string;
  image: string;
  category_name: string;
};

type DrawerNavProp = DrawerNavigationProp<
  RootStackParamList,
  RouterKey.DRAWERNAVIGATION
>;

const HomePage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<DrawerNavProp>();
  const openDrawer = () => {
    navigation.openDrawer();
  };

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
  const renderCategory = ({item}: {item: Category}) => (
    <View style={styles.categoryItem}>
      <Text style={styles.categoryText}>{item.category_name}</Text>

      <Image source={{uri: item.image}} style={styles.categoryImage} />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.appStyle}>
      <Button title="Menu" onPress={openDrawer} />
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
