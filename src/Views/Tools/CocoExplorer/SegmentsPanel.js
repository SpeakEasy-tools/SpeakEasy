import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListItemSecondaryAction,
    ListSubheader
} from "@material-ui/core";
import { Translate } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        maxWidth: 400,
        maxHeight: 500,
        position: "relative",
        overflow: "auto",
        background: theme.palette.primary.dark,
        color: theme.palette.secondary.main,
        border: `5px solid ${theme.palette.secondary.main}`,
        borderRadius: "10px",
        margin: theme.spacing(1)
    },
    row: {
        flex: "1 1 auto",
        width: "98%",
        display: "flex",
        flexFlow: "row noWrap",
        alignItems: "center",
        justifyContent: "center",
        margin: theme.spacing(1)
    },
    icon: {
        "&:hover": {
            backgroundColor: theme.palette.secondary.main
        }
    },
    transcript: {
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.main
    },
    translation: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.main
    },
    pad: {
        padding: theme.spacing(1),
        border: `5px solid ${theme.palette.secondary.main}`,
        borderRadius: "10px"
    }
}));

function SegmentsPanel({ segments, found }) {
    const classes = useStyles(Theme);

    const [flipped, setFlipped] = useState({});

    function handleFlip(key) {
        setFlipped(prevState => {
            let newState = { ...prevState };
            newState[key] = !newState[key];
            return { ...newState };
        });
    }

    useEffect(() => {
        if (segments && Boolean(Object.keys(segments).length)) {
            let ss = {};
            Object.keys(segments).forEach(s => (ss[s] = false));
            setFlipped({ ...ss });
        }
    }, [segments]);

    return (
        <div className={clsx(classes.root)}>
            {segments && Boolean(Object.keys(segments).length) && (
                <List>
                    <ListSubheader
                        style={{
                            backgroundColor: Theme.palette.secondary.main,
                            color: Theme.palette.primary.main
                        }}
                    >
                        Objects
                    </ListSubheader>
                    {Object.entries(segments).map(([k, v]) => {
                        if (v["segments"].length > 1) {
                            return "";
                        }
                        return (
                            <ListItem
                                key={k}
                                style={{
                                    borderBottom: `1px solid ${Theme.palette.secondary.main}`
                                }}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        style={{
                                            color: Theme.palette.primary.main
                                        }}
                                        checked={k in found}
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        flipped[k]
                                            ? v["text"]
                                            : v["translation"]
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        className={clsx(classes.icon, {
                                            [classes.transcript]: flipped[k],
                                            [classes.translation]: !flipped[k]
                                        })}
                                        onClick={() => handleFlip(k)}
                                    >
                                        <Translate
                                            style={{
                                                color:
                                                    Theme.palette.primary.main
                                            }}
                                        />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </div>
    );
}

SegmentsPanel.displayName = "SegmentsPanel";
SegmentsPanel.propTypes = {
    segments: PropTypes.object.isRequired,
    found: PropTypes.object.isRequired
};
export default SegmentsPanel;
