// LoginPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./LoginPage.css";


function LoginPage({ onLogin, isLoggedIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    // Check if the user is already logged in and redirect them to the home page
    if (isLoggedIn) {
        history.push('/home');
        return null; // Render nothing if already logged in
    }

    const handleLogin = () => {
        // Check if the email and password are not empty
        if (email.trim() !== '' && password.trim() !== '') {
            // You might want to implement actual authentication logic here
            // For simplicity, we'll consider the user logged in
            onLogin();

            // Redirect to the home page
            history.push('/home');
        } else {
            // Fields are empty, do nothing or show an error message
        }
    };

    const handleSignup = () => {
        // Redirect to the signup page
        history.push('/signup');
    };

    return (
        <div className="bodyLP">
            <div className="cardLP">
                <div className="logoLP2">
                    <img src="images/MGO_logo.png" alt="My Logo" className="logoLP1" />
                </div>
                <div className="cardLP-inputs">
                    <input
                        type="text"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputLP"
                        placeholder="Email"
                    />
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="inputLP"
                        placeholder="Password"
                    />
                </div>
                <div className="cardLP-buttons">
                    <button onClick={handleLogin}>Login</button>
                    {/* Call handleSignup when the "Sign up" button is clicked */}
                    <button onClick={handleSignup}>Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
