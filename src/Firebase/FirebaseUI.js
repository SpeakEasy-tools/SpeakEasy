import React from "react";
import firebase from "firebase/app";
import "firebase/auth";
import { StyledFirebaseAuth } from "react-firebaseui";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../utils";
import clsx from "clsx";

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
const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "90%",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "auto",
        alignItems: "center"
    },
    row: {
        width: "100%",
        display: "flex",
        flexFlow: "row noWrap",
        justifyContent: "center",
        alignItems: "center"
    },
    pad: {
        margin: theme.spacing(1)
    },
    section: {
        backgroundColor: theme.palette.secondary.light,
        width: "100%"
    },
    details: {
        backgroundColor: theme.palette.secondary.main,
        border: `5px solid ${theme.palette.secondary.dark}`
    },
    logo: {
        maxWidth: "200px",
        maxHeight: "60px"
    },
    header: {
        width: "100%"
    }
}));

function FirebaseUI() {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <StyledFirebaseAuth
                        uiConfig={uiConfig}
                        firebaseAuth={firebase.auth()}
                    />
                </div>
            </div>
        </div>
    );
}

FirebaseUI.displayName = "FirebaseUI";
export default FirebaseUI;
