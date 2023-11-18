// SignUpPage.js
import "./SignUpPage.css";
import React from 'react';
import { useHistory } from 'react-router-dom';

function SignUpPage({ onSignup }) {
    const history = useHistory();

    const handleContinue = () => {
        // Implement your signup logic here if needed

        // For simplicity, let's assume signup is successful

        // Call onSignup to update the login status
        onSignup();

        // Redirect to the home page
        history.push('/home');
    };

    return (
        <div className="bodySU">
            <div className="cardSU">
                <div className="logoSU2">
                    <img src="images/MGO_logo.png" alt="My Logo" className="logoSU1" />
                </div>
                <div className="cardSU-inputs">
                    <input type="text" name="text" className="inputSU" placeholder="User name" />
                    <input type="text" name="text" className="inputSU" placeholder="Date of birth" />
                    <input type="text" name="text" className="inputSU" placeholder="Email" />
                    <input type="text" name="text" className="inputSU" placeholder="Password" />
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
