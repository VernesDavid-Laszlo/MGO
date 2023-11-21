import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "./SignUpPage.css";

function SignUpPage({ onSignup }) {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const checkUsernameAvailability = async (username) => {
        try {
            const querySnapshot = await firebase.firestore().collection('users').where('userName', '==', username).get();
            return querySnapshot.empty;
        } catch (error) {
            console.error('Error checking username availability:', error.message);
            return false;
        }
    };

    const validatePhoneNumber = () => {
        const phoneRegex = /^07\d{8}$/;

        if (!phoneRegex.test(phoneNumber)) {
            setPhoneNumberError('Phone number must start with "07" and contain exactly 10 numbers');
            return false;
        }

        setPhoneNumberError('');
        return true;
    };

    const validPassword = () => {
        if (password.length < 6) {
            setPasswordError("Your password must contain at least 6 characters");
        } else {
            setPasswordError('');
        }
    };

    const handleContinue = async () => {
        try {
            setEmailError('');
            setUsernameError('');
            setPhoneNumberError('');
            setPasswordError('');

            const isUsernameAvailable = await checkUsernameAvailability(userName);

            if (!isUsernameAvailable) {
                setUsernameError('Username is already in use!!');
                return;
            }

            if (!validatePhoneNumber()) {
                return;
            }

            validPassword();

            if (passwordError) {
                return;
            }

            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            await firebase.firestore().collection('users').doc(user.uid).set({
                userName,
                phoneNumber,
                email,
            });

            onSignup();


            history.push('/home');
        } catch (error) {
            if (error.code === 'auth/invalid-email') {
                setEmailError('Invalid email format. Please enter a valid email!!');
            } else if (error.code === 'auth/email-already-in-use') {
                setEmailError('Email is already in use!!');
            } else {
                console.error('Error creating user:', error.message);
            }
        }
    };

    return (
        <div className="bodySU">
            <div className="cardSU">
                <div className="logoSU2">
                    <img src="images/MGO_logo.png" alt="My Logo" className="logoSU1" />
                </div>
                <div className="cardSU-inputs">
                    <input
                        type="text"
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="inputSU"
                        placeholder="User name"
                    />
                    {usernameError && <p className="error-text" style={{ color: 'red' }}>{usernameError}</p>}
                    <input
                        type="text"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="inputSU"
                        placeholder="Phone number"
                    />
                    {phoneNumberError && <p className="error-text" style={{ color: 'red' }}>{phoneNumberError}</p>}
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputSU"
                        placeholder="Email"
                    />
                    {emailError && <p className="error-text" style={{ color: 'red' }}>{emailError}</p>}
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="inputSU"
                        placeholder="Password"
                    />
                    {passwordError && <p className="error-text" style={{ color: 'red' }}>{passwordError}</p>}
                </div>
                <div className="cardSU-buttons">
                    <button onClick={handleContinue}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
