import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';

export const styles = StyleSheet.create({
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
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND_COLOR,
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 10,
    color: Colors.WHITE,
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
