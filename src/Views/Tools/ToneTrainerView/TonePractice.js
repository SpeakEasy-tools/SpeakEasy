import PropTypes from "prop-types";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { PlayArrow } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    },
    row: {
        flex: "1 1 100%",
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
    },
    pad: {
        margin: theme.spacing(1)
    }
}));

function TonePractice({ attempts }) {
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <List style={{ backgroundColor: Theme.palette.primary.dark }}>
                <ListItem>
                    <ListItemText primary="Your practice attempts" />
                </ListItem>
                {attempts &&
                    attempts.map((a, i) => (
                        <ListItem key={i}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={false}
                                    tabIndex={-1}
                                    disableRipple
                                />
                            </ListItemIcon>
                            <ListItemText primary={`Attempt #${1}`} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="play-audio">
                                    <PlayArrow />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
            </List>
        </div>
    );
}

TonePractice.displayName = "TonePractice";
TonePractice.propTypes = {
    attempts: PropTypes.array.isRequired
};
export default TonePractice;
