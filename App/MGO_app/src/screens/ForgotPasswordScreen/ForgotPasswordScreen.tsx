import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../routes/RoutesMapping';
import {RouterKey} from '../../routes/Routes';
import styles from './ForgotPasswordScreenStyle';

type ForgotPasswordScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  RouterKey.FORGOT_PASSWORD
>;
const ForgotPasswordScreen: React.FC<{
  navigation: ForgotPasswordScreenNavigationProp;
}> = ({navigation}) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert(
        'Enter email',
        'Please enter your email address to reset password.',
      );
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert(
          'Check your email',
          'A link to reset your password has been sent to your email.',
        );
        navigation.goBack();
      })
      .catch(error => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputField}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
