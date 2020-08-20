import PropTypes from "prop-types";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import { FlipCameraAndroid } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        backgroundColor: theme.palette.primary.main,
        borderRadius: 10
    },
    row: {
        display: "flex",
        width: "auto",
        height: "auto",
        flexFlow: "row noWrap",
        overflow: "hidden",
        justifyContent: "start",
        alignItems: "center",
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        borderRadius: 10,
        color: theme.palette.secondary.main
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    autocomplete: {
        color: theme.palette.primary.main,
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.dark
        }
    },
    label: {
        color: theme.palette.primary.main
    }
}));

function Flashcard({ front, back }) {
    const classes = useStyles(Theme);

    const [flipped, setFlipped] = useState(false);

    function handleFlip() {
        setFlipped(prevState => !prevState);
    }

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    {flipped ? back() : front()}
                </div>
                <div className={clsx(classes.pad)}>
                    <IconButton onClick={handleFlip}>
                        <FlipCameraAndroid
                            style={{ color: Theme.palette.secondary.main }}
                        />
                    </IconButton>
                </div>
            </div>
        </div>
    );
}

Flashcard.displayName = "Flashcard";
Flashcard.propTypes = {
    front: PropTypes.func.isRequired,
    back: PropTypes.func.isRequired
};
export default Flashcard;
