import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tile from "./Tile";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
    content: {
        flex: 1,
        display: "flex",
        flexFlow: "column noWrap",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 10
    },
    row: {
        width: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        justifyContent: "center",
        alignItems: "center",
        margin: theme.spacing(1),
        borderRadius: 10
    },
    title: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.main
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    tile: {
        flex: "1 1 20%"
    }
}));

function Board({ tiles, handleFlip }) {
    const classes = useStyles(Theme);

    function handleClick(t) {
        console.log("click");
        handleFlip(t["id"]);
    }

    return (
        <div className={clsx(classes.content)}>
            <div className={clsx(classes.row, classes.title)}>
                {tiles && Boolean(tiles.length) && (
                    <>
                        <div className={clsx(classes.pad)}>
                            <Typography
                                variant="h6"
                                color="primary"
                                align="center"
                            >
                                Matches{" "}
                                {Math.floor(
                                    tiles.filter(d => d["isMatched"]).length / 2
                                )}{" "}
                                of {Math.floor(Object.keys(tiles).length / 2)}
                            </Typography>
                        </div>
                        {Math.floor(
                            tiles.filter(d => d["isMatched"]).length / 2
                        ) === Math.floor(Object.keys(tiles).length / 2) && (
                            <div className={clsx(classes.pad)}>
                                <Checkbox
                                    checked={true}
                                    style={{
                                        color: Theme.palette.primary.main
                                    }}
                                />
                            </div>
                        )}
                    </>
                )}
            </div>
            {tiles && Boolean(tiles.length) && (
                <div
                    style={{
                        flex: "1 1 20%",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexFlow: "row wrap",
                        overflow: "auto",
                        margin: Theme.spacing(1),
                        padding: Theme.spacing(1),
                        backgroundColor: Theme.palette.secondary.dark,
                        borderRadius: 10
                    }}
                >
                    {tiles &&
                        tiles.map(t => (
                            <div
                                className={clsx(classes.tile)}
                                key={`${t.id}_board`}
                                onClick={() => handleClick(t)}
                            >
                                <Tile tile={t} />
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

Board.displayName = "Board";
Board.propTypes = {
    tiles: PropTypes.array.isRequired,
    handleFlip: PropTypes.func.isRequired
};
export default Board;
