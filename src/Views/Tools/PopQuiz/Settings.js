import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
    root: {},
    column: {},
    pad: {}
}));

function Settings() {
    const classes = useStyles(Theme);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad)} />
            </div>
        </div>
    );
}
Settings.displayName = "Settings";
export default Settings;
