import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Tile from "./Tile";

const useStyles = makeStyles(() => ({
    root: {},
    row: {
        width: "100%",
        display: "flex"
    }
}));

function Square({ vals, squareId, handleClick }) {
    const classes = useStyles(Theme);

    const handleTileClick = (tileId, val) => {
        return handleClick(squareId, tileId, val);
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <Tile
                    onClick={val => handleTileClick(0, val)}
                    val={vals[0]}
                    id={squareId.toString() + "0"}
                />
                <Tile
                    onClick={val => handleTileClick(1, val)}
                    val={vals[1]}
                    id={squareId.toString() + "1"}
                />
                <Tile
                    onClick={val => handleTileClick(2, val)}
                    val={vals[2]}
                    id={squareId.toString() + "2"}
                />
            </div>
            <div className={clsx(classes.row)}>
                <Tile
                    onClick={val => handleTileClick(3, val)}
                    val={vals[3]}
                    id={squareId.toString() + "3"}
                />
                <Tile
                    onClick={val => handleTileClick(4, val)}
                    val={vals[4]}
                    id={squareId.toString() + "4"}
                />
                <Tile
                    onClick={val => handleTileClick(5, val)}
                    val={vals[5]}
                    id={squareId.toString() + "5"}
                />
            </div>
            <div className={clsx(classes.row)}>
                <Tile
                    onClick={val => handleTileClick(6, val)}
                    val={vals[6]}
                    id={squareId.toString() + "6"}
                />
                <Tile
                    onClick={val => handleTileClick(7, val)}
                    val={vals[7]}
                    id={squareId.toString() + "7"}
                />
                <Tile
                    onClick={val => handleTileClick(8, val)}
                    val={vals[8]}
                    id={squareId.toString() + "8"}
                />
            </div>
        </div>
    );
}

Square.displayName = "Square";
Square.propTypes = {
    vals: PropTypes.any,
    squareId: PropTypes.any,
    handleClick: PropTypes.any
};
export default Square;
