// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import{getAuth, createUserWithEmailAndPassword} from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const creteUser=createUserWithEmailAndPassword(app);
