import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import {
    ArrowBack,
    ArrowDownward,
    ArrowForward,
    ArrowUpward,
    KeyboardArrowLeft,
    KeyboardArrowRight
} from "@material-ui/icons";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { colors } from "./Transcript";

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

function Key() {
    const classes = useStyles(Theme);

    const [open, setOpen] = useState(true);

    function handleOpen() {
        setOpen(prevState => !prevState);
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
                            {open ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
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
                                    Colors and Values
                                </Typography>
                                <Divider />
                            </div>
                        </div>

                        {[
                            [2, 4, 8, 16],
                            [32, 64, 128, 256],
                            [512, 1024, 2048]
                        ].map((n, i) => (
                            <div
                                key={i}
                                className={clsx(classes.row)}
                                style={{
                                    color: Theme.palette.primary.main
                                }}
                            >
                                {n.map(m => (
                                    <div
                                        key={m}
                                        className={clsx(classes.pad)}
                                        style={{
                                            backgroundColor:
                                                colors[m].backgroundColor,
                                            color: colors[m].color,
                                            borderRadius: 10,
                                            margin: Theme.spacing(1)
                                        }}
                                    >
                                        <Typography variant="h6" align="center">
                                            {m}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <Typography
                                    variant="h6"
                                    color="primary"
                                    align="center"
                                >
                                    Controls
                                </Typography>
                                <Divider />
                            </div>
                        </div>
                        <div className={clsx(classes.row)}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <div style={{ padding: Theme.spacing(1) }}>
                                    <ArrowBack color="primary" />
                                </div>
                                <div style={{ padding: Theme.spacing(1) }}>
                                    <Typography
                                        variant="subtitle1"
                                        color="primary"
                                        align="center"
                                    >
                                        The left arrow keyboard key will slide
                                        all tiles all the way to the left
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(classes.row)}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <div style={{ padding: Theme.spacing(1) }}>
                                    <ArrowForward color="primary" />
                                </div>
                                <div style={{ padding: Theme.spacing(1) }}>
                                    <Typography
                                        variant="subtitle1"
                                        color="primary"
                                        align="center"
                                    >
                                        The right arrow keyboard key will slide
                                        all tiles all the way to the right
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(classes.row)}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <div style={{ padding: Theme.spacing(1) }}>
                                    <ArrowUpward color="primary" />
                                </div>
                                <div style={{ padding: Theme.spacing(1) }}>
                                    <Typography
                                        variant="subtitle1"
                                        color="primary"
                                        align="center"
                                    >
                                        The up arrow keyboard key will slide all
                                        tiles all the way upwards
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(classes.row)}>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center"
                                }}
                            >
                                <div style={{ padding: Theme.spacing(1) }}>
                                    <ArrowDownward color="primary" />
                                </div>
                                <div style={{ padding: Theme.spacing(1) }}>
                                    <Typography
                                        variant="subtitle1"
                                        color="primary"
                                        align="center"
                                    >
                                        The down arrow keyboard key will slide
                                        all tiles all the way downwards
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

Key.displayName = "Key";
export default Key;
