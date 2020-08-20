import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { StyledFirebaseAuth } from "react-firebaseui";

const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/profile",
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ]
};

function FirebaseUI() {
    return (
        <div>
            <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
            />
        </div>
    );
}

FirebaseUI.displayName = "FirebaseUI";
export default FirebaseUI;
