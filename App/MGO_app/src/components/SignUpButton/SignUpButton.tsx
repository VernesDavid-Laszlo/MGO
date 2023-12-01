import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {loginButtonStyle} from '../LoginButton/LoginButtonStyle';

export interface CustomSignUpButtonProps {
  handlePress: () => void;
}

const CustomSignUpButton = () => {
  return (
    <TouchableOpacity
      // onPress={handlePress}
      style={loginButtonStyle.buttonContainer}>
      <Text style={loginButtonStyle.buttonText}>Sign Up</Text>
    </TouchableOpacity>
  );
};

export default CustomSignUpButton;
