import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase/compat/app";
import {getFirestore,collection,getDocs} from "firebase/firestore";
import UploadPage from "./components/UploadPage/UploadPage";
import Product from "./components/Product/Product";
import EditPage from "./components/EditPage/Editpage";
import MyProfile from "./components/MyProfile/MyProfile";
import MyProfilePage from "./components/MyProfile/MyProfile";
import AdminPage from "./components/AdminPage/AdminPage";


const firebaseConfig = {
    apiKey: "AIzaSyCTBjdApQrc1cIZIJ4ALeMrMfLCv6shlXQ",
    authDomain: "mgoo-faa26.firebaseapp.com",
    databaseURL: "https://mgoo-faa26-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mgoo-faa26",
    storageBucket: "mgoo-faa26.appspot.com",
    messagingSenderId: "1058292079708",
    appId: "1:1058292079708:web:03eebeb75407ad3908da99",
    measurementId: "G-PVK93JLRTT"
};

firebase.initializeApp(firebaseConfig);

const db = getFirestore();
const colRef = collection(db,'users');
const addUser=document.querySelector('.add');


getDocs(colRef).then((snapshot)=>{
    let users = [];

    //snaphot keszul a collectionrol amiben a .docs-al elerjuk a documentumokat amiben foreach-el megyunk a fildeken
    snapshot.docs.forEach((doc) =>{
        if (doc.data().category === 'Alex Samuel')
            users.push(doc.data());

    })

    users.forEach((user)=>{
        if(user.name === 'Alex Samuel')
            console.log(user);
    })
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

        <App />
    </React.StrictMode>,

);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
