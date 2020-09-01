import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    content: {
        flex: 1,
        display: "flex",
        flexFlow: "column noWrap",
        borderRadius: 10,
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        "&:hover": {
            cursor: "pointer",
            boxShadow: `0px 0px 10px ${theme.palette.primary.light}`
        }
    },
    row: {
        flex: 1,
        width: "100%",
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    flipped: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main
    },
    notFlipped: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.main
    },
    matched: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        boxShadow: `0px 0px 10px ${theme.palette.primary.light}`
    }
}));

function Tile({ tile }) {
    const classes = useStyles(Theme);

    const [color, setColor] = useState(Theme.palette.secondary.dark);
    const [value, setValue] = useState(null);

    useEffect(() => {
        if (
            tile &&
            Boolean(Object.keys(tile).length) &&
            tile["color"] &&
            tile["translation"]
        ) {
            setColor(tile["color"]);
            setValue(tile["translation"]);
        }
    }, [tile]);

    return (
        <div
            className={clsx(classes.content, {
                [classes.flipped]: tile["isFlipped"],
                [classes.notFlipped]: !tile["isFlipped"],
                [classes.matched]: tile["isMatched"]
            })}
            style={{
                border: `2px solid ${
                    tile["isFlipped"] || tile["isMatched"]
                        ? color
                        : Theme.palette.primary.main
                }`
            }}
        >
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography variant="subtitle1" align="center">
                        {tile["isFlipped"] || tile["isMatched"] ? value : "?"}
                    </Typography>
                </div>
            </div>
        </div>
    );
}

Tile.displayName = "Tile";
Tile.propTypes = {
    tile: PropTypes.object.isRequired
};
export default Tile;
