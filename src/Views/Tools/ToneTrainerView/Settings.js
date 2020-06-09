import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
    root: {}
}));

const Settings = () => {
    const classes = useStyles();
    return <div className={clsx(classes.root)} />;
};

Settings.displayName = "Settings";
export default Settings;
