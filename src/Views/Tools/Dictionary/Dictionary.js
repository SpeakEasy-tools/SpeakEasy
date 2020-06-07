import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { ViewWrapper } from "../../../Components/ViewWrapper";

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
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

function Dictionary() {
    document.title = "Dictionary";
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper />
            </div>
            <div className={clsx(classes.content)} />
        </div>
    );
}

Dictionary.displayName = "Dictionary";
export default Dictionary;
