import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RouterKey} from '../../routes/Routes';

type ChatScreenRouteProp = RouteProp<RootStackParamList, RouterKey.CHAT_SCREEN>;

type Message = {
  id: string;
  text: string;
  sender: string;
  recipient: string;
  timestamp: firestore.Timestamp;
};

type RootStackParamList = {
  ChatScreen: {recipientId: string};
};

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const {recipientId} = route.params;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  // Get the current user's ID from Firebase Authentication
  const currentUser = auth().currentUser?.uid; // This will be undefined if the user is not logged in

  console.log('Current user ' + currentUser);
  console.log('Recipient id ' + route.params.recipientId);
  useEffect(() => {
    if (!currentUser || !recipientId) {
      return;
    } // Do nothing if we don't have the current user or the recipient ID

    // Listen for new messages between the current user and the recipient
    const unsubscribe = firestore()
      .collection('messages')
      // You might need to adjust the query depending on how you're storing messages
      .where('participants', 'array-contains', currentUser)
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        const newMessages = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...(doc.data() as Message),
        }));
        setMessages(newMessages);
      });

    return () => unsubscribe();
  }, [recipientId, currentUser]);

  const sendMessage = async () => {
    if (!input.trim() || !currentUser || !recipientId) {
      return;
    } // Do nothing if the input is empty or we don't have the necessary IDs

    // Add new message to Firestore
    await firestore()
      .collection('messages')
      .add({
        text: input,
        sender: currentUser,
        recipient: recipientId,
        timestamp: firestore.FieldValue.serverTimestamp(),
        participants: [currentUser, recipientId],
      });

    setInput('');
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={messages}
        inverted // Latest messages at the bottom
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <Text
            style={{
              padding: 8,
              backgroundColor:
                item.sender === currentUser ? '#e0e0e0' : '#f0f0f0',
            }}>
            {item.text}
          </Text>
        )}
      />
      <View style={{flexDirection: 'row', padding: 8}}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={{flex: 1, borderWidth: 1, borderColor: 'gray', padding: 8}}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatScreen;
