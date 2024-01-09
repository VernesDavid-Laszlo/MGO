import React, {useState, useEffect} from 'react';
import {View, TextInput, Button, FlatList, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = ({currentUser, recipient}) => {
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);

  // Fetch messages
  useEffect(() => {
    const unsubscribe = firestore()
      .collection('messages')
      .where('recipient', '==', recipient)
      .orderBy('timestamp', 'desc')
      .onSnapshot(querySnapshot => {
        const firestoreMessages = querySnapshot.docs.map(doc => ({
          _id: doc.id,
          text: doc.data().text,
          createdAt: doc.data().timestamp.toDate(),
          user: {
            _id: doc.data().sender,
          },
        }));
        setMessages(firestoreMessages);
      });

    return () => unsubscribe(); // Detach listener on unmount
  }, [recipient]);

  // Send a message
  const sendMessage = async () => {
    if (inputText.trim() === '') {
      return;
    }

    await firestore().collection('messages').add({
      text: inputText,
      sender: currentUser,
      recipient: recipient,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });

    setInputText(''); // Clear the input field
  };

  // Render each message item
  const renderMessageItem = ({item}) => (
    <View
      style={{
        padding: 10,
        backgroundColor:
          item.user._id === currentUser ? 'lightblue' : 'lightgreen',
      }}>
      <Text>{item.text}</Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        inverted
        data={messages}
        keyExtractor={item => item._id}
        renderItem={renderMessageItem}
      />
      <TextInput
        placeholder="Type a message..."
        value={inputText}
        onChangeText={setInputText}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatScreen;
