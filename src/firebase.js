import firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyDVIixqkWuSZ4BykDCQW7tgCbCxl4uww9A",
    authDomain: "studier-1220a.firebaseapp.com",
    databaseURL: "https://studier-1220a.firebaseio.com",
    projectId: "studier-1220a",
    storageBucket: "studier-1220a.appspot.com",
    messagingSenderId: "99927060077",
    appId: "1:99927060077:web:32c2e78b04e392a9809964",
    measurementId: "G-GSYRBVPVQ2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;