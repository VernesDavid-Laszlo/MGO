/**
 * import {
 *   View,
 *   Text,
 *   TextInput,
 *   TextStyle,
 *   TextInputProps,
 *   ScrollView,
 *   TouchableOpacity,
 * } from 'react-native';
 * import styles from './EditScreenStyle';
 * import {getFirestore} from '@react-native-firebase/firestore/lib/modular';
 * import {firebase} from '@react-native-firebase/auth';
 * import {useState} from 'react';
 *
 * const EditScreen: React.FC = () => {
 *   const [newPassword, setNewPassword] = useState('');
 *   const [confirmPassword, setConfirmPassword] = useState('');
 *   const [newName, setNewName] = useState('');
 *   const [newAddress, setNewAddress] = useState('');
 *   const [newCity, setNewCity] = useState('');
 *   const [newPhoneNumber, setNewPhoneNumber] = useState('');
 *   const db = getFirestore();
 *   const user = firebase.auth().currentUser;
 *
 *   const handleNewPasswordChange = (text: string) => {
 *     setNewPassword(text);
 *   };
 *
 *   const handleChangePasswordChange = (text: string) => {
 *     setConfirmPassword(text);
 *   };
 *
 *   const handleNewNameChange = (text: string) => {
 *     setNewName(text);
 *   };
 *
 *   const handleNewAddressChange = (text: string) => {
 *     setNewAddress(text);
 *     console.log('New Address:', newAddress);
 *   };
 *
 *   const handleNewCityChange = (text: string) => {
 *     setNewCity(text);
 *   };
 *
 *   const handlePhoneNumberChange = (text: string) => {
 *     setNewPhoneNumber(text); //itt le kell kezeljem hogy csak szamot irjon be
 *   };
 *
 *   // eslint-disable-next-line no-lone-blocks
 *   {
 *     /* const handleSaveChanges = async () => {
 *     if (newPassword !== confirmPassword) {
 *       Alert.alert('Passwords do not match');
 *       return;
 *     }
 *
 *     try {
 *       if (user) {
 *         const userDocRef = doc(db, 'users', user.uid);
 *         const userDoc: DocumentSnapshot = await getDoc(userDocRef);
 *
 *         // Update password if provided
 *         if (newPassword && newPassword.length < 9) {
 *           Alert.alert('Password must be at least 9 characters long');
 *           return;
 *         }
 *
 *         try {
 *           await updatePassword(user, newPassword);
 *           console.log('Password updated successfully');
 *         } catch (error) {
 *           console.error('Error updating password:', error);
 *           console.error('Detailed error:', error);
 *           if (error) {
 *             console.error('Response details:', error);
 *           }
 *         }
 *
 *         // Update name if provided
 *         if (newName) {
 *           await updateDoc(userDocRef, {userName: newName});
 *           console.log('Name updated successfully');
 *         }
 *
 *         if (newPhoneNumber) {
 *           await updateDoc(userDocRef, {phoneNumber: newPhoneNumber});
 *           console.log('Phone number updated successfully');
 *         }
 *
 *         // Update address, city, and phoneNumber if provided
 *         if (userDoc) {
 *           const updatedData: {[key: string]: string} = {};
 *
 *           if (newAddress) {
 *             await updateDoc(userDocRef, {address: newAddress});
 *             console.log('Address updated successfully');
 *           }
 *
 *           if (newCity) {
 *             await updateDoc(userDocRef, {city: newCity});
 *             console.log('City updated successfully');
 *           }
 *
 *           if (Object.keys(updatedData).length > 0) {
 *             await updateDoc(userDocRef, updatedData);
 *           }
 *
 *           if (
 *               newName ||
 *               newAddress ||
 *               newCity ||
 *               newPhoneNumber ||
 *               (newPassword && confirmPassword)
 *           ) {
 *             Alert.alert('Updated successfully');
 *           } else {
 *             Alert.alert('No changes were made');
 *           }
 *         }
 *         setNewPassword('');
 *         setConfirmPassword('');
 *         setNewName('');
 *         setNewAddress('');
 *         setNewCity('');
 *         setNewPhoneNumber('');
 *       } else {
 *         Alert.alert('User does not exist');
 *       }
 *     } catch (error) {
 *       console.error('Error updating user data:', error);
 *     }
 *   };
 *
 *   useEffect(() => {
 *     const fetchData = async () => {
 *       try {
 *         const currentUser = firebase.auth().currentUser;
 *
 *         if (currentUser) {
 *           const userDoc = await firebase
 *               .firestore()
 *               .collection('users')
 *               .doc(currentUser.uid)
 *               .get();
 *
 *           if (userDoc.exists) {
 *             setUsername(userDoc.data().userName);
 *           }
 *         }
 *       } catch (error) {
 *         console.error('Error fetching user data:', error);
 *       }
 *     };
 *
 *     fetchData();
 *   }, []);* /
 *   }
 *   return (
 *     <ScrollView>
 *       <View style={styles.bodyEP}>
 *         <View style={styles.cardContainerEP}>
 *           <View style={styles.editPageTitle}>
 *             <Text style={{marginBottom: '20', fontSize: 25}}>
 *               Kukimuki edit your Profile here{' '}
 *             </Text>
 *           </View>
 *           <View style={styles.userEditForm}>
 *             <View>
 *               <Text style={styles.userEditFormLabel}>New Address</Text>
 *               <TextInput
 *                 value={newAddress}
 *                 onChangeText={handleNewAddressChange}
 *                 placeholder=""
 *                 style={styles.userEditFormInput}
 *               />
 *             </View>
 *             <View style={styles.userEditForm}>
 *               <Text style={styles.userEditFormLabel}>New Name</Text>
 *               <TextInput
 *                 value={newName}
 *                 onChangeText={handleNewNameChange}
 *                 placeholder=""
 *                 style={styles.userEditFormInput}
 *               />
 *             </View>
 *
 *             <View style={styles.userEditForm}>
 *               <Text style={styles.userEditFormLabel}>New Password</Text>
 *               <TextInput
 *                 value={newPassword}
 *                 onChangeText={handleNewPasswordChange}
 *                 placeholder=""
 *                 secureTextEntry
 *                 style={styles.userEditFormInput}
 *               />
 *             </View>
 *
 *             <View style={styles.userEditForm}>
 *               <Text style={styles.userEditFormLabel}>Confirm Password</Text>
 *               <TextInput
 *                 value={confirmPassword}
 *                 onChangeText={handleChangePasswordChange}
 *                 placeholder=""
 *                 secureTextEntry
 *                 style={styles.userEditFormInput}
 *               />
 *             </View>
 *
 *             <View style={styles.userEditForm}>
 *               <Text style={styles.userEditFormLabel}>Phone Number</Text>
 *               <TextInput
 *                 value={newPhoneNumber}
 *                 onChangeText={handlePhoneNumberChange}
 *                 placeholder=""
 *                 style={styles.userEditFormInput}
 *               />
 *             </View>
 *
 *             <View style={styles.userEditForm}>
 *               <Text style={styles.userEditFormLabel}>Change City</Text>
 *               <TextInput
 *                 value={newCity}
 *                 onChangeText={handleNewCityChange}
 *                 placeholder=""
 *                 style={styles.userEditFormInput}
 *               />
 *             </View>
 *           </View>
 *
 *           <TouchableOpacity style={styles.buttonEditPage}>
 *             <Text style={{textAlign: 'center'}}> Save Changes </Text>
 *           </TouchableOpacity>
 *         </View>
 *         <View style={styles.footerEditPage} />
 *       </View>
 *     </ScrollView>
 *   );
 * };
 *
 * export interface EditPageLabelProps extends TextInputProps {
 *   label: string;
 *   onChangeText: (text: string) => void;
 *   type: string; // Add the 'type' prop to the interface
 * }
 *
 * const EditPageLabel: React.FC<EditPageLabelProps> = ({
 *   label,
 *   type,
 *   value,
 *   onChangeText,
 *   placeholder,
 *   ...props
 * }) => (
 *   <>
 *     <Text>{label}:</Text>
 *     <TextInput
 *       style={{borderColor: 'gray', borderWidth: 1, padding: 8} as TextStyle}
 *       keyboardType={type === 'text' ? 'default' : 'numeric'}
 *       secureTextEntry={type === 'password'}
 *       value={value}
 *       onChangeText={text => onChangeText(text)}
 *       placeholder={placeholder}
 *       {...props}
 *     />
 *   </>
 * );
 *
 * export default EditScreen;
 */
