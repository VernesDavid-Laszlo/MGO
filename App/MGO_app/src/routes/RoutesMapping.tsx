import React from 'react';
import {RouterKey} from './Routes';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerHeader from '../components/CustomDrawerNavigationHeader/CustomDrawerHeader';
import SignUpScreen from '../screens/SingUpScreen/SingUpScreen';
import CustomDrawerContent from '../components/CustomDrawerContent/CustomDrawerContent';
import MyProfileScreen from '../screens/MyProfileScreen/MyProfileScreen';
import EditScreen from '../screens/EditScreen/EditScreen';
import UploadScreen from '../screens/UploadScreen/UploadScreen';
import ProductDetailsCard from '../screens/ProductDetailsCard/ProductDetailsCard';

export type RootStackParamList = {
  [RouterKey.LOGIN_SCREEN]: undefined;
  [RouterKey.HOME_SCREEN]: undefined;
  [RouterKey.SIGNUP_SCREEN]: undefined;
  [RouterKey.DRAWERNAVIGATION]: undefined;
  [RouterKey.EDIT_SCREEN]: undefined;
  [RouterKey.MYPROFILE_SCREEN]: undefined;
  [RouterKey.UPLOAD_SCREEN]: undefined;
  [RouterKey.PRODUCT_DETAILS_CARD]: undefined;
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
      <Drawer.Screen name={RouterKey.MYPROFILE_SCREEN} component={MyProfileScreen} />
      <Drawer.Screen name={RouterKey.EDIT_SCREEN} component={EditScreen} />
      <Drawer.Screen name={RouterKey.UPLOAD_SCREEN} component={UploadScreen} />
      <Drawer.Screen name={RouterKey.PRODUCT_DETAILS_CARD} component={ProductDetailsCard} />

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
