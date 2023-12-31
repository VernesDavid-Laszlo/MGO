import React from 'react';
import {RouterKey} from './Routes';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerHeader from '../components/CustomDrawerNavigationHeader/CustomDrawerHeader';
import SignUpScreen from '../screens/SingUpScreen/SingUpScreen';
import CustomDrawerContent from '../components/CustomDrawerContent/CustomDrawerContent';

export type RootStackParamList = {
  [RouterKey.LOGIN_SCREEN]: undefined;
  [RouterKey.HOME_SCREEN]: undefined;
  [RouterKey.SIGNUP_SCREEN]: undefined;
  [RouterKey.DRAWERNAVIGATION]: undefined;
};

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={RouterKey.HOME_SCREEN}
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: ({navigation}) => (
          <CustomDrawerHeader
            title="Menu"
            onMenuPress={() => navigation.openDrawer()}
          />
        ),
      }}>
      <Drawer.Screen name={RouterKey.HOME_SCREEN} component={HomeScreen} />
      {/* ... other screens ... */}
    </Drawer.Navigator>
  );
};

const RoutesMapping = () => {
  return (
    <Navigator>
      <Screen
        name={RouterKey.LOGIN_SCREEN}
        component={LoginScreen}
        options={{headerShown: false}}
      />

      <Screen
        name={RouterKey.SIGNUP_SCREEN}
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Screen
        name={RouterKey.DRAWERNAVIGATION}
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default RoutesMapping;
