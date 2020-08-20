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
                        To begin, select a language. The goal of Tile Slider is
                        to use the arrow keys to order the tiles from 1-15, with
                        the blank space in the bottom right. The tile in the
                        corresponding arrow key direction will move into the
                        free space.
                    </Typography>
                </div>
            </div>
        </div>
    );
}
Instructions.displayName = "Instructions";
export default Instructions;
