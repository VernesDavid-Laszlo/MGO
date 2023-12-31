import React from 'react';
import HomeScreenIcon from '../../assets/homeicon.svg'; // Adjust the import path
import LogOutIcon from '../../assets/logouticon.svg';
import MyProductsIcon from '../../assets/briefcase.svg';
import MessageIcon from '../../assets/mail.svg';
import ProfileIcon from '../../assets/profile.svg';
import FavouritesIcon from '../../assets/heart.svg';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {RouterKey} from '../../routes/Routes';
import {useAuth} from '../../context/AuthContext';

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const {logout} = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem
        // style={styles.drawerItem}
        // icon={() => <HomeScreenIcon style={styles.drawerIcon} />
        label="Home"
        onPress={() => props.navigation.navigate(RouterKey.HOME_SCREEN)}
      />
      <DrawerItem
        // icon={() => <ProfileIcon style={styles.drawerIcon} />}
        label="Account"
        onPress={() => {
          /* Navigate to Account Screen */
        }}
      />
      <DrawerItem
        // icon={() => <MyProductsIcon style={styles.drawerIcon} />}
        label="Inventory"
        onPress={() => {
          /* Navigate to Inventory Screen */
        }}
      />
      {/* ... other drawer items ... */}
      <DrawerItem
        // icon={() => <LogOutIcon style={styles.drawerIcon} />}
        label="Logout"
        onPress={() => logout()} // Call logout on press
      />
    </DrawerContentScrollView>
  );
};
export default CustomDrawerContent;
