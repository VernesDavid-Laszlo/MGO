import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import "./LoginPage.css";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const handleLogin = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
            history.push('/home');
        } catch (error) {
            console.error('Login failed:', error.message);
            setError('Invalid email or password!   Please try again!    ');
        }
    };

    const handleSignup = () => {
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
                    {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}
                </div>
                <div className="cardLP-buttons">
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={handleSignup}>Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
