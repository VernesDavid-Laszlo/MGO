// AuthContext.tsx

import React, {createContext, useContext} from 'react';
import auth from '@react-native-firebase/auth';
import {navigate} from '../components/Navigation/NavigationService';
import {RouterKey} from '../routes/Routes';

interface AuthContextData {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  // Add other functions like login, signUp if needed
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const login = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email and password cannot be empty.');
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('User logged in');
      navigate(RouterKey.DRAWERNAVIGATION); // Navigate to the home screen after successful login
    } catch (error) {
      // console.error('Login error:', error);
      throw error; // Propagate the error
    }
  };

  const logout = async () => {
    try {
      await auth().signOut();
      navigate(RouterKey.LOGIN_SCREEN);
      console.log('User logged out');
      // Navigate after logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Define other functions like login, signUp here

  return (
    <AuthContext.Provider value={{login, logout /*, other functions */}}>
      {children}
    </AuthContext.Provider>
  );
};
