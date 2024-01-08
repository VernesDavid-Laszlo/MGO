import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cardContainerEP: {
    backgroundColor: 'black',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    maxWidth: 1200,
    position: 'relative',
    marginTop: 20,
    marginBottom: 50,

    marginHorizontal: 'auto',
  },
  bodyEP: {
    position: 'relative',
    backgroundColor: 'black',
    minWidth: 280,
    color: 'white',
    height: '100%',
    fontSize: 30,
    padding: 0,
    margin: 0,
  },
  editPageTitle: {
    marginTop: 10,
    marginBottom: 20,
  },
  userEditForm: {
    position: 'relative',
    marginVertical: 5,
  },
  userEditFormField: {
    marginVertical: 10,
    flexDirection: 'row',
    width: '100%',
  },
  userEditFormLabel: {
    marginBottom: 10,
    marginTop: 10,

    fontSize: 20,
  },
  userEditFormInput: {
    minWidth: 200,
    alignItems: 'center',
    margin: 0,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 15,
    backgroundColor: '#333',
  },
  cardContainerEPInput: {
    borderRadius: 15,
  },
  footerEditPage: {
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    marginRight: 20,
    width: '100%',
    backgroundColor: 'black',
    alignContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
  },
  buttonEditPage: {
    margin: 50,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#3498db',
    color: 'white',
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 15,
    height: 45,
  },
  buttonEditPageHover: {
    backgroundColor: '#2980b9',
  },
});

export default styles;
