import React, { useState } from 'react';
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore,collection,updateDoc} from "firebase/firestore";
import Editpage from './Editpage.css';
import { doc, getDoc } from "firebase/firestore";
import async from "async";


const EditPage = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [newName, setNewName] = useState(''); // Added for newName
    const [newAddress, setNewAddress] = useState('');
    const [newCity, setNewCity] = useState('');
    const auth = getAuth();
    const db = getFirestore();
    const user = auth.currentUser;





    const checkUserType = () => {
        if (user) {
            const uName = user.displayName;
            return uName;
        } else {
            return "admin";
        }
    };

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

    const handleSaveChanges = async () => {
        if (newPassword !== confirmPassword) {
            console.log('Passwords do not match');
            return;
        }

        try {
            if (user) {
                await user.updatePassword(newPassword);
                console.log('Password updated successfully');
            } else {
                alert('User does not exist');
            }
        } catch (error) {
            console.error('Error updating password:', error);
        }


        console.log('New Address:', newAddress);
        setNewName('')
        setConfirmPassword('');
        setNewPassword('');
        console.log('New Password:', newPassword);
        console.log('Confirm Password:', confirmPassword);
        alert("Your name changed to " + newName);
        alert("Your address changed to " + newAddress);
        // Add API call or other logic for updating user information on the server
    };

    return (
        <div>
            <h2>{checkUserType()} you can edit your Profile here </h2>
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
                    placeholder={"Your current name is " + checkUserType()}
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
                        id = "city"
                        label = "Change city"
                        type="text"
                        value = {newCity}
                        onChange={handleNewCityChange}
                        placeholder=""
                    />
                </div>

        </div>
            <button onClick={handleSaveChanges}>Save Changes</button>
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
