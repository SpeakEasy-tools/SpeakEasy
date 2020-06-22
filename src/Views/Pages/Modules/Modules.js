import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import ModulesPanel from "./ModulesPanel";

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

function Modules() {
    document.title = "Manage Modules";
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ModulesPanel />
            </div>
        </div>
    );
}
Modules.displayName = "Modules";
export default Modules;
