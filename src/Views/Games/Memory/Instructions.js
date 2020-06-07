import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
    root: {}
}));

function Instructions() {
    const classes = useStyles(Theme);

    return <div className={clsx(classes.root)} />;
}

Instructions.displayName = "Instructions";
export default Instructions;
