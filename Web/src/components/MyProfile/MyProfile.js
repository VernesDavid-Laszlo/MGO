import React, { useState } from 'react';
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore,collection} from "firebase/firestore";
import MyProfile from './MyProfile.css';
import { doc, getDoc } from "firebase/firestore";
import async from "async";


const MyProfilePage = () => {

    const auth = getAuth();
    const user = auth.currentUser;
    const productColRef = collection(getFirestore(), "products");
    const userAddress = "Los Angeles sunshine street 1" //user.address;
    const userCity ="Los Angeles"// user.city;
    const userPhoneNum = "0761842975" //user.phoneNumber;
    const userEmail = "alex_johnson@gmail.com" //user.email;





    const checkUserType = () => {
        if (user) {
            const uName = user.displayName;
            return uName;
        } else {
            return "admin";
        }
    };



    return (
        <div>
            <h2>{checkUserType()} Your Profile </h2>
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
                <div>
                    <MyProfileLabel
                        label="Email:"
                        text={userEmail}

                    />
                </div>

            </div>

        </div>

    );
};

const MyProfileLabel = (props) => (
    <>
        <label  >{props.label}</label>
        <text >{props.text}</text>
    </>
);

export default MyProfilePage;
