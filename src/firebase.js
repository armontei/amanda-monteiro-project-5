import firebase from 'firebase/app';
import 'firebase/database';

// configuration object
const config = {
    apiKey: "AIzaSyDjFLGw9uZxi2bKP7M5iAYTKa8mZ1b8v74",
    authDomain: "cleannie-8323c.firebaseapp.com",
    databaseURL: "https://cleannie-8323c.firebaseio.com",
    projectId: "cleannie-8323c",
    storageBucket: "cleannie-8323c.appspot.com",
    messagingSenderId: "739127105460",
    appId: "1:739127105460:web:9eedebd42440fa4d51c4e1"
};

// Initialize Firebase
firebase.initializeApp(config);

// this exports the CONFIGURED version of firebase
export default firebase;