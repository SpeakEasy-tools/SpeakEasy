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
                    <Typography variant="h2">Instructions</Typography>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography paragraph>
                        The goal of 2048 is to create a tile with the value 2048
                        by combining tiles with the same number to add them
                        together. This can be done by pressing the arrow keys on
                        your keyboard to slide all tiles in the designated
                        direction. After every move, a new 2 or 4 tile will
                        randomly appear. Once the board is completely filled
                        with tiles the game is over.
                    </Typography>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography paragraph>
                        If a move causes three consecutive tiles of the same
                        value to slide together, only the two tiles farthest
                        along the direction of motion will combine. If all four
                        spaces in a row or column are filled with tiles of the
                        same value, a move parallel to that row/column will
                        combine the first two and last two.
                    </Typography>
                </div>
            </div>
        </div>
    );
}
Instructions.displayName = "Instructions";
export default Instructions;
