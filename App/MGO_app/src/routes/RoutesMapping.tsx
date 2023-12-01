// Routes.tsx

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import {RouterKey} from './Routes';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

export type RootStackParamList = {
  [RouterKey.LOGIN_SCREEN]: undefined;
  [RouterKey.HOME_SCREEN]: undefined;
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();

const RoutesMapping = () => {
  return (
    <Navigator>
      <Screen name={RouterKey.LOGIN_SCREEN} component={LoginScreen} />
      <Screen name={RouterKey.HOME_SCREEN} component={HomeScreen} />
    </Navigator>
  );
};

export default RoutesMapping;
