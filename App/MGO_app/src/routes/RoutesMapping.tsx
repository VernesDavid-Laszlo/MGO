import React from 'react';
import {RouterKey} from './Routes';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SignUpScreen from '../screens/SingUpScreen/SingUpScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';

export type RootStackParamList = {
  [RouterKey.LOGIN_SCREEN]: undefined;
  [RouterKey.HOME_SCREEN]: undefined;
  [RouterKey.SIGNUP_SCREEN]: undefined;
  [RouterKey.DRAWERNAVIGATION]: undefined;
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName={RouterKey.HOME_SCREEN}>
      <Drawer.Screen name={RouterKey.HOME_SCREEN} component={HomeScreen} />
      {/* You can add more screens to your drawer here */}
    </Drawer.Navigator>
  );
};

const RoutesMapping = () => {
  return (
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name={RouterKey.LOGIN_SCREEN} component={LoginScreen} />
      <Screen
        name={RouterKey.DRAWERNAVIGATION}
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Screen name={RouterKey.SIGNUP_SCREEN} component={SignUpScreen} />
    </Navigator>
  );
};

export default RoutesMapping;
