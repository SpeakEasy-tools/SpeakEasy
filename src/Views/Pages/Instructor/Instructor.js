import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%",
        overflow: "auto"
    },
    row: {
        width: "100%",
        display: "flex",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

function Instructor() {
    document.title = "Instructor";
    const classes = useStyles(Theme);

    return <div className={clsx(classes.root)}></div>;
}

Instructor.displayName = "Instructor";
export default Instructor;
