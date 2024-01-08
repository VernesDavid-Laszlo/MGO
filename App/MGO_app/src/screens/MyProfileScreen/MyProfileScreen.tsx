import React, {useEffect, useState} from 'react';
import getStorage from '@react-native-firebase/storage';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import styles from './MyProfileScreenStyle';
import {deleteDoc} from '@react-native-firebase/firestore/lib/modular/query';
import {doc} from '@react-native-firebase/firestore/lib/modular';
import EditIcon from '../../assets/edit.svg';
import {RouterKey} from '../../routes/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/RoutesMapping';
type MyProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  RouterKey.MYPROFILE_SCREEN
>;
const MyProfileScreen: React.FC<{
  navigation: MyProfileScreenNavigationProp;
}> = ({navigation}) => {
  const [productList, setProductList] = useState<any[]>([]);
  const [productId, setProductId] = useState<string[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isProd, setIsProd] = useState<boolean>(true);
  const [showProducts, setShowProducts] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [userAddress, setUserAddress] = useState<string>('');
  const [userCity, setUserCity] = useState<string>('');
  const [userPhoneNum, setUserPhoneNum] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  // Render your component with the updated state
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
    myProducts();
  };

  const toggleProducts = () => {
    if (showProducts) {
      setProductList([]);
    } else {
      myProducts();
    }
    setShowProducts(!showProducts);
  };
  const handleEditScreenNavigation = () => {
    navigation.navigate(RouterKey.EDIT_SCREEN);
  };

  return (
    <View>
      <ScrollView style={styles.bodyMP}>
        <View style={styles.cardContainerMP}>
          <View>
            <TouchableOpacity onPress={handleEditScreenNavigation}>
              <EditIcon style={styles.editIcon} />
            </TouchableOpacity>
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
              <Text style={styles.productsButton}>
                {showProducts ? 'Hide' : 'Show'} My Products
              </Text>
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
