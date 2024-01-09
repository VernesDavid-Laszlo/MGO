import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import MyProfilePage from "./components/MyProfile/MyProfile";
import ProductsByCaregory from "./components/ProductsByCaregory/ProductsByCaregory";
import FavoritePage from "./components/FavoritesPage/FavoritePage";
import SearchComponent from "./components/SearchBar/SearchBar";
import ProductDetails from "./components/ProductsBySearch/ProductsBySearch";
import MessagesPage from "./components/MessagesPage/MessagesPage";
import EditPage from "./components/EditPage/Editpage";
import UploadPage from "./components/UploadPage/UploadPage";
import Product from "./components/Product/Product";
import AdminPage from "./components/AdminPage/AdminPage";

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
                        {loggedIn ? <EditPage /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/admin">
                        {loggedIn ? <AdminPage /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/products/:categoryId">
                        {loggedIn ? <ProductsByCaregory /> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/product-details/:productId">
                        {loggedIn ? <ProductDetails/> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/favorites">
                        {loggedIn ? <FavoritePage/> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/messages">
                        {loggedIn ? <MessagesPage/> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/upload">
                        {loggedIn ? <UploadPage/> : <Redirect to="/login" />}
                    </Route>
                    <Route path="/prodcard">
                        {loggedIn ? <Product/> : <Redirect to="/login" />}
                    </Route>
                    <Redirect from="/" to="/login" />
                </Switch>
            </div>
        </Router>
    );
}

export default App;
