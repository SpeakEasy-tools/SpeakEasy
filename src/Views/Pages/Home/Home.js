import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { HOME } from "../../../Routes/Routes";
import { ViewWrapper } from "../../../Components/ViewWrapper";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
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

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper />
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography variant="h4" color="secondary">
                        Welcome to SpeakEasy.tools
                    </Typography>
                    <Divider />
                </div>
            </div>
        </div>
    );
}

Home.displayName = "Home";
export default Home;
