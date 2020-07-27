import PropTypes from "prop-types";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Translate } from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        width: "100%",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 10
    },
    column: {
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap",
        flex: "1 1 auto",
        padding: theme.spacing(1)
    },
    row: {
        width: "100%",
        display: "flex",
        flex: "1 1 auto"
    },
    pad: {
        width: "20%",
        padding: theme.spacing(1),
        flex: "1 1 auto"
    }
}));

function Key({ pairs }) {
    const classes = useStyles(Theme);

    const [open, setOpen] = useState(true);
    const [flipped, setFlipped] = useState({});

    function handleOpen() {
        setOpen(prevState => !prevState);
    }

    function handleFlip(key) {
        setFlipped(prevState => {
            let newState = { ...prevState };
            newState[key] = !newState[key];
            return { ...newState };
        });
    }

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <div
                    className={clsx(classes.row)}
                    style={{
                        backgroundColor: Theme.palette.secondary.dark,
                        borderRadius: 10
                    }}
                >
                    <div
                        style={{
                            padding: Theme.spacing(1)
                        }}
                    >
                        <IconButton
                            style={{
                                color: Theme.palette.primary.main
                            }}
                            onClick={handleOpen}
                        >
                            <FontAwesomeIcon
                                icon={open ? faCaretLeft : faCaretRight}
                                size="lg"
                            />
                        </IconButton>
                    </div>
                    <div
                        style={{
                            margin: Theme.spacing(1),
                            padding: Theme.spacing(2)
                        }}
                    >
                        <Typography variant="h6" color="primary" align="center">
                            Key
                        </Typography>
                    </div>
                </div>

                {open && (
                    <>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <Typography
                                    variant="h6"
                                    color="primary"
                                    align="center"
                                >
                                    Instructions
                                </Typography>
                                <Divider />
                            </div>
                        </div>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <Typography
                                    variant="subtitle1"
                                    color="primary"
                                    align="center"
                                >
                                    Flip over the cards and try to find the
                                    matches. You can only flip two cards at once
                                </Typography>
                                <Divider />
                            </div>
                        </div>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <Typography
                                    variant="h6"
                                    color="primary"
                                    align="center"
                                >
                                    Tiles
                                </Typography>
                                <Divider />
                            </div>
                        </div>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.column)}>
                                <List>
                                    {pairs &&
                                        pairs
                                            .slice(
                                                0,
                                                Math.floor(pairs.length / 2)
                                            )
                                            .map((p, i) => (
                                                <ListItem
                                                    key={i}
                                                    style={{
                                                        borderBottom: `1px solid ${Theme.palette.secondary.main}`
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            flipped[i]
                                                                ? p[
                                                                      "transcript"
                                                                  ]
                                                                : p[
                                                                      "translation"
                                                                  ]
                                                        }
                                                    />
                                                    <ListItemIcon>
                                                        <IconButton
                                                            className={clsx(
                                                                classes.icon,
                                                                {
                                                                    [classes.transcript]:
                                                                        flipped[
                                                                            i
                                                                        ],
                                                                    [classes.translation]: !flipped[
                                                                        i
                                                                    ]
                                                                }
                                                            )}
                                                            onClick={() =>
                                                                handleFlip(i)
                                                            }
                                                        >
                                                            <Translate
                                                                style={{
                                                                    color:
                                                                        Theme
                                                                            .palette
                                                                            .primary
                                                                            .main
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </ListItemIcon>
                                                </ListItem>
                                            ))}
                                </List>
                            </div>
                            <div className={clsx(classes.column)}>
                                <ul>
                                    {pairs &&
                                        pairs
                                            .slice(Math.floor(pairs.length / 2))
                                            .map((p, i) => (
                                                <ListItem
                                                    key={i}
                                                    style={{
                                                        borderBottom: `1px solid ${Theme.palette.secondary.main}`
                                                    }}
                                                >
                                                    <ListItemText
                                                        primary={
                                                            flipped[i]
                                                                ? p[
                                                                      "transcript"
                                                                  ]
                                                                : p[
                                                                      "translation"
                                                                  ]
                                                        }
                                                    />
                                                    <ListItemIcon>
                                                        <IconButton
                                                            className={clsx(
                                                                classes.icon,
                                                                {
                                                                    [classes.transcript]:
                                                                        flipped[
                                                                            i
                                                                        ],
                                                                    [classes.translation]: !flipped[
                                                                        i
                                                                    ]
                                                                }
                                                            )}
                                                            onClick={() =>
                                                                handleFlip(i)
                                                            }
                                                        >
                                                            <Translate
                                                                style={{
                                                                    color:
                                                                        Theme
                                                                            .palette
                                                                            .primary
                                                                            .main
                                                                }}
                                                            />
                                                        </IconButton>
                                                    </ListItemIcon>
                                                </ListItem>
                                            ))}
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

Key.displayName = "Key";
Key.propTypes = {
    pairs: PropTypes.array.isRequired
};
export default Key;
