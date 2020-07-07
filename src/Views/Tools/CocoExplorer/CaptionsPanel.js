import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import { Translate } from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";

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

function CaptionsPanel({ captions }) {
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
        if (captions && Boolean(Object.keys(captions).length)) {
            let cs = {};
            Object.keys(captions).forEach(k => (cs[k] = false));
            setFlipped({ ...cs });
        }
    }, [captions]);
    return (
        <div className={clsx(classes.root)}>
            {captions && Boolean(Object.keys(captions).length) && (
                <List>
                    <ListSubheader
                        style={{
                            backgroundColor: Theme.palette.secondary.main,
                            color: Theme.palette.primary.main
                        }}
                    >
                        Captions
                    </ListSubheader>
                    {Object.entries(captions).map(([k, v]) => {
                        return (
                            <ListItem
                                key={k}
                                style={{
                                    borderBottom: `1px solid ${Theme.palette.secondary.main}`
                                }}
                            >
                                <ListItemText
                                    primary={
                                        flipped[k]
                                            ? v["text"]
                                            : v["translation"]
                                    }
                                />
                                <ListItemIcon>
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
                                </ListItemIcon>
                            </ListItem>
                        );
                    })}
                </List>
            )}
        </div>
    );
}

CaptionsPanel.displayName = "CaptionsPanel";
CaptionsPanel.propTypes = {
    captions: PropTypes.object.isRequired
};
export default CaptionsPanel;
