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
        The goal of Sudoku is to fill the entire grid with so that each column, row, and 3 x 3 sub
        grid contain every number from one to nine.
        </p>
        </div>
    );
};