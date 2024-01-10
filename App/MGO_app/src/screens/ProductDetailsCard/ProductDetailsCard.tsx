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
import {doc, updateDoc} from '@react-native-firebase/firestore/lib/modular';
import styles from './ProductDetailsCardStyle';
import {Linking} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {RootStackParamList} from '../../routes/RoutesMapping';
import {RouterKey} from '../../routes/Routes';
import {navigationRef} from '../../components/Navigation/NavigationService';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export type Product = {
  id: string;
  category: string;
  description: string;
  images: string[];
  price: string;
  product_name: string;
  user: string;
};
type ProductDetailsRouteProps = RouteProp<
  RootStackParamList,
  RouterKey.PRODUCT_DETAILS_CARD
>;

const ProductDetailsCard = () => {
  // Use the correct type for the route
  const route = useRoute<ProductDetailsRouteProps>();
  const {product} = route.params;

  const [userPhoneNumber, setUserPhoneNumber] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [, setRatingModalOpen] = useState<boolean>(false);
  const [newRating, setNewRating] = useState<number>(0);
  const [hasReviewed, setHasReviewed] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user data
    const fetchUserData = async () => {
      const userRef = firestore().doc(`users/${product.user}`);
      const userDoc = await userRef.get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUserPhoneNumber(userData?.phoneNumber || '');
        setUserName(userData?.userName || '');
        setUserRating(userData?.averageRating || null);
      }
    };

    const fetchImageUrls = async () => {
      try {
        const validUrls = product.images.filter(url => url.startsWith('http'));
        setImageUrls(validUrls);
      } catch (error) {
        console.error(`Error verifying image URLs: ${error}`);
        setImageUrls([]); // Set an empty array if there's an error
      }
    };

    // Fetch user and image data if the product object is defined
    if (product) {
      fetchImageUrls();
      fetchUserData();
    }
  }, [product]); // Only re-run if the product object changes


  const rateUser = async (userId: string, rating: number) => {
    try {
      // Get reference to the user document
      const userRef = doc(firestore(), 'users', userId);

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

  const closeRatingModal = () => {
    setRatingModalOpen(false);
  };

  const submitRating = () => {
    if (newRating === 0 || newRating > 5) {
      Alert.alert('Please rate the product from 1 to 5');
      return;
    }
    console.log('Product user' + product.user);
    rateUser(product.user, newRating);
    closeRatingModal();
  };

  const openChat = () => {
    navigationRef.navigate(RouterKey.CHAT_SCREEN, {recipient: product.user});
  };
  const renderDescription = () => {
    return product.description.split('-').map((item, index) => (
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
      {product && (
        <>
          <SafeAreaView style={{flex: 1}}>
            <Text style={{fontSize: 27, marginBottom: 10, color: 'white'}}>
              {product.product_name}
            </Text>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                marginTop: 15,
                color: 'white',
              }}>
              Price: {product.price}
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

              <TouchableOpacity onPress={openChat}>
                <Text style={styles.callerButton}>Send a message</Text>
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
