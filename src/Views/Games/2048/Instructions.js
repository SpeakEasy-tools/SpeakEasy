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
        The goal of 2048 is to create a tile with the value 2048, which is done by combining tiles that have
        the same number. This can be done by pressing the arrow keys on your keyboard to slide all tiles
        in the designated direction. When two tiles of the same number collide, they will merge together 
        with the combined value of the two tiles. After every move, a new tile will randomly appear with a 
        value of two or four. Tiles with different numbers cannot combine, and once the board is completely 
        filled with tiles the game is over. If a move causes three consecutive tiles of the same value to 
        slide together, only the two tiles farthest along the direction of motion will combine. If all 
        four spaces in a row or column are filled with tiles of the same value, a move parallel to that 
        row/column will combine the first two and last two. 
        </p>
        </div>
    );
};