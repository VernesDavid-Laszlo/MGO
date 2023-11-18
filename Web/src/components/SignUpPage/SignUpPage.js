import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "./SignUpPage.css";

function SignUpPage({ onSignup }) {
    const history = useHistory();
    const [userName, setUserName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleContinue = async () => {
        try {
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;

            await firebase.firestore().collection('users').doc(user.uid).set({
                userName,
                dateOfBirth,
                email,
            });

            onSignup();

            history.push('/home');
        } catch (error) {
            console.error('Error creating user:', error.message);
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
                    <input
                        type="text"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="inputSU"
                        placeholder="Date of birth"
                    />
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputSU"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="inputSU"
                        placeholder="Password"
                    />
                </div>
                <div className="cardSU-buttons">
                    {/* Call handleContinue when the "Continue" button is clicked */}
                    <button onClick={handleContinue}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
