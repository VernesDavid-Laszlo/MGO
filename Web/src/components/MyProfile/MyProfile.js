import React, { useState, useEffect } from 'react';
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { Header, Footer } from "../Headre-Footer/Header-Footer";
import { getFirestore, collection } from "firebase/firestore";
import MyProfile from './MyProfile.css';
import { doc, getDoc } from "firebase/firestore";
import async from "async";

const MyProfilePage = () => {
    const [userName, setUsername] = useState("Not yet specified");
    const [userAddress, setUserAddress] = useState("Not yet specified");
    const [userCity, setUserCity] = useState("Not yet specified");
    const [userPhoneNum, setUserPhoneNum] = useState("Not yet specified");
    const [userEmail, setUserEmail] = useState("Not yet specified");


    const auth = getAuth();
    const user = auth.currentUser;
    const firestore = getFirestore();
    const userDocRef = doc(firestore, 'users', user.uid);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = firebase.auth().currentUser;

                if (currentUser) {
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUsername(userData.userName);
                        setUserAddress(userData.address);
                        setUserCity(userData.city);
                        setUserPhoneNum(userData.phoneNumber);
                        setUserEmail(userData.email);
                        console.log('User data:', userData);
                    }

                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchData();
    }, [userDocRef]);

    return (
        <div>
            <Header />
            <div className="bodyMP">
                <div className="cardContainerMP">
                    <div id="myProfileTitle">
                        <h2>Your Profile {userName}</h2>
                    </div>
                    <div id="userProfileForm">
                        <div id="newAddress">
                            <MyProfileLabel
                                label="Address:"
                                text={userAddress}
                            />
                        </div>
                        <div>
                            <MyProfileLabel
                                label="City:"
                                text={userCity}
                            />
                        </div>
                        <div>
                            <MyProfileLabel
                                label="Phone Number:"
                                text={userPhoneNum}
                            />
                        </div>
                        <div id="last">
                            <MyProfileLabel
                                label="Email:"
                                text={userEmail}
                            />
                        </div>
                    </div>
                </div>
                <div id="footerMyProfile">
                    <Footer />
                </div>
            </div>
        </div>
    );
};

const MyProfileLabel = (props) => (
    <>
        <label>{props.label}</label>
        <text>{props.text === null ? "Not yet specified" : props.text}</text>
    </>
);

export default MyProfilePage;
