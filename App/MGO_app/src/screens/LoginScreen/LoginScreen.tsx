import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import CustomLoginButton from '../../components/LoginButton/LoginButton';
import CustomSignUpButton from '../../components/SignUpButton/SignUpButton';
import styles from './LoginScreen.style';
import {Colors} from '../../utils/Colors';
import {RouterKey} from '../../routes/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/RoutesMapping';
import DeleteIcon from '../../assets/detele-button.svg';
import HintSection from '../../components/HintSection/HintSection';
import ShowIcon from '../../assets/eye-slash.svg';
import HideIcon from '../../assets/eye.svg';
import {useNavigation} from '@react-navigation/native';
import auth, { firebase } from "@react-native-firebase/auth";

const LoginScreen: React.FC = () => {
  type LoginScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, RouterKey.LOGIN_SCREEN>;
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleEmailChange = useCallback((text: string) => {
    setEmail(text);
  }, []);

  const handlePasswordChange = useCallback((text: string) => {
    setPassword(text);
  }, []);
  //
  const handleDeleteEmail = useCallback(() => {
    setEmail('');
  }, []);

  const handleLogin = async () => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        email,
        password,
      );
      console.log('Login success:', userCredential.user);
      navigation.navigate(RouterKey.HOME_SCREEN);
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  // const handleLogin = async () => {
  //   const success = await login(username, password);
  //   if (success) {
  //     setLoading(true);
  //     const result = await loadProfile();
  //     if (result) {
  //       navigation.navigate(RouterKey.HOME_SCREEN;
  //     }
  //   }
  // };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isDeleteUsernameVisible, setDeleteUsernameVisible] = useState(false);

  const handleTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState);
  }, []);

  useEffect(() => {
    setDeleteUsernameVisible(email.length !== 0);
  }, [email.length]);
  const handleSignUppress = () => {
    navigation.navigate(RouterKey.SIGNUP_SCREEN);
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/MGO_logo.png')}
            style={styles.logo}
          />
        </View>
        <SafeAreaView>
          <Text style={styles.text}>E-mail</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={'E-mail'}
              placeholderTextColor={Colors.LIGHTGRAY}
              value={email}
              autoCapitalize={'none'}
              onChangeText={handleEmailChange}
            />
            <TouchableOpacity
              onPress={handleDeleteEmail}
              style={{width: '10%'}}>
              {isDeleteUsernameVisible && <DeleteIcon width={25} height={25} />}
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
              onChangeText={handlePasswordChange}
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
        {/*{!!loginError ? (*/}
        {/*  <Text style={styles.errorText}>Incorrect username or password.</Text>*/}
        {/*) : null}*/}
        <CustomLoginButton handlePress={handleLogin} />
        <CustomSignUpButton handlePress={handleSignUppress} />
        <HintSection />
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;
