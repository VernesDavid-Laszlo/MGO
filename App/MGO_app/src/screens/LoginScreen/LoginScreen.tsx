import React, {useCallback, useState} from 'react';
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
import AppLogo from '../../assets/AppLogo.svg';
import {RouterKey} from '../../routes/Routes';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/RoutesMapping';
import DeleteIcon from '../../assets/detele-button.svg';
import HintSection from '../../components/HintSection/HintSection';
import ShowIcon from '../../assets/eye-slash.svg';
import HideIcon from '../../assets/eye.svg';

const LoginScreen: React.FC = () => {
  type LoginScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, RouterKey.LOGIN_SCREEN>;
  };
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  // const navigation = useNavigation();

  // const handleUsernameChange = useCallback((text: string) => {
  //   setUsername(text);
  // }, []);
  //
  // const handlePasswordChange = useCallback((text: string) => {
  //   setPassword(text);
  // }, []);
  //
  // const handleDeleteUsername = useCallback(() => {
  //   setUsername("");
  // }, []);

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
  // const [isDeleteUsernameVisible] = useState(false);

  // const handleLogin = useState(() => {
  //   navigation.navigate(RouterKey.HOME_SCREEN);
  // }, []);

  const handleTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState);
  }, []);

  // useEffect(() => {
  //   setDeleteUsernameVisible(username.length !== 0);
  // }, [username]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.container}>
        <AppLogo height={190} />
        <SafeAreaView>
          <Text style={styles.text}>Username</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputField}
              placeholder={'Username'}
              placeholderTextColor={Colors.LIGHTGRAY}
              // value={username}
              autoCapitalize={'none'}
              // onChangeText={handleUsernameChange}
            />
            <TouchableOpacity
              // onPress={handleDeleteUsername}
              style={{width: '10%'}}>
              {/*{isDeleteUsernameVisible && <DeleteIcon width={25} height={25} />}*/}
              <DeleteIcon width={25} height={25} />
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.inputPasswordField}
              placeholder={'Password'}
              placeholderTextColor={Colors.LIGHTGRAY}
              // value={password}
              secureTextEntry={!isPasswordVisible}
              // onChangeText={handlePasswordChange}
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
        <CustomLoginButton />
        <CustomSignUpButton />
        <HintSection />
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
