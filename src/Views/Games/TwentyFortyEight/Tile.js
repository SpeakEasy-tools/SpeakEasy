import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { Card } from "../../../Components/Card";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    },
    content: {
        width: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    column: {
        flex: "1 1 100%",
        display: "flex",
        flexFlow: "column noWrap",
        justifyContent: "space-around",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    },
    2: {
        backgroundColor: "#4527a0",
        color: "#ffffff"
    },
    4: {
        backgroundColor: "#0d47a1",
        color: "#ffffff"
    },
    8: {
        backgroundColor: "#0091ea",
        color: "#000000"
    },
    16: {
        backgroundColor: "#64dd17",
        color: "#ffffff"
    },
    32: {
        backgroundColor: "#1b5e20",
        color: "#000000"
    },
    64: {
        backgroundColor: "#ffd600",
        color: "#000000"
    },
    128: {
        backgroundColor: "#ff6f00",
        color: "#000000"
    },
    256: {
        backgroundColor: "#dd2c00",
        color: "#000000"
    },
    512: {
        backgroundColor: "#4e342e",
        color: "#ffffff"
    },
    1024: {
        backgroundColor: "#424242",
        color: "#ffffff"
    },
    2048: {
        backgroundColor: "#37474f",
        color: "#ffffff"
    },
    0: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.contrastText
    }
}));

function Tile({ value, label }) {
    const classes = useStyles(Theme);

    const getBody = () => {
        return (
            <div className={clsx(classes.content, classes[value])}>
                <div className={clsx(classes.column)}>
                    <div
                        className={clsx(classes.pad)}
                        style={{
                            width: 200,
                            height: 100,
                            overflow: "hidden",
                            textOverflow: "ellipsis"
                        }}
                    >
                        {label ? (
                            <Typography noWrap align="center" variant="h4">
                                {label}
                            </Typography>
                        ) : (
                            <Typography align="center" variant="h4">
                                &nbsp;
                            </Typography>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.pad)}>
                <Card
                    darkMode={true}
                    stayOpen={true}
                    title={() => ""}
                    body={getBody}
                />
            </div>
        </div>
    );
}

Tile.displayName = "Tile";
Tile.propTypes = {
    value: PropTypes.number,
    label: PropTypes.string
};
export default Tile;
