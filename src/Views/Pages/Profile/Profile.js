import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { ViewWrapper } from "../../../Components/ViewWrapper";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        overflow: "auto"
    },
    content: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexFlow: "row noWrap"
    },
    column: {
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    row: {
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1),
        flex: "1 1 auto"
    }
}));

function Profile() {
    document.title = "Profile";
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper />
            </div>
        </div>
    );
}

Profile.displayName = "Profile";
export default Profile;
