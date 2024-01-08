import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styles from './EditScreenStyle';
import {getFirestore} from '@react-native-firebase/firestore/lib/modular';
import {firebase} from '@react-native-firebase/auth';
import EditIcon from '../../assets/EditIcon.svg'; // Ellenőrizze az útvonalat

const EditScreen: React.FC = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newName, setNewName] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const db = getFirestore();
  const user = firebase.auth().currentUser;
  const handleSaveChanges = async () => {
    // Ide jön a mentési logika
  };

  return (
    <ScrollView>
      <View style={styles.bodyEP}>
        <View style={styles.cardContainerEP}>
          <TouchableOpacity onPress={handleSaveChanges}>
            {/*<EditIcon style={styles.editIcon} />*/}
            <Text>Itt nyomd meg</Text>
          </TouchableOpacity>

          <Text style={{marginBottom: 20, fontSize: 25}}>
            Edit your Profile
          </Text>

          {/* Új név beállítása */}
          <View style={styles.userEditForm}>
            <Text style={styles.userEditFormLabel}>New Name</Text>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter your new name"
              style={styles.userEditFormInput}
            />
          </View>

          {/* Új jelszó beállítása */}
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

          {/* Jelszó megerősítése */}
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

          {/* Új cím beállítása */}
          <View style={styles.userEditForm}>
            <Text style={styles.userEditFormLabel}>New Address</Text>
            <TextInput
              value={newAddress}
              onChangeText={setNewAddress}
              placeholder="Enter your new address"
              style={styles.userEditFormInput}
            />
          </View>

          {/* Új város beállítása */}
          <View style={styles.userEditForm}>
            <Text style={styles.userEditFormLabel}>New City</Text>
            <TextInput
              value={newCity}
              onChangeText={setNewCity}
              placeholder="Enter your new city"
              style={styles.userEditFormInput}
            />
          </View>

          {/* Új telefonszám beállítása */}
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

          {/* Módosítások mentése */}
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
