import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Board from "./Board";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "100%",
        height: "auto",
        display: "flex"
    },
    row: {
        width: "100%",
        display: "flex"
    },
    pad: {
        padding: theme.spacing(1),
        flex: "1 1 auto"
    }
}));

function TwentyFortyEight() {
    document.title = "2048";
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <Board />
                    </div>
                </div>
            </div>
        </div>
    );
}

TwentyFortyEight.displayName = "TwentyFortyEight";
export default TwentyFortyEight;
