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
import UploadScreen from '../screens/UploadScreen/UploadScreen';
import ProductDetailsCard, {
  Product,
} from '../screens/ProductDetailsCard/ProductDetailsCard';
import ProductListScreen from '../screens/ProductListScreen/ProductListScreen';
import FavoritesScreen from '../screens/FavoriteScreen/FavoritesScreen';
import EditScreen from '../screens/EditScreen/EditScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen/ForgotPasswordScreen';

export type RootStackParamList = {
  [RouterKey.LOGIN_SCREEN]: undefined;
  [RouterKey.HOME_SCREEN]: undefined;
  [RouterKey.SIGNUP_SCREEN]: undefined;
  [RouterKey.DRAWERNAVIGATION]: undefined;
  [RouterKey.EDIT_SCREEN]: undefined;
  [RouterKey.MYPROFILE_SCREEN]: undefined;
  [RouterKey.UPLOAD_SCREEN]: undefined;
  [RouterKey.PRODUCT_DETAILS_CARD]: {product: Product};
  [RouterKey.PRODUCTLIST]: {categoryId: string};
  [RouterKey.FAVORITES_SCREEN]: undefined;
  [RouterKey.FORGOT_PASSWORD]: undefined;
  [RouterKey.CHAT_SCREEN]: {recipientId: string};
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

      <Drawer.Screen
        name={RouterKey.MYPROFILE_SCREEN}
        component={MyProfileScreen}
      />
      <Drawer.Screen name={RouterKey.UPLOAD_SCREEN} component={UploadScreen} />
      <Drawer.Screen
        name={RouterKey.PRODUCT_DETAILS_CARD}
        component={ProductDetailsCard}
      />

      <Drawer.Screen
        name={RouterKey.PRODUCTLIST}
        component={ProductListScreen}
      />

      <Drawer.Screen
        name={RouterKey.FAVORITES_SCREEN}
        component={FavoritesScreen}
      />
      <Drawer.Screen name={RouterKey.EDIT_SCREEN} component={EditScreen} />
      <Drawer.Screen name={RouterKey.CHAT_SCREEN} component={ChatScreen} />
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
      <Screen
        name={RouterKey.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default RoutesMapping;
