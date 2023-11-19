import React, { useState } from 'react';
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { Header, Footer } from "../Headre-Footer/Header-Footer";
import { getFirestore, collection } from "firebase/firestore";
import MyProfile from './MyProfile.css';
import { doc, getDoc } from "firebase/firestore";
import async from "async";

const MyProfilePage = () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const productColRef = collection(getFirestore(), "products");
    const userAddress = "Los Angeles sunshine street 1";
    const userCity ="Los Angeles";
    const userPhoneNum = "0761842975";
    const userEmail = "alex_johnson@gmail.com";

    const checkUserType = () => {
        if (user) {
            const uName = user.displayName;
            return uName;
        } else {
            return "admin";
        }
    };

    return (
        <div >
            <Header />
            <div className="bodyMP">

                <div className="cardContainerMP">
                    <div id="myProfileTitle">
                        <h2>Your Profile {checkUserType()}</h2>
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
        <text>{props.text}</text>
    </>
);

export default MyProfilePage;