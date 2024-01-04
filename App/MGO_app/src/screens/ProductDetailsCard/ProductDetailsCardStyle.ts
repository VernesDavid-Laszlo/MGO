import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 20,
    backgroundColor: '#333',
    borderRadius: 15,
    padding: 20,
    marginBottom: 50,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 16,
  },
  thanksText: {
    color: 'green',
  },
  ratingInputContainer: {
    alignItems: 'center',
  },
  ratingInput: {
    width: 65,
    height: 40,
    backgroundColor: 'white',
    color: 'black',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    textAlign: 'center',
  },
  callerButton: {
    backgroundColor: '#3498db',
    borderRadius: 15,
    marginTop: 10,
    padding: 8,
    width: 100,
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
  },
  submitButton: {
    backgroundColor: '#3498db',
    borderRadius: 15,
    marginTop: 5,
    padding: 8,
    height: 40,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default styles;
