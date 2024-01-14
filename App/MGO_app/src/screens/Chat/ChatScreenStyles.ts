import {StyleSheet} from 'react-native';
import {Colors} from '../../utils/Colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BLACK, // Example background color
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff', // Example input area color
  },
  input: {
    color: Colors.BLACK,
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.LIGHTGRAY,
    padding: 8,
    marginRight: 8,
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '70%',
  },
  currentUserContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  recipientContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  currentUserBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.PURPLE,
  },
  recipientBubble: {
    backgroundColor: Colors.LIGHTGRAY,
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  timestamp: {
    fontSize: 12,
    marginTop: 5,
    color: Colors.WHITE,
  },
});
