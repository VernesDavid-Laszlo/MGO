import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  appStyle: {
    backgroundColor: 'black',
    flex: 1,
  },
  bodyText: {
    color: 'white',
    alignSelf: 'center',
    marginTop: 65,
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
  },
  imageContainer: {
    width: 200,
    height: 200,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    borderRadius: 100,
  },
  cardText: {
    marginVertical: 3,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
