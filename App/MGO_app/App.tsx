import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import RoutesMapping from './src/routes/RoutesMapping';
import {Platform} from 'react-native';

const App = () => {
  useEffect(() => {
    if (Platform.OS == 'android') {
      SplashScreen.hide();
    }
  }, []);
  return (
    <NavigationContainer>
      <RoutesMapping />
    </NavigationContainer>
  );
};

export default App;
