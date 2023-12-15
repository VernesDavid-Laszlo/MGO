import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  appStyle: {
    backgroundColor: 'black',
    flex: 1, // This replaces 'min-height: 100vh' for filling the screen
  },
  bodyText: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 65,
    // Flex properties like 'justifyContent' and 'alignItems' are typically used on container views
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
    // textAlign is not used in React Native. Text alignment is controlled within the Text component
    // Transitions are not supported in React Native StyleSheet
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center', // Align items in the center for each category item
    margin: 10, // Add some margin around each item
    padding: 10, // Add padding for spacing inside the item
    backgroundColor: '#f0f0f0', // Light background color for each category item
    borderRadius: 10, // Rounded corners for the item
  },
  categoryImage: {
    width: 100, // Set a fixed width for the image
    height: 100, // Set a fixed height for the image
    borderRadius: 50, // Make the image circular
    marginBottom: 10, // Margin at the bottom of the image
  },
  categoryText: {
    fontSize: 16, // Set the font size
    fontWeight: 'bold', // Make the text bold
    color: '#333', // Set the text color
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
