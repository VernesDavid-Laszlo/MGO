import React, { useState, useEffect } from 'react';
import { Header, Footer } from "../Headre-Footer/Header-Footer";
import ChatModal from "../Chat/Chat";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {
    getFirestore,
    collection,
    query,
    orderBy,
    getDocs,
    where,
    doc,
    getDoc,
} from 'firebase/firestore';
import './MessagesPage.css';

function MessagesPage() {
    const [messagesBySender, setMessagesBySender] = useState({});
    const [chatModalOpen, setChatModalOpen] = useState(false);
    const [activeChatUserId, setActiveChatUserId] = useState(null);
    const db = getFirestore();
    const loggedInUserId = firebase.auth().currentUser?.uid;

    useEffect(() => {
        if (loggedInUserId) {
            fetchLatestMessages(loggedInUserId);
        }
    }, [loggedInUserId, db]);

    const getUserData = async (userId) => {
        const usersCollection = collection(db, 'users');
        const userDoc = await getDoc(doc(usersCollection, userId));
        return userDoc.exists() ? userDoc.data() : null;
    };

    const fetchLatestMessages = async (loggedInUserId) => {
        const messagesCollection = collection(db, 'messages');
        const messagesQuery = query(
            messagesCollection,
            where('recipient', '==', loggedInUserId),
            orderBy('timestamp', 'desc')
        );

        const messagesSnapshot = await getDocs(messagesQuery);
        let newMessagesBySender = {};

        for (let docSnapshot of messagesSnapshot.docs) {
            const messageData = docSnapshot.data();
            const senderId = messageData.sender;
            const senderData = await getUserData(senderId);

            if (!newMessagesBySender[senderId]) {
                newMessagesBySender[senderId] = [];
            }
            newMessagesBySender[senderId].push({
                ...messageData,
                id: docSnapshot.id,
                senderUsername: senderData ? senderData.userName : 'Ismeretlen'
            });
        }

        setMessagesBySender(newMessagesBySender);
    };

    const openChat = (userId) => {
        setActiveChatUserId(userId);
        setChatModalOpen(true);
    };

    const closeChat = () => {
        setChatModalOpen(false);
        setActiveChatUserId(null);
    };

    return (
        <div>
            <Header />
            <h2 className="h2text">Latest Received Messages</h2>
            <div className="messagesContainer">
                {Object.entries(messagesBySender).map(([senderId, messages]) => (
                    <div key={senderId} className="containerMP" onClick={() => openChat(senderId)}>
                        {messages.map((message) => (
                            <div key={message.id} className="message">
                                <strong>{message.senderUsername}</strong> to You: {message.text}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <Footer />
            {chatModalOpen && (
                <ChatModal
                    closeChat={closeChat}
                    senderUserId={loggedInUserId}
                    recipientUserId={activeChatUserId}
                />
            )}
        </div>
    );
}

export default MessagesPage;
