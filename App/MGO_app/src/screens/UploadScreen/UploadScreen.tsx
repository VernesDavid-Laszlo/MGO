import React, {ChangeEventHandler, useEffect, useState} from 'react';
import getStorage, {FirebaseStorageTypes} from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';

import ref from '@react-native-firebase/storage';
import getDownloadURL from '@react-native-firebase/storage';
import getDocs, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import DocumentSnapshot from '@react-native-firebase/firestore';
import DocumentData from '@react-native-firebase/firestore';
import {RadioButton} from 'react-native-paper';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import FirebaseApp from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';

import {
  addDoc,
  collection,
  doc,
  getFirestore,
  updateDoc,
} from '@react-native-firebase/firestore/lib/modular';
import {arrayUnion} from '@react-native-firebase/firestore/lib/modular/FieldValue';
import getDoc from '@react-native-firebase/firestore';
import * as url from 'url';
import styles from './UploadScreeenStyle';
import Picker from 'react-native-picker-select';
import auth, {firebase} from '@react-native-firebase/auth';
import RNPickerSelect from 'react-native-picker-select';
import storage from '@react-native-firebase/storage';

const UploadScreen: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currency, setCurrency] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const db = getFirestore();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUser = auth().currentUser;

        if (currentUser) {
          const userDoc = await db
            .collection('users')
            .doc(currentUser.uid)
            .get();

          if (userDoc.exists) {
            const userData = userDoc.data();
            if (userData) {
              setUsername(prevUsername => userData.userName);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [auth, db]);


  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handlePriceChange = (text: string) => {
    if (!isNaN(Number(text))) {
      setPrice(text);
    }
  };

  const handleProductDescriptionChange = (text: string) => {
    setProductDescription(text);
  };

  const handleCategoryChange = (text: string) => {
    setCategory(text);
  };

  const handleSaveChanges = async () => {
    if (
      !title ||
      !price ||
      !productDescription ||
      !category ||
      selectedImages.length === 0
    ) {
      Alert.alert(
        'Validation Error',
        'Please fill all the fields and select at least one image',
      );
      return;
    }

    try {
      const categoryIdSnapshot = await db
        .collection('category')
        .where('category_name', '==', category)
        .get();

      if (!categoryIdSnapshot.empty) {
        const categoryId = categoryIdSnapshot.docs[0].id;

        const currentUser = auth().currentUser;

        if (currentUser) {
          const userId = currentUser.uid;

          const productRef = collection(db, 'products');
          const newProductDocRef = await addDoc(productRef, {
            product_name: title,
            price: price,
            description: productDescription,
            category: categoryId,
            user: userId,
          });

          const productId = newProductDocRef.id;

          // Use Promise.all to wait for all image uploads to complete
          {
            /*await Promise.all(selectedImages.map(async (image) => {
            const localFileUri = image.uri; // Replace with the actual local file URI
            await uploadFile(`Products/${productId}/${image.name}`, localFileUri);

            // Update the product document in Firestore with the image URL
            await updateDoc(doc(db, 'products', productId), {
              images: arrayUnion(image.name),
            });
          }));*/
          }
          uploadImagesToStorage(selectedImages, productId).then(() => {
            Alert.alert('Success');
          });

          console.log(
            'Product data and images uploaded successfully to Firestore and Storage',
          );
        } else {
          Alert.alert('Error', 'User not found');
        }
      } else {
        console.error('Category not found');
        Alert.alert('Error', 'Category not found');
      }
    } catch (error) {
      console.error('Error uploading product data to Firestore:', error);
    }

    setTitle('');
    setPrice('');
    setProductDescription('');
    setCategory('');
    setSelectedImages([]);
  };

  const handleCurrencyChange = (text: string) => {
    setCurrency(text);
    if (!isNaN(Number(price)) && price !== '') {
      setPrice(`${price}${currency}`);
    }
  };

  const uploadImagesToStorage = async (images: string[], productId: any) => {
    try {
      const promises = images.map(async (image) => {
        const imageName = image.split('/').pop(); // Extracting the image name
        const reference = getStorage().ref(`Products/${productId}/${imageName}`);
        console.log(reference);
        const response = await fetch(image);
        const blob = await response.blob();
        await reference.put(blob);
        const downloadURL = await reference.getDownloadURL();

        const firestoreReference = getFirestore().collection('products').doc(productId);
        await firestoreReference.update({
          images: arrayUnion(imageName)
        });
        return downloadURL;
      });


      const uploadedImageURLs = await Promise.all(promises);
      return uploadedImageURLs;
    } catch (error) {
      console.error('Error uploading images to Firebase Storage:', error);
      throw error;
    }
  };


  const chooseImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 5,
      },
      response => {
        // Handle the response here
        if (!response.didCancel && !response.errorCode) {
          const kepek = response.assets?.map(asset => asset.uri) ?? [];
          setSelectedImages(
            prevImages => [...prevImages, ...(kepek ?? [])] as string[],
          );
        }
      },
    );
  };

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  return (
    <ScrollView>
      {/*<Header />*/}
      <View style={styles.bodyUP}>
        <View style={styles.cardContainerUP}>
          <View>
            <Text style={styles.uploadPageHeader}>
              Upload your products here
            </Text>
          </View>
          <View>
            <Text style={styles.uploadPageTitle}> Title</Text>
            <View>
              <TextInput
                id="title"
                value={title}
                onChangeText={handleTitleChange}
                placeholder=""
                style={styles.uploadPageInput}
              />
            </View>
            <View>
              <View>
                <Text style={styles.uploadPagePrice}> Price</Text>
                <TextInput
                  id="price"
                  value={price}
                  onChangeText={handlePriceChange}
                  placeholder=""
                  style={styles.uploadPageInput}
                />
              </View>
              <View>
                <Text style={styles.uploadPageCurrencyText}>
                  Select a currency:
                </Text>
                <View style={styles.uploadPageCurrencyValue}>
                  <Text style={{fontSize: 18, marginRight: -33}}>$</Text>
                  <RadioButton
                    value="$"
                    status={currency === '$' ? 'checked' : 'unchecked'}
                    onPress={() => handleCurrencyChange('$')}
                  />
                  <Text style={{fontSize: 18, marginRight: -33}}>€</Text>
                  <RadioButton
                    value="€"
                    status={currency === '€' ? 'checked' : 'unchecked'}
                    onPress={() => handleCurrencyChange('€')}
                  />
                </View>
              </View>
            </View>
          </View>
          <View>
            <Text style={{fontSize: 18, marginTop: 20, marginBottom: 5}}>
              {' '}
              Product description
            </Text>
            <View>
              <TextInput
                style={styles.descriptionUploadPageTextarea}
                editable
                multiline
                numberOfLines={50}
                maxLength={1000}
                onChangeText={handleProductDescriptionChange}
                value={productDescription}
                textAlignVertical="top"
              />
            </View>
          </View>
          <View style={styles.imageUploadPage}>
            <TouchableOpacity onPress={chooseImage}>
              <Text
                style={{
                  marginBottom: 15,
                  fontSize: 18,
                  backgroundColor: '#3498db',
                  color: 'white',
                  width: 140,
                  borderRadius: 5,
                  padding: 5,
                }}>
                Choose Images
              </Text>
            </TouchableOpacity>
            {selectedImages.length > 0 && (
              <View>
                <Text style={{fontSize: 18,marginBottom: 10}}>Selected Images:</Text>
                {selectedImages.map((imageUri, index) => (
                  <View key={index} style={styles.selectedImageContainer}>
                    <Image
                      source={{uri: imageUri}}
                      style={styles.selectedImage}
                    />
                    <TouchableOpacity onPress={() => handleDeleteImage(index)}>
                      <Text style={styles.deleteButton}>X</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
          <View style={styles.categoryUploadPage}>
            <View>
              <Text style={styles.uploadPageTitle}>Product category:</Text>
              <View
                style={{
                  borderColor: 'white',
                  borderWidth: 1,
                  borderRadius: 15,
                  backgroundColor: '#333',
                  marginTop: 10,
                }}>
                <RNPickerSelect
                  onValueChange={handleCategoryChange}
                  items={[
                    {label: "TV's", value: "TV's"},
                    {label: 'Laptops', value: 'Laptops'},
                    {label: 'Phones', value: 'Phones'},
                    {label: 'Cars', value: 'Cars'},
                    {label: 'Household', value: 'Household'},
                    {label: 'Clothes', value: 'Clothes'},
                    {label: 'Fragrances', value: 'Fragrances'},
                    {label: 'Speakers', value: 'Speakers'},
                    {label: 'Others', value: 'Others'},
                  ]}
                />
              </View>
            </View>
            <TouchableOpacity onPress={handleSaveChanges}>
              <Text style={styles.buttonUploadPage}>Upload product</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerUploadPage}>{/*<Footer />*/}</View>
        </View>
      </View>
    </ScrollView>
  );
};

export default UploadScreen;
