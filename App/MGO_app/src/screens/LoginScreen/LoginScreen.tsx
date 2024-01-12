import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import CustomLoginButton from '../../components/LoginButton/LoginButton';
import CustomSignUpButton from '../../components/SignUpButton/SignUpButton';
import styles from './LoginScreen.style';
import {Colors} from '../../utils/Colors';
import {RouterKey} from '../../routes/Routes';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../../context/AuthContext'; // Import useAuth

import DeleteIcon from '../../assets/detele-button.svg';
import HintSection from '../../components/HintSection/HintSection';
import ShowIcon from '../../assets/eye-slash.svg';
import HideIcon from '../../assets/eye.svg';


const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isDeleteUsernameVisible, setDeleteUsernameVisible] = useState(false);

  const navigation = useNavigation();
  const {login} = useAuth(); // Use the login function from AuthContext

  const handleEmailChange = useCallback((text: string) => setEmail(text), []);
  const [loginError, setLoginError] = useState('');

  const handlePasswordChange = useCallback(
    (text: string) => setPassword(text),
    [],
  );
  const handleDeleteEmail = useCallback(() => setEmail(''), []);
  const handleTogglePasswordVisibility = useCallback(
    () => setIsPasswordVisible(prev => !prev),
    [],
  );

  const handleLogin = async () => {
    try {
      await login(email, password);
      setLoginError('');
    } catch (error) {
      // console.error('Login error:', error);
      setLoginError(error.message); // Display the error message
    }
  };

  const handleSignUppress = () => navigation.navigate(RouterKey.SIGNUP_SCREEN);

  useEffect(() => {
    setDeleteUsernameVisible(email.length !== 0);
  }, [email]);

  const handleForgotPassword = () => {
    navigation.navigate(RouterKey.FORGOT_PASSWORD);
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
              style={{width: '10%'}}
              onPress={handleDeleteEmail}>
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
        {loginError ? (
          <Text style={styles.errorText}>Incorrect username or password.</Text>
        ) : null}
        <CustomLoginButton handlePress={handleLogin} />
        <CustomSignUpButton handlePress={handleSignUppress} />
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        <HintSection />
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;
