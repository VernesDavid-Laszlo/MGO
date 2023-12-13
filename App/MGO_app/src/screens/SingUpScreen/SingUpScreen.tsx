import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';

import CustomSignUpButton from '../../components/SignUpButton/SignUpButton';
import styles from './SignUpStyle';
import {Colors} from '../../utils/Colors';
import {RouterKey} from '../../routes/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/RoutesMapping';
import DeleteIcon from '../../assets/detele-button.svg';
import HintSection from '../../components/HintSection/HintSection';
import ShowIcon from '../../assets/eye-slash.svg';
import HideIcon from '../../assets/eye.svg';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confpassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState);
  }, []);
  const handleSignUp = async () => {
    try {
      if (password !== confpassword) {
        console.error('Passwords do not match');
        return;
      }

      const userCredential = await auth().createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      console.log('User created:', user.uid);

      await firestore().collection('users').doc(user.uid).set({
        email: email,
        userName: username,
        phoneNumber: phonenumber,
        address: address,
        city: city
      });

      // Navigate to Home Screen and remove SignUp screen from stack
      navigation.replace('HomeScreen'); // Replace 'HomeScreen' with your home screen's route name
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <ScrollView>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/MGO_logo.png')}
              style={styles.logo}
            />
          </View>
          <SafeAreaView>
            <Text style={styles.text}>Email</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={'Email'}
                placeholderTextColor={Colors.LIGHTGRAY}
                value={email}
                autoCapitalize={'none'}
                onChangeText={text => setEmail(text)}
              />
              <TouchableOpacity style={{width: '10%'}}>
                <DeleteIcon width={25} height={25} />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>Phone number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={'Phone number'}
                placeholderTextColor={Colors.LIGHTGRAY}
                value={phonenumber}
                autoCapitalize={'none'}
                onChangeText={text => setPhoneNumber(text)}
              />
              <TouchableOpacity style={{width: '10%'}}>
                <DeleteIcon width={25} height={25} />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>Username</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={'Username'}
                placeholderTextColor={Colors.LIGHTGRAY}
                value={username}
                autoCapitalize={'none'}
                onChangeText={text => setUsername(text)}
              />
              <TouchableOpacity style={{width: '10%'}}>
                <DeleteIcon width={25} height={25} />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>City</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputField}
                placeholder={'City'}
                placeholderTextColor={Colors.LIGHTGRAY}
                value={city}
                autoCapitalize={'none'}
                onChangeText={text => setCity(text)}
              />
              <TouchableOpacity style={{width: '10%'}}>
                <DeleteIcon width={25} height={25} />
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>Password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputPasswordField}
                placeholder={'Password'}
                placeholderTextColor={Colors.LIGHTGRAY}
                value={password}
                secureTextEntry={!isPasswordVisible}
                onChangeText={text => setPassword(text)}
              />
              <TouchableOpacity
                onPress={handleTogglePasswordVisibility}
                style={{width: '10%'}}>
                {isPasswordVisible ? (
                  <ShowIcon width={25} height={25} />
                ) : (
                  <HideIcon width={25} height={25} />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.text}>Confirm password</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputPasswordField}
                placeholder={'Password'}
                placeholderTextColor={Colors.LIGHTGRAY}
                value={confpassword}
                secureTextEntry={!isPasswordVisible}
                onChangeText={text => setConfirmPassword(text)}
              />
              <TouchableOpacity
                onPress={handleTogglePasswordVisibility}
                style={{width: '10%'}}>
                {isPasswordVisible ? (
                  <ShowIcon width={25} height={25} />
                ) : (
                  <HideIcon width={25} height={25} />
                )}
              </TouchableOpacity>
            </View>
          </SafeAreaView>
          <CustomSignUpButton handlePress={handleSignUp} />
          <HintSection />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUpScreen;
