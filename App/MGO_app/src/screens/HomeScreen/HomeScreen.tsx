import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from '../LoginScreen/LoginScreen.style';

const HomeScreen = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hey you home screen</Text>
    </SafeAreaView>
  );
};
export default HomeScreen;
