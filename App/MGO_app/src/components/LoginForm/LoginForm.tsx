import React, {useCallback, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../utils/Colors';

// import DeleteIcon from '../../assets/detele-button.svg';
// import ShowIcon from '../../assets/eye-slash.svg';
// import HideIcon from '../../assets/eye.svg';
import styles from './LoginForm.style';

export interface LoginFormProps {
  username: string;
  password: string;
  handleUsernameChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  handleDeleteUsername: () => void;
}

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleDeleteUsername,
}: LoginFormProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isDeleteUsernameVisible, setDeleteUsernameVisible] = useState(false);

  const handleTogglePasswordVisibility = useCallback(() => {
    setIsPasswordVisible(prevState => !prevState);
  }, []);

  useEffect(() => {
    setDeleteUsernameVisible(username.length !== 0);
  }, [username]);

  return (
    <SafeAreaView>
      <Text style={styles.text}>Username</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputField}
          placeholder={'Username'}
          placeholderTextColor={Colors.LIGHTGRAY}
          value={username}
          autoCapitalize={'none'}
          onChangeText={handleUsernameChange}
        />
        <TouchableOpacity onPress={handleDeleteUsername} style={{width: '10%'}}>
          {/*{isDeleteUsernameVisible && <DeleteIcon width={25} height={25} />}*/}
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
          {/*{isPasswordVisible ? (*/}
          {/*  <ShowIcon width={25} height={25} />*/}
          {/*) : (*/}
          {/*  <HideIcon width={25} height={25} />*/}
          {/*)}*/}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoginForm;
