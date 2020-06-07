import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: 30
    },
    focused: {
        backgroundColor: theme.palette.secondary.light
    }
}));

function Tile({ val, onClick }) {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)} onClick={onClick}>
            <Typography variant="h4">{val}</Typography>
        </div>
    );
}

Tile.displayName = "Tile";
Tile.propTypes = {
    val: PropTypes.any,
    onClick: PropTypes.any
};
export default Tile;
