import React, {useEffect, useState} from 'react';
import firebase from "firebase/compat/app";
import { getAuth, updatePassword } from "firebase/auth";
import { getFirestore,collection,updateDoc} from "firebase/firestore";
import Editpage from './Editpage.css';
import { doc, getDoc } from "firebase/firestore";
import async from "async";
import {Footer, Header} from "../Headre-Footer/Header-Footer";


const EditPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newName, setNewName] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [newCity, setNewCity] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('');
    const [username, setUsername] = useState(''); // megszolitas miatt kell
    const auth = getAuth();
    const db = getFirestore();
    const user = firebase.auth().currentUser;




    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleChangePasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleNewNameChange = (e) => { // Added for newName
        setNewName(e.target.value);
    };
    const handleNewAddressChange = (e) => {
        setNewAddress(e.target.value);
        console.log('New Address:', newAddress);
    }
    const handleNewCityChange = (e) => {
        setNewCity(e.target.value);
    };

    const handlePhoneNumberChange = (e) => {
            setNewPhoneNumber(e.target.value)
    };



    const handleSaveChanges = async () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                // Update password if provided
                if (newPassword !== confirmPassword) {
                    console.error('Passwords do not match');
                    return;

                }
                if ( newPassword && newPassword.length < 9) {
                    alert('Password must be at least 9 characters long');
                    return;
                }

                try {
                    await updatePassword(auth.currentUser, newPassword);
                    console.log('Password updated successfully');
                    // You may want to redirect the user or show a success message here
                } catch (error) {
                    console.error('Error updating password:', error.message);
                    // Log the detailed error for further investigation
                    console.error('Detailed error:', error);
                    // Log the response details if available
                    if (error.response) {
                        console.error('Response details:', error.response.data);
                    }
                }

                // Update name if provided
                if (newName) {
                    await updateDoc(userDocRef, {userName: newName});
                    console.log('Name updated successfully');
                }

                if (newPhoneNumber) {
                    await updateDoc(userDocRef, {phoneNumber: newPhoneNumber});
                    console.log('Phone number updated successfully');
                }

                // Update address, city, and phoneNumber if provided
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    const updatedData = {};

                    if (newAddress) {
                       await updateDoc(userDocRef, {address: newAddress});
                        console.log('Address updated successfully');
                    }

                    if (newCity) {
                        await updateDoc(userDocRef, {city: newCity});
                        console.log('City updated successfully');
                    }


                    if (Object.keys(updatedData).length > 0) {
                        await updateDoc(userDocRef, updatedData);
                        console.log('Data updated successfully');
                    }
                }
                alert("updated successfully");
                setNewPassword('');
                setConfirmPassword('');
                setNewName('');
                setNewAddress('');
                setNewCity('');
                setNewPhoneNumber('');
            } else {
                alert('User does not exist');
            }
        } catch (error) {
            console.error('Error updating user data:', error);
        }



    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const currentUser = firebase.auth().currentUser;

                if (currentUser) {
                    const userDoc = await firebase.firestore().collection('users').doc(currentUser.uid).get();

                    if (userDoc.exists) {
                        setUsername(userDoc.data().userName);
                    }
                }
            } catch (error) {
                console.error('Error fetching user data:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <div id="allEP">
            <Header/>
            <div className="bodyEP">
                <div className="cardContainerEP">
                    <div id="editPageTitle">
                        <h2>{username} edit your Profile here </h2>
                    </div>
                    <div id="userEditForm">
                        <div id="newAddress">
                            <EditpageLabel
                                id="newAddress"
                                label="New Address"
                                type="text"
                                value={newAddress}
                                onChange={handleNewAddressChange}
                                placeholder=''
                            />
                        </div>
                        <div>
                            <EditpageLabel
                                id="userName"
                                label="Edit your Name"
                                type="text"
                                value={newName}
                                onChange={handleNewNameChange}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <EditpageLabel
                                id="newPassword"
                                label="New Password"
                                type="password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <EditpageLabel
                                id="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                value={confirmPassword}
                                onChange={handleChangePasswordChange}
                                placeholder=""
                            />
                        </div>
                        <div>
                            <EditpageLabel
                                id="phoneNumber"
                                label="Phone Number"
                                type="text"
                                value={newPhoneNumber}
                                onChange={handlePhoneNumberChange}
                                placeholder=""
                            />
                        </div>
                        <div id="lastEditPage">
                            <EditpageLabel
                                id="city"
                                label="Change city"
                                type="text"
                                value={newCity}
                                onChange={handleNewCityChange}
                                placeholder=""
                            />
                        </div>
                    </div>

                 <button onClick={handleSaveChanges} id = "buttonEditPage">Save Changes</button>
                </div>
                <div className="footerEditPage">
                    <Footer/>
                </div>
            </div>
        </div>
    );
};

const EditpageLabel = (props) => (
    <>
        <label htmlFor={props.id}>{props.label}:</label>
        <input
            type={props.type}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
        />
    </>
);

export default EditPage;

