import React, { useState, useEffect } from 'react';
import "./Chat.css";
import closeImage from "./closee.png";
import send from "./send.png";
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp
} from 'firebase/firestore';

const ChatModal = ({ closeChat, senderUserId, recipientUserId }) => {
    const [messageText, setMessageText] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const db = getFirestore();
        const messagesRef = collection(db, 'messages');

        const q = query(
            messagesRef,
            where('sender', 'in', [senderUserId, recipientUserId]),
            where('recipient', 'in', [senderUserId, recipientUserId]),
            orderBy('timestamp', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const fetchedMessages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
                }))
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, [senderUserId, recipientUserId]);

    const sendMessage = async () => {
        if (messageText.trim() === '') {
            return;
        }

        try {
            const db = getFirestore();
            const messagesRef = collection(db, 'messages');
            await addDoc(messagesRef, {
                text: messageText,
                timestamp: serverTimestamp(),
                sender: senderUserId,
                recipient: recipientUserId,
            });
            setMessageText('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-style">
            <div className="headerC">
                <p>Here is your chat.</p>
                <button className="close-button" onClick={closeChat}>
                    <img src={closeImage} alt="Close" />
                </button>
            </div>
            <div className="bodyC">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`message ${message.sender === senderUserId ? 'sent-message' : 'received-message'}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="footerC">
                <input
                    type="text"
                    className="input-field"
                    placeholder="Type your message"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                />
                <button className="send-button" onClick={sendMessage}>
                    <img src={send} alt="Send" />
                </button>
            </div>
        </div>
    );
};

export default ChatModal;
