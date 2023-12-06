import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';

export const hintstyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    paddingTop: 30,
  },
  text: {
    width: '90%',
    fontSize: 16,
    color: Colors.RED,
  },
  icon: {
    width: '10%',
  },
});
