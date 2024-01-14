import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import styles from './EditScreenStyle';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const EditScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const user = auth().currentUser;

  useEffect(() => {
    if (user) {
      const userDocRef = firestore().collection('users').doc(user.uid);
      userDocRef.get().then(doc => {
        if (doc.exists) {
          const userData = doc.data();
          setNewName(userData?.name || '');
          setNewAddress(userData?.address || '');
          setNewCity(userData?.city || '');
          setNewPhoneNumber(userData?.phoneNumber || '');
        }
      });
    }
  }, [user]);

  const handleSaveChanges = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (newPassword && newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      if (user) {
        if (newPassword) {
          await user.updatePassword(newPassword);
        }

        const updates = {};
        if (newName !== '') {
          // @ts-ignore
          updates.name = newName;
        }
        if (newAddress !== '') {
          // @ts-ignore
          updates.address = newAddress;
        }
        if (newCity !== '') {
          // @ts-ignore
          updates.city = newCity;
        }
        if (newPhoneNumber !== '') {
          // @ts-ignore
          updates.phoneNumber = newPhoneNumber;
        }

        await firestore().collection('users').doc(user.uid).update(updates);
        Alert.alert('Success', 'Profile updated successfully');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'An error occurred while updating the profile');
    }
  };

  return (
    <ScrollView>
      <View style={styles.bodyEP}>
        <View style={styles.cardContainerEP}>
          <TouchableOpacity onPress={handleSaveChanges}>
          </TouchableOpacity>

          <Text style={{marginBottom: 20, fontSize: 25}}>
            Edit your Profile
          </Text>

          <View style={styles.userEditForm}>
            <Text style={styles.userEditFormLabel}>New Name</Text>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter your new name"
              style={styles.userEditFormInput}
            />
          </View>

          <View style={styles.userEditForm}>
            <Text style={styles.userEditFormLabel}>New Password</Text>
            <TextInput
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter your new password"
              secureTextEntry
              style={styles.userEditFormInput}
            />
          </View>

          <View style={styles.userEditForm}>
            <Text style={styles.userEditFormLabel}>Confirm Password</Text>
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your new password"
              secureTextEntry
              style={styles.userEditFormInput}
            />
          </View>

          <View style={styles.userEditForm}>
            <Text style={styles.userEditFormLabel}>New Address</Text>
            <TextInput
              value={newAddress}
              onChangeText={setNewAddress}
              placeholder="Enter your new address"
              style={styles.userEditFormInput}
            />
          </View>

          <View style={styles.userEditForm}>
            <Text style={styles.userEditFormLabel}>New City</Text>
            <TextInput
              value={newCity}
              onChangeText={setNewCity}
              placeholder="Enter your new city"
              style={styles.userEditFormInput}
            />
          </View>

          <View style={styles.userEditForm}>
            <Text style={styles.userEditFormLabel}>Phone Number</Text>
            <TextInput
              value={newPhoneNumber}
              onChangeText={setNewPhoneNumber}
              placeholder="Enter your new phone number"
              keyboardType="phone-pad"
              style={styles.userEditFormInput}
            />
          </View>

          <TouchableOpacity
            style={styles.buttonEditPage}
            onPress={handleSaveChanges}>
            <Text style={styles.buttonEditPageHover}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditScreen;
