import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../../../utils";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {
    	whiteSpace: 'pre-line'
    }
}));

export default () => {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
        <p>
        Click and drag to select words hidden within the grid.
        </p>
        </div>
    );
};