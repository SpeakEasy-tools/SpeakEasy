import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import Typography from "@material-ui/core/Typography";
import clsx from "clsx";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%"
    }
}));

function Tile({ value }) {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            {value ? (
                <Typography align="center" variant="h6">
                    {value}
                </Typography>
            ) : (
                <Typography align="center" variant="h6">
                    &nbsp;
                </Typography>
            )}
        </div>
    );
}

Tile.displayName = "Tile";
Tile.propTypes = {
    value: PropTypes.number
};
export default Tile;
