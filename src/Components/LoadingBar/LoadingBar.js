import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import clsx from "clsx";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

function LoadingBar({ label, progress }) {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography variant="h6" color="primary">
                        Loading {label} ...
                    </Typography>
                </div>
                <div className={clsx(classes.pad)}>
                    {progress ? (
                        <LinearProgress color="secondary" value={progress} />
                    ) : (
                        <LinearProgress color="secondary" />
                    )}
                </div>
            </div>
        </div>
    );
}

LoadingBar.displayName = "LoadingBar";
LoadingBar.propTypes = {
    label: PropTypes.string,
    progress: PropTypes.number
};
export default LoadingBar;
