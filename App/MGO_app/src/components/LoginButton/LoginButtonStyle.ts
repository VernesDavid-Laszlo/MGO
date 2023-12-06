import {Colors} from '../../utils/Colors';
import {StyleSheet} from 'react-native';

export const loginButtonStyle = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.PURPLE,
    width: '85%',
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: Colors.WHITE,
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
