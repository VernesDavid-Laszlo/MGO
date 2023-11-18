import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import ProductsByCaregory from "./components/ProductsByCaregory/ProductsByCaregory";
import EditPage from "./components/EditPage/Editpage";
import MyProfile from "./components/MyProfile/MyProfile";
import { Header } from "./components/Headre-Footer/Header-Footer";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleLogin = () => {
        setLoggedIn(true);
    };

    const handleSignup = () => {
        // Implement signup logic if needed
        // For simplicity, let's assume signup is successful
        setLoggedIn(true);
    };

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login">
                        <LoginPage onLogin={handleLogin} onSignup={handleSignup} />
                    </Route>
                    <Route path="/signup">
                        <SignUpPage onSignup={handleSignup} />
                    </Route>
                    <Route path="/home">
                        {loggedIn ? <HomePage /> : <Redirect to="/login" />}
                    </Route>
                    <Redirect from="/" to="/login" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
