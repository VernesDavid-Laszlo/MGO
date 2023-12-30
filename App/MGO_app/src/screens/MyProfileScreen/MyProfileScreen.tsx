import React, {useEffect, useState} from 'react';
import getStorage from '@react-native-firebase/storage';
import ref from '@react-native-firebase/storage';
import getDownloadURL from '@react-native-firebase/storage';
import getDocs, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import DocumentSnapshot from '@react-native-firebase/firestore';
import DocumentData from '@react-native-firebase/firestore';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert, ScrollView,
} from 'react-native';
import FirebaseApp from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from './MyProfileScreenStyle';
import {query} from '@react-native-firebase/database/lib/modular/query';
import {
  deleteDoc,
  where,
} from '@react-native-firebase/firestore/lib/modular/query';
import getDoc from '@react-native-firebase/firestore';
import {doc} from '@react-native-firebase/firestore/lib/modular';
const MyProfileScreen: React.FC = () => {
  const [productList, setProductList] = useState<any[]>([]);
  const [productId, setProductId] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isProd, setIsProd] = useState<boolean>(true);
  const [showProducts, setShowProducts] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('');
  const [userPhoneNum, setUserPhoneNum] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  // Render your component with the updated state

  const userDocRef = doc(firestore(), 'users', 'your_user_id'); // Replace with actual user ID

  const fetchResultsMP = (querySnapshot: any) => {
    querySnapshot.forEach(async (doc: any, index: number) => {
      const productData = [doc.data(), doc.id, index + 1];
      setProductList(prevUserList => [...prevUserList, productData]);
      const storageRef = getStorage().ref(`Products/${doc.id}`);
      const imageUrl = await storageRef
        .child(doc.data().images[0])
        .getDownloadURL();
      setImageUrls(imageUrls => [...imageUrls, imageUrl]);
    });
  };

  const myProducts = () => {
    const currentUser = auth().currentUser;
    const productsRef = firestore().collection('products');
    const productsQuery = productsRef.where('user', '==', currentUser?.uid);

    productsQuery
      .get()
      .then(querySnapshot => {
        const productsPromises: Promise<any>[] = [];
        const productIds: string[] = [];
        querySnapshot.forEach(doc => {
          const productData = doc.data();
          const prodId = doc.id;
          const imageRef = getStorage().ref(
            `Products/${doc.id}/${productData.images[0]}`,
          );

          const imagePromise = imageRef.getDownloadURL().then(imageUrl => ({
            ...productData,
            imageUrl,
          }));

          productIds.push(prodId);
          productsPromises.push(imagePromise);
        });

        return Promise.all(productsPromises).then(productsWithImages => ({
          productsWithImages,
          productIds,
        }));
      })
      .then(({productsWithImages, productIds}) => {
        setProductList(productsWithImages);
        setProductId(productIds);
        console.log(productIds);
        if (productsWithImages.length === 0) {
          setIsProd(!isProd);
        }
      })
      .catch(error => {
        console.error('Error getting products: ', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser) {
          const userDocRef = firestore().doc(`users/${currentUser.uid}`);
          const userDocSnapshot = await userDocRef.get();

          if (userDocSnapshot) {
            const userData = userDocSnapshot.data();
            setUsername(userData?.userName || '');
            setUserAddress(userData?.address || '');
            setUserCity(userData?.city || '');
            setUserPhoneNum(userData?.phoneNumber || '');
            setUserEmail(userData?.email || '');
            console.log('User data:', userData);
            myProducts();
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteMP = (userId: string) => {
    deleteDoc(doc(firestore(), 'products', userId))
      .then(() => {
        Alert.alert('Product deleted');
        setProductList(prevUserList =>
          prevUserList.filter(user => user[1] !== userId),
        );
      })
      .catch((error: any) => {
        console.error('Error deleting product: ', error);
      });
  };

  const toggleProducts = () => {
    if (showProducts) {
      setProductList([]);
    } else {
      myProducts();
    }
    setShowProducts(!showProducts);
  };

  return (
    <View>
      {/*<Header />*/}
      <ScrollView style={styles.bodyMP}>
        <View style={styles.cardContainerMP}>
          <View>
            <Text style={styles.myProfileTitle}>Your Profile {username}</Text>
          </View>
          <View style={styles.userProfileForm}>
            <View style={styles.newAddress}>
              <Text style={styles.labelText}>Address:</Text>
              <Text style={styles.text}>{userAddress}</Text>
            </View>
            <View style={styles.newAddress}>
              <Text style={styles.labelText}>City:</Text>
              <Text style={styles.text}>{userCity}</Text>
            </View>
            <View style={styles.newAddress}>
              <Text style={styles.labelText}>Number:</Text>
              <Text style={styles.text}>{userPhoneNum}</Text>
            </View>
            <View style={styles.newAddress}>
              <Text style={styles.labelText}>Email:</Text>
              <Text style={styles.text}>{userEmail}</Text>
            </View>
          </View>
        </View>

        <View style={styles.myProfileProducts}>
          <Text style={{fontSize: 24, margin: 10}}>Your Products</Text>
          {isProd ? (
            <TouchableOpacity onPress={toggleProducts}>
              <Text style={styles.productsButton}>{showProducts ? 'Hide' : 'Show'} My Products</Text>
            </TouchableOpacity>
          ) : (
            <Text>No products yet</Text>
          )}

          <View style={styles.myProfilePageProductList}>
            {productList.map((productData, index) => {
              try {
                return (
                  <View key={index} style={styles.productContainer}>
                    <Image
                      source={{uri: productData.imageUrl}}
                      style={styles.productImage}
                    />
                    <View style={styles.productInfo}>
                      <Text style={styles.productListItem}>
                        Name:&nbsp;&nbsp; {productData.product_name}
                      </Text>
                      <Text style={styles.productListItem}>
                        Price: &nbsp;&nbsp; {productData.price}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleDeleteMP(productId[index])}>
                      <Text style={styles.deleteButton}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                );
              } catch (error) {
                console.error('Error rendering product:', error);
                return null;
              }
            })}
          </View>
        </View>

        <View style={styles.footerMyProfile}>{/*<Footer />*/}</View>
      </ScrollView>
    </View>
  );
};

export default MyProfileScreen;
