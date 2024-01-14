// ChatScreen.tsx

import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RouterKey} from '../../routes/Routes';
import {styles} from './ChatScreenStyles';

type Message = {
  id: string;
  text: string;
  sender: string;
  recipient: string;
  // @ts-ignore
  timestamp: firestore.Timestamp;
  participants: string[];
  isCurrentUserSender?: boolean; // Add this line
};

type ChatScreenRouteProp = RouteProp<RootStackParamList, RouterKey.CHAT_SCREEN>;

type RootStackParamList = {
  ChatScreen: {recipientId: string};
};

const ChatScreen: React.FC = () => {
  const route = useRoute<ChatScreenRouteProp>();
  const {recipientId} = route.params;
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const currentUser = auth().currentUser?.uid; // Get the current user's ID from Firebase Authentication

  useEffect(() => {
    if (!currentUser || !recipientId) {
      // console.log('Missing current user or recipient ID');
      return;
    }

    // console.log(`Setting up chat between ${currentUser} and ${recipientId}`);

    const messagesQuery = firestore()
      .collection('messages')
      .where('participants', 'array-contains', currentUser);

    const unsubscribe = messagesQuery.onSnapshot(
      querySnapshot => {
        // @ts-ignore
        const fetchedMessages = [];
        querySnapshot.forEach(doc => {
          const message = doc.data() as Message;
          if (message.participants.includes(recipientId)) {
            fetchedMessages.push({
              ...message,
              id: doc.id,
              isCurrentUserSender: message.sender === currentUser,
            });
          }
        });
        // @ts-ignore
        setMessages(fetchedMessages.sort((a, b) => b.timestamp - a.timestamp));
      },
      error => {
        // console.error('Error fetching messages:', error);
      },
    );

    return () => {
      // console.log('Unsubscribing from messages');
      unsubscribe();
    };
  }, [recipientId, currentUser]);

  const sendMessage = async () => {
    if (!input.trim() || !currentUser || !recipientId) {
      // console.log('Cannot send an empty message or missing IDs');
      return;
    }

    try {
      await firestore()
        .collection('messages')
        .add({
          text: input,
          sender: currentUser,
          recipient: recipientId,
          timestamp: firestore.FieldValue.serverTimestamp(),
          participants: [currentUser, recipientId],
        });

      // console.log(`Message sent: ${input}`);
      setInput('');
    } catch (error) {
      // console.error('Error sending message:', error);
    }
  };

  // @ts-ignore
  const renderTimestamp = (timestamp: firestore.Timestamp) => {
    let date = timestamp.toDate();
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        inverted
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageContainer,
              item.isCurrentUserSender
                ? styles.currentUserContainer
                : styles.recipientContainer,
            ]}>
            <View
              style={[
                styles.messageBubble,
                item.isCurrentUserSender
                  ? styles.currentUserBubble
                  : styles.recipientBubble,
              ]}>
              <Text style={styles.messageText}>{item.text}</Text>
              <Text style={styles.timestamp}>
                {item.timestamp ? renderTimestamp(item.timestamp) : ''}
              </Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          style={styles.input}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
};

export default ChatScreen;
