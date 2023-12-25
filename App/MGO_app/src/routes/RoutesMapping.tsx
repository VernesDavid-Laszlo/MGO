import React from 'react';
import {RouterKey} from './Routes';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SignUpScreen from '../screens/SingUpScreen/SingUpScreen';

export type RootStackParamList = {
  [RouterKey.LOGIN_SCREEN]: undefined;
  [RouterKey.HOME_SCREEN]: undefined;
  [RouterKey.SIGNUP_SCREEN]: undefined;
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

const RoutesMapping = () => {
  return (
    <Navigator>
      <Screen name={RouterKey.LOGIN_SCREEN} component={LoginScreen} />
      <Screen name={RouterKey.HOME_SCREEN} component={HomeScreen} />
      <Screen name={RouterKey.SIGNUP_SCREEN} component={SignUpScreen} />
    </Navigator>
  );
};

export default RoutesMapping;
