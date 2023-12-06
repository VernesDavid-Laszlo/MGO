import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {loginButtonStyle} from './LoginButtonStyle';
import {CustomSignUpButtonProps} from '../SignUpButton/SignUpButton';

export interface CustomLoginButtonProps {
  handlePress: () => void;
}

const CustomLoginButton = ({handlePress}: CustomSignUpButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={loginButtonStyle.buttonContainer}>
      <Text style={loginButtonStyle.buttonText}>Login</Text>
    </TouchableOpacity>
  );
};

export default CustomLoginButton;
