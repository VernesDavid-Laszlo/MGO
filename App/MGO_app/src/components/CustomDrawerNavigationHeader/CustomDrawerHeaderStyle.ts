import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';
export const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 15,
  },
  menuText: {
    color: Colors.BLACK,
    fontSize: 24,
    marginRight: 20,
  },
  headerTitle: {
    color: Colors.BLACK,
    fontSize: 20,
  },
});
