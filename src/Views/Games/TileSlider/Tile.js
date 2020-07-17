import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    },
    content: {
        width: "100%",
        display: "flex",
        flexFlow: "column noWrap",
        minHeight: "60px"
    },
    column: {
        flex: "1 1 100%",
        display: "flex",
        flexFlow: "column noWrap",
        justifyContent: "space-around",
        alignItems: "center"
    },
    pad: {
        backgroundColor: theme.palette.secondary.light,
        border: `1px solid ${theme.palette.secondary.contrastText}`
    }
}));

function Tile({ value }) {
    const classes = useStyles(Theme);

    const getText = tile => {
        return tile;
    };

    const getBody = () => {
        return (
            <div className={clsx(classes.content)}>
                <div className={clsx(classes.column)}>
                    <div>
                        <Typography variant="h4">{getText(value)}</Typography>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={clsx(classes.root)}>
            {value ? (
                <div className={clsx(classes.pad)}>{getBody()}</div>
            ) : (
                <> </>
            )}
        </div>
    );
}

Tile.displayName = "Tile";
Tile.propTypes = {
    value: PropTypes.any
};
export default Tile;
