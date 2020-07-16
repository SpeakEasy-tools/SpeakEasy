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
        flex: "1 1 100%"
    },
    pad: {
        padding: theme.spacing(0)
    }
}));

function Instructions() {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography paragraph>
                        The goal of Sudoku is to fill the entire grid so that
                        each column, row, and 3 x 3 grid contains every number
                        from one to nine.
                    </Typography>
                </div>
            </div>
        </div>
    );
}
Instructions.displayName = "Instructions";
export default Instructions;
