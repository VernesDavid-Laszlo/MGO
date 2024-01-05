import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  body: {
    backgroundColor: 'black',
  },
  cardContainerUP: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    padding: 20,
    maxWidth: 1200,
    position: 'relative',
    margin: 'auto',
    marginTop: 20,
    marginBottom: 50,
  },
  bodyUpInput: {
    borderRadius: 15,
  },
  imageUploadPage: {
    marginTop: 10,
  },

  selectedImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'white',
    justifyContent: 'space-between',
  },
  selectedImage: {
    width: 100,
    height: 100,
    marginRight: 10,

  },
  deleteButton: {
    color: 'red', // or any other color you prefer
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
    padding: 5,
  },
  imageUploadPageLabel: {
    display: 'flex',
    marginBottom: 5,
    fontSize: 16,
    color: 'white',
  },
  imageUploadPageInput: {
    display: 'none',
  },
  imageUploadPageLabelAfter: {
    //content: 'Select Image',
    padding: 8,
    backgroundColor: '#3498db',
    color: 'white',
    borderRadius: 5,
    marginLeft: 20,
  },
  imageUploadPageInputHover: {
    backgroundColor: '#2980b9',
  },
  categoryUploadPage: {
    marginBottom: 20,
  },
  descriptionUploadPageTextarea: {
    height: 250,
    marginBottom: 10,
    borderRadius: 15,
    padding: 20,
    fontSize: 18,
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: 'white',
  },
  bodyUP: {
    position: 'relative',
    backgroundColor: 'black',
    minWidth: 280,
    color: 'white',
    height: '100%',
    fontSize: 30,
    padding: 0,
  },
  uploadPageHeader: {
    marginTop: 10,
    marginBottom: 20,
    fontSize: 24,
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  uploadPageTitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  uploadPageInput: {
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: '#333',
  },

  uploadPagePrice: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 20,
  },
  uploadPageCurrencyText: {
    fontSize: 18,
    marginBottom: 5,
    marginTop: 20,
  },
  uploadPageCurrencyValue: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 10,
    paddingTop: 10,
    paddingRight: 75,
    paddingLeft: 75,
    backgroundColor: '#333',
    borderRadius: 15,
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  userUploadFormDiv: {
    marginTop: 10,
    marginBottom: 20,
    marginRight: 0,
    marginLeft: 0,
    display: 'flex',
    flexWrap: 'nowrap',
    width: '100%',
  },
  userUploadFormDivLabel: {
    minWidth: 50,
    marginRight: 160,
    marginLeft: 100,
    display: 'flex',
    alignItems: 'center',
  },
  userUploadFormDivPrice: {
    minWidth: 200,
    display: 'flex',
    alignItems: 'center',
    marginRight: 20,
  },
  footerUploadPage: {
    display: 'flex',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    marginRight: 20,
    width: '100%',
    backgroundColor: 'black',
    alignContent: 'flex-end',
  },
  priceUploadPageInput: {
    minHeight: 35,
    alignSelf: 'center',
  },
  buttonUploadPage: {
    marginTop: 20,
    padding: 13,
    fontSize: 16,
    backgroundColor: '#3498db',
    color: 'white',
    height: 50,
    alignSelf: 'center',
    borderRadius: 5,
  },

  categoryUploadPageSelect: {
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 30,
    marginBottom: 5,
    height: 60,
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    color: '#333',
  },
  categoryUploadPageSelectHover: {
    borderColor: '#3498db',
  },
  categoryUploadPageSelectFocus: {
    outline: 'none',
    borderColor: '#3498db',
    boxShadow: '0 0 5px rgba(52, 152, 219, 0.7)',
  },
});

export default styles;
