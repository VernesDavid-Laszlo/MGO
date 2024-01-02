import React, {ChangeEventHandler, useEffect, useState} from 'react';
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
  Alert,
  ScrollView,
  TextInput,
} from 'react-native';
import FirebaseApp from '@react-native-firebase/firestore';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';

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

const UploadScreen: React.FC = () => {
  const [title, setTitle] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [productDescription, setProductDescription] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [currency, setCurrency] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const db = getFirestore();
  const user = auth().currentUser;

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

  const handleImageChange = (files: FileList | null) => {
    if (files) {
      setSelectedImages(prevImages => [...prevImages, ...Array.from(files)]);
    }
  };

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handlePriceChange = (text: string) => {
    if (!isNaN(Number(text))) {
      setPrice(text);
    }
  };

  const handleProductDescriptionChange: ChangeEventHandler<
    HTMLTextAreaElement
  > = event => {
    const text = event.target.value;
    setProductDescription(text);
  };

  const handleCategoryChange = (text: string) => {
    setCategory(text);
  };

  const uploadFile = async (storageRef: string, localFileUri: string) => {
    const reference = getStorage().ref(storageRef);
    const response = await fetch(localFileUri);
    const blob = await response.blob();
    return reference.put(blob);
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
            price,
            description: productDescription,
            category: categoryId,
            user: userId,
          });

          const productId = newProductDocRef.id;
          const storageRef = getStorage().ref(`Products/${productId}`);

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

  const handleDeleteImage = (index: number) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
  };

  const handleCurrencyChange = (text: string) => {
    setCurrency(text);

    if (!isNaN(Number(price)) && price !== '') {
      setPrice(`${price}${text}`);
    }
  };

  return (
    <View>
      {/*<Header />*/}
      <View style={styles.bodyUP}>
        <View style={styles.cardContainerUP}>
          <View style={styles.uploadPageTitle}>
            <Text>
              {auth().currentUser?.displayName} You can upload your products
              here{' '}
            </Text>
          </View>
          <View style={styles.userUploadForm}>
            <Text> Title</Text>
            <View>
              <TextInput
                id="title"
                value={title}
                onChangeText={handleTitleChange}
                placeholder=""
              />
            </View>
            <View style={styles.priceUploadPageall}>
              <View style={styles.priceUploadPage}>
                <Text> Price</Text>
                <TextInput
                  id="price"
                  value={price}
                  onChangeText={handlePriceChange}
                  placeholder=""
                />
              </View>
              <View style={styles.currencyUploadPage}>
                <Text>Select a currency:</Text>
                <TouchableOpacity
                  style={styles.currencyRadioButton}
                  onPress={() => handleCurrencyChange('$')}>
                  <Text>$</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.currencyRadioButton}
                  onPress={() => handleCurrencyChange('€')}>
                  <Text>€</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.descriptionUploadPage}>
            <Text> Product description</Text>
            <View>
              <textarea
                id="productDescription"
                value={productDescription}
                onChange={handleProductDescriptionChange}
                placeholder=""
              />
            </View>
          </View>
          {/*<View style={styles.imageUploadPage}>
            <View>
              <Text>Select Images:</Text>
              <TouchableOpacity
                style={styles.imageUploadButton}
                onPress={handleImageChange}>
                <Text>Choose File</Text>
              </TouchableOpacity>
            </View>
            {selectedImages.length > 0 && (
              <View>
                <Text>Selected Images:</Text>
                <View style={styles.selectedImagesContainer}>
                  {selectedImages.map((image, index) => (
                    <View key={index} style={styles.selectedImageItem}>
                      <Image
                        source={{uri: URL.createObjectURL(image)}}
                        style={styles.selectedImage}
                      />
                      <TouchableOpacity
                        onPress={() => handleDeleteImage(index)}
                        style={styles.deleteImageButton}>
                        <Text>X</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>*/}
          <View style={styles.categoryUploadPage}>
            <View>
              <Text>Product category:</Text>
              <Picker
                selectedValue={category}
                onValueChange={itemValue => handleCategoryChange(itemValue)}>
                <Picker.Item label="Select a category" value="" />
                <Picker.Item label="TV's" value="TV's" />
                <Picker.Item label="Laptops" value="Laptops" />
                <Picker.Item label="Phones" value="Phones" />
                <Picker.Item label="Cars" value="Cars" />
                <Picker.Item label="Household" value="Household" />
                <Picker.Item label="Clothes" value="Clothes" />
                <Picker.Item label="Fragrances" value="Fragrances" />
                <Picker.Item label="Speakers" value="Speakers" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={handleSaveChanges}>
              <Text>Upload product</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.footerUploadPage}>{/*<Footer />*/}</View>
        </View>
      </View>
    </View>
  );
};

export default UploadScreen;
