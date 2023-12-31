// App.tsx

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import {AuthProvider} from './src/context/AuthContext'; // Adjust the path
import RoutesMapping from './src/routes/RoutesMapping';
import {Platform} from 'react-native';
import {navigationRef} from '../MGO_app/src/components/Navigation/NavigationService'; // Adjust the path

const App = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <AuthProvider>
        <RoutesMapping />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
