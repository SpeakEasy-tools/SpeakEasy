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
                            Welcome back {user.displayName.split(" ")[0]}!
                        </Typography>
                    ) : (
                        <Typography variant="h4" color="secondary">
                            Welcome, to SpeakEasy.tools!
                        </Typography>
                    )}
                    <Divider />
                </div>
            </div>
            <div className={clsx(classes.row)} style={{ width: 400 }}>
                <div className={clsx(classes.pad)}>
                    {user ? (
                        <Typography variant="subtitle1" color="secondary">
                            Pick up where you left off by selecting a game or
                            tool from the menus on the left.
                        </Typography>
                    ) : (
                        <Typography
                            variant="subtitle1"
                            color="secondary"
                            align="justify"
                        >
                            SpeakEasy.tools is a data-driven web application for
                            helping people learn a second language through
                            artificial intelligence, data science, immersion,
                            and gamification. SpeakEasy.tools utilizes a unique
                            combination of multi-modal feedback, fun and
                            educational games, and informative progress tracking
                            to aide you in learning a new language.
                        </Typography>
                    )}
                </div>
            </div>
            {!user && (
                <>
                    <div className={clsx(classes.row)}>
                        <div className={classes.pad}>
                            <Typography variant="h4" color="secondary">
                                AI Technologies
                            </Typography>
                        </div>
                    </div>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            <Typography>Natural Language Processing</Typography>
                        </div>
                    </div>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            <Typography>Speech Recognition</Typography>
                        </div>
                    </div>
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            <Typography>Image Recognition</Typography>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

Home.displayName = "Home";
export default Home;
