import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {loginButtonStyle} from '../LoginButton/LoginButtonStyle';

export interface CustomSignUpButtonProps {
  handlePress: () => void;
}

const CustomSignUpButton = ({handlePress}: CustomSignUpButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={loginButtonStyle.buttonContainer}>
      <Text style={loginButtonStyle.buttonText}>Create account</Text>
    </TouchableOpacity>
  );
};

export default CustomSignUpButton;
