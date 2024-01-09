import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import {
  collection,
  doc,
  getFirestore,
  updateDoc,
} from '@react-native-firebase/firestore/lib/modular';
import {getDocs} from '@react-native-firebase/firestore/lib/modular/query';
import getStorage from '@react-native-firebase/storage';
import styles from './ProductDetailsCardStyle';
import {Linking} from 'react-native';
import {useRoute} from '@react-navigation/native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ProductDetailsCard = () => {
  const navigationRoute = useRoute();
  const product = navigationRoute.params.product;

  const [productData, setProductData] = useState(route.params.product);
  const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isRatingModalOpen, setRatingModalOpen] = useState<boolean>(false);
  const [newRating, setNewRating] = useState<number>(0);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);
  const firestore = getFirestore();

  const rateUser = async (userId: string, rating: number) => {
    try {
      // Get reference to the user document
      const userRef = doc(firestore, 'users', userId);

      // Fetch the current user document
      const userDoc = await userRef.get();
      const userData = userDoc.data();

      // Calculate the new average rating
      const currentRatings: number[] = userData?.rating || [];
      const totalRatings = currentRatings.length;
      const currentTotalRating = currentRatings.reduce((sum, r) => sum + r, 0);

      const newTotalRating = currentTotalRating + rating;
      const newAverageRating = newTotalRating / (totalRatings + 1);

      // Update the rating field with the new average
      await updateDoc(userRef, {
        rating: [rating, ...currentRatings],
        averageRating: newAverageRating,
      });

      Alert.alert('Your review was successful');

      // Update userRating state to trigger re-render
      setUserRating(newAverageRating);
      setHasReviewed(true);
    } catch (error) {
      console.error('Error rating user:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const productsCollection = collection(db, 'products');
        const productsSnapshot = await getDocs(productsCollection);

        if (!productsSnapshot.empty) {
          // Assuming there's only one product for demonstration
          const productDoc = productsSnapshot.docs[0];
          const productData = productDoc.data();

          setProductData(productData);

          // Fetch image URLs from Firebase Storage
          const storage = getStorage();

          const imageUrlsPromises = productData.images.map(
            async (imageName: string) => {
              try {
                const imageUrl = await storage
                  .ref(`Products/${productDoc.id}/${imageName}`)
                  .getDownloadURL();
                setImageUrls(prevUrls => [...prevUrls, imageUrl]);
                return imageUrl;
              } catch (error) {
                console.error(
                  `Error fetching image URL for ${imageName}:`,
                  error,
                );
                return ''; // or handle the error in a way that fits your application
              }
            },
          );

          const urls = await Promise.all(imageUrlsPromises);
          setImageUrls(urls);

          // Fetch user data based on the product's user field
          const userDocRef = getFirestore().doc(`users/${productData.user}`);
          const userDocSnapshot = await userDocRef.get();
          if (userDocSnapshot.exists) {
            const userData = userDocSnapshot.data();
            setUserPhoneNumber(userData?.phoneNumber || '');
            setUserName(userData?.userName || '');
            setUserRating(userData?.averageRating || null);
          } else {
            console.error('User not found');
          }
        } else {
          console.error('No products found');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchData();
  }, []);

  const closeRatingModal = () => {
    setRatingModalOpen(false);
  };

  const submitRating = () => {
    if (newRating === 0 || newRating > 5) {
      Alert.alert('Please rate the product from 1 to 5');
      return;
    }
    rateUser(productData.user, newRating);
    closeRatingModal();
  };
  const renderDescription = () => {
    return productData.description.split('-').map((item, index) => (
      <Text
        key={index}
        style={{
          fontSize: 14,
          lineHeight: 20,
          backgroundColor: '#333',
          borderRadius: 15,
          padding: 10,
          color: 'white',
        }}>
        {item.trim()}
      </Text>
    ));
  };

  return (
    <ScrollView style={{backgroundColor: 'black', padding: 10}}>
      {productData && (
        <>
          <SafeAreaView style={{flex: 1}}>
            <Text style={{fontSize: 27, marginBottom: 10, color: 'white'}}>
              {productData.product_name}
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginTop: 15,
                color: 'white',
              }}>
              Price: {productData.price}
            </Text>
            <View style={{marginBottom: 20, marginTop: 20}}>
              <ScrollView
                style={{flex: 1}}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                horizontal
                scrollEnabled={true}>
                {imageUrls.map((imageUrl, index) => (
                  <Image
                    key={index}
                    resizeMode="stretch"
                    source={{uri: imageUrl}}
                    style={{width: WIDTH - 20, height: HEIGHT * 0.4}}
                  />
                ))}
              </ScrollView>
            </View>
          </SafeAreaView>
          <View>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginTop: 10,
                marginBottom: 15,
                color: 'white',
              }}>
              Description
            </Text>
            {renderDescription()}
          </View>
          <View style={styles.container}>
            <View style={styles.userInfo}>
              <Text style={{fontSize: 20, marginRight: 10}}>Sold by:</Text>
              <Text style={{fontSize: 20}}>{userName}</Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>
                User's Rating:{' '}
                {userRating !== null ? userRating.toFixed(2) : 'N/A'}
              </Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(`tel:${userPhoneNumber}`)}>
                <Text style={styles.callerButton}>Call Seller</Text>
              </TouchableOpacity>
              <Text
                style={[
                  styles.reviewText,
                  hasReviewed ? styles.thanksText : null,
                ]}>
                {hasReviewed ? 'Thanks for your review' : null}
              </Text>
              {!hasReviewed && (
                <View style={styles.ratingInputContainer}>
                  <Text style={{marginBottom: 10, fontSize: 20}}>
                    Select a rating:
                  </Text>
                  <TextInput
                    style={styles.ratingInput}
                    keyboardType="numeric"
                    value={newRating.toString()}
                    onChangeText={text => setNewRating(Number(text))}
                  />
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={submitRating}>
                    <Text style={styles.submitButtonText}>Submit Rating</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default ProductDetailsCard;
