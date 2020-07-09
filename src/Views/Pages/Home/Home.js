import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { HOME } from "../../../Routes/Routes";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import firebase from "firebase/app";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%"
    },
    content: {
        padding: theme.spacing(1),
        flex: "1 1 100%",
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    row: {
        width: "100%",
        display: "flex"
    },
    pad: {
        padding: theme.spacing(1)
    },
    input: {
        color: theme.palette.secondary.contrastText
    }
}));

function Home() {
    document.title = HOME.name;
    const classes = useStyles(Theme);
    var user = firebase.auth().currentUser;

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    {user ? (
                        <Typography variant="h4" color="secondary">
                            Welcome back {user.displayName.split(" ")[0]}! To
                            coninue learning, select a tool or game from the
                            menu.
                        </Typography>
                    ) : (
                        <Typography variant="h6" color="secondary">
                            SpeakEasy.tools is a data-driven web application for
                            helping people learn a second language through
                            artificial intelligence, data science, immersion,
                            and gamification. SpeakEasy.tools has a portable and
                            unique combination of tone training, fun and
                            educational games, and informative progress tracking
                            allows you to learn to read a language faster and
                            learn more accurate pronunciation than the average
                            language learning program. To get started, please
                            log in or create an account by clicking the profile
                            icon in the top left.
                        </Typography>
                    )}
                    <Divider />
                </div>
            </div>
        </div>
    );
}

Home.displayName = "Home";
export default Home;
