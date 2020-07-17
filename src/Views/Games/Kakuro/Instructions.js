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
                        The goal of Kakuro is to fill all empty squares using
                        numbers 1 through 9 so that the sum of each horizontal
                        block equals the clue on its left, while the sum of each
                        vertical block equals the clue on its top. Similar to
                        Sudoku, no number can be used in the same block more
                        than once.
                    </Typography>
                </div>
            </div>
        </div>
    );
}
Instructions.displayName = "Instructions";
export default Instructions;
