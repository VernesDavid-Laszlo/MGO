import "./LoginPage.css"

function LoginPage() {
    return (
        <div className="bodyLP">
            <div className="cardLP">
                <div className="logoLP2">
                    <img src="images/MGO_logo.png" alt="My Logo" className="logoLP1" />
                </div>
                    <div className="cardLP-inputs">
                        <input type="text" name="text" className="inputLP" placeholder="Email" />
                        <input type="text" name="text" className="inputLP" placeholder="Password" />
                    </div>
                <div className="cardLP-buttons">
                    <button>Login</button>
                    <button>Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;