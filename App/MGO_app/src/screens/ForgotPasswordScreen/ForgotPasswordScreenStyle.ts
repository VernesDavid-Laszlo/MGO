import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.LIGHTGRAY, // You can change this to match your app's theme
  },
  inputField: {
    color: Colors.BLACK,
    width: '100%',
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc', // Border color for the input field
    borderRadius: 5, // Rounded corners for the input field
    backgroundColor: '#ffcccc', // Background color for the input field
  },
  button: {
    width: '100%',
    padding: 15,
    backgroundColor: Colors.PURPLE, // Example button color, change as needed
    borderRadius: 5, // Rounded corners for the button
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.BLACK, // Text color for the button
    fontWeight: 'bold',
  },
});

export default styles;
