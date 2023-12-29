import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  appStyle: {
    backgroundColor: 'black',
    flex: 1, // This replaces 'min-height: 100vh' for filling the screen
  },
  bodyText: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 65,
    // Removed unnecessary flex properties
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    padding: 70,
  },
  card: {
    backgroundColor: 'black',
    borderRadius: 20,
    margin: 50,
    padding: 5,
    width: 200,
    // Removed textAlign and transition properties
  },
  imageContainer: {
    width: 200,
    height: 200,
    overflow: 'hidden', // Note: 'overflow' property may not work as expected in all versions of React Native
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1, // This maintains the aspect ratio of the image
    borderRadius: 100, // This makes the image round
  },
  cardText: {
    marginVertical: 3, // 'marginVertical' is shorthand for setting both 'marginTop' and 'marginBottom'
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
