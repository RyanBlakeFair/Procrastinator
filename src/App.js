import React, { useState, useEffect } from "react";
import "./App.css";
import firebase from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import Studier from "./components/studier";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyDVIixqkWuSZ4BykDCQW7tgCbCxl4uww9A",
    authDomain: "studier-1220a.firebaseapp.com",
  });
}

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callBacks: {
      signInSuccessWithAuthResult: (e) => {
        if (e.additionalUserInfo.isNewUser) {
          firebase
            .firestore()
            .collection("users")
            .doc(e.user.uid)
            .set({ tasks: [] });
        }
      },
    },
  };

  function signOut() {
    firebase.auth().signOut();
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
  });

  return (
    <div className="App">
      {isSignedIn ? (
        <div>
          <Studier
            displayName={firebase.auth().currentUser.displayName}
            uid={firebase.auth().currentUser.uid}
            signOut={signOut}
          />
        </div>
      ) : (
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebase.auth()}
        />
      )}
    </div>
  );
}

export default App;
