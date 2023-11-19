import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import { Header, Footer } from "./components/Headre-Footer/Header-Footer";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import MyProfilePage from "./components/MyProfile/MyProfile";
import Editpage from "./components/EditPage/Editpage";

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                setLoggedIn(true);
            } else {
                setLoggedIn(false);
            }
        });

        // Cleanup function
        return () => unsubscribe();
    }, []);

    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/login">
                        {loggedIn ? <Redirect to="/home" /> : <LoginPage />}
                    </Route>
                    <Route path="/signup">
                        {loggedIn ? <Redirect to="/home" /> : <SignUpPage />}
                    </Route>
                    <Route path="/home">
                        {loggedIn ? <HomePage /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/myprofile">
                        {loggedIn ? <MyProfilePage /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/edit">
                        {loggedIn ? <Editpage /> : <Redirect to="/login" />}
                    </Route>
                    <Redirect from="/" to="/login" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
