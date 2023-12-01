import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {loginButtonStyle} from './LoginButtonStyle';

export interface CustomLoginButtonProps {
  handlePress: () => void;
}

const CustomLoginButton = () => {
  return (
    <TouchableOpacity
      // onPress={handlePress}
      style={loginButtonStyle.buttonContainer}>
      <Text style={loginButtonStyle.buttonText}>Login</Text>
    </TouchableOpacity>
  );
};

export default CustomLoginButton;
