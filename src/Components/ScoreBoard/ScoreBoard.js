import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        width: "100%",
        backgroundColor: theme.palette.secondary.main,
        borderRadius: 10
    },
    row: {
        display: "flex",
        flex: "row noWrap",
        justifyContent: "space-around"
    },
    pad: {
        padding: theme.spacing(1),
        borderRadius: 10
    }
}));

function ScoreBoard({ score }) {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography
                        variant="h4"
                        style={{ color: Theme.palette.secondary.contrastText }}
                    >
                        Score: {score()}
                    </Typography>
                </div>
            </div>
        </div>
    );
}
ScoreBoard.displayName = "ScoreBoard";
ScoreBoard.propTypes = {
    score: PropTypes.any
};
export default ScoreBoard;
