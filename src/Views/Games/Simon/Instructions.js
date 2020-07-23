import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexFlow: "row wrap",
        overflow: "auto"
    },
    row: {
        display: "flex",
        flex: "1 1 100%",
        justifyContent: "start"
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

function Instructions() {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography paragraph>
                        To begin, press the start button. The buttons will flash in a given sequence,
                        and you must click the buttons in the matching sequence.
                    </Typography>
                </div>
            </div>
        </div>
    );
}
Instructions.displayName = "Instructions";
export default Instructions;
