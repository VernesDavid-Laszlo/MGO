import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  bodyMP: {
    backgroundColor: 'black',
    minWidth: 280,
    color: 'white',
    height: '100%',
    fontSize: 30,
    margin: 0,
    padding: 0,
    position: 'relative',
  },
  editIcon: {
    width: 25,
    height: 25,
    position: 'relative',
    left: 340,
  },
  cardContainerMP: {
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    position: 'relative',
  },
  myProfileTitle: {
    marginTop: 20,
    fontSize: 24,
    color: '#61dafb', //szep ez a szin nekem teccik <3
  },
  userProfileForm: {
    marginVertical: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  newAddress: {
    margin: 10,
    flexDirection: 'row',
    width: '100%',
  },
  last: {
    margin: 10,
    flexDirection: 'row',
    width: '100%',
  },
  myProfileProducts: {
    marginVertical: 20,
  },
  myProfilePageProductList: {
    paddingLeft: 0,
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#333',
    display: 'flex',
    alignItems: 'center',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  productImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
  productInfo: {
    flex: 1,
    marginLeft: 5,
  },
  productListItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  deleteButton: {
    color: 'red',
    fontSize: 16,
  },
  footerMyProfile: {
    justifyContent: 'center',
    display: 'flex',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#61dafb',
    position: 'absolute',
    backgroundColor: 'black',
    bottom: -300,
    alignItems: 'center',
  },

  productsButton: {
    fontSize: 16,
    margin: 10,
    backgroundColor: '#3498db',
    borderColor: 'white',
    maxWidth: '39%',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2,
    borderRadius: 5,
    color: 'white',
  },
  labelText: {
    marginRight: 10,
    width: '25%',
    fontSize: 20,
  },
  text: {
    margin: 0,
    maxWidth: '73%',
    fontSize: 20,
    display: 'flex',
    flexWrap: 'wrap',
  },
});

export default styles;
