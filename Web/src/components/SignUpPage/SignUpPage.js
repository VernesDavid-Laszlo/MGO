import "./SignUpPage.css"

function SignUpPage(){
    return(
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
                    <button>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;