import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.BLACK,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.RED,
    marginBottom: 10,
  },
  logoContainer: {
    position: 'relative',
    width: 300,
    height: 350,
    backgroundColor: '#000',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxShadow: '0 0 10px 5px #9c19d3',
    animation: 'glow 1.6s infinite',
  },
  logo: {
    width: '100%',
    height: 300,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#8707ff',
    alignItems: 'center',
  },
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
  containerLOGIN: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 12,
    color: Colors.WHITE,
    paddingBottom: 5,
  },
  inputContainer: {
    backgroundColor: Colors.INPUT_FIELD_COLOR,
    width: '85%',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    paddingRight: 10,
  },
  inputField: {
    padding: 14,
    fontSize: 18,
    width: '90%',
    color: Colors.WHITE,
  },
  inputPasswordField: {
    padding: 14,
    fontSize: 18,
    width: '90%',
    color: Colors.WHITE,
  },
});

export default styles;
