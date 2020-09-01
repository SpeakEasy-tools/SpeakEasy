import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import IconButton from "@material-ui/core/IconButton";
import { Help, Settings } from "@material-ui/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        flexFlow: "row noWrap"
    },
    content: {
        padding: theme.spacing(1),
        flex: "1 1 100%",
        height: "100%"
    },
    column: {
        flex: "1 1 auto",
        display: "flex",
        flexFlow: "column noWrap"
    },
    row: {
        width: "100%",
        display: "flex"
    },
    pad: {
        padding: theme.spacing(1)
    },
    open: {
        maxWidth: 500,
        height: "100%",
        backgroundColor: theme.palette.primary.main,
        borderRadius: 10,
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
}));

function ControlBar({ settings, instructions, updateIsAdaptive }) {
    const classes = useStyles(Theme);

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [instructionsOpen, setInstructionsOpen] = useState(false);

    const [isAdaptive, setIsAdaptive] = useState(false);

    function handleSettingsClick() {
        setInstructionsOpen(false);
        setSettingsOpen(prevState => !prevState);
    }

    function handleInstructionsClick() {
        setSettingsOpen(false);
        setInstructionsOpen(prevState => !prevState);
    }

    function handleAdaptiveChange() {
        setIsAdaptive(prevState => !prevState);
    }

    useEffect(() => {
        if (updateIsAdaptive) {
            updateIsAdaptive(isAdaptive);
        }
    }, [isAdaptive, updateIsAdaptive]);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)} style={{ maxWidth: 225 }}>
                {updateIsAdaptive && (
                    <div className={clsx(classes.row)}>
                        <div
                            className={clsx(classes.pad)}
                            style={{
                                marginTop: Theme.spacing(1),
                                padding: Theme.spacing(2),
                                backgroundColor: Theme.palette.primary.dark,
                                borderTopRightRadius: "100%",
                                borderBottomRightRadius: "100%"
                            }}
                        >
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isAdaptive}
                                        onChange={handleAdaptiveChange}
                                    />
                                }
                                style={{ color: Theme.palette.secondary.main }}
                                label="Adaptive"
                            />
                        </div>
                    </div>
                )}
                {settings && (
                    <div className={clsx(classes.row)}>
                        <div
                            className={clsx(classes.pad)}
                            style={{
                                marginTop: Theme.spacing(1),
                                padding: Theme.spacing(2),
                                backgroundColor: Theme.palette.primary.dark,
                                borderTopRightRadius: "100%",
                                borderBottomRightRadius: "100%"
                            }}
                        >
                            <IconButton onClick={handleSettingsClick}>
                                <Settings />
                            </IconButton>
                        </div>
                    </div>
                )}
                {instructions && (
                    <div className={clsx(classes.row)}>
                        <div
                            className={clsx(classes.pad)}
                            style={{
                                marginTop: Theme.spacing(1),
                                padding: Theme.spacing(2),
                                backgroundColor: Theme.palette.primary.dark,
                                borderTopRightRadius: "100%",
                                borderBottomRightRadius: "100%"
                            }}
                        >
                            <IconButton onClick={handleInstructionsClick}>
                                <Help />
                            </IconButton>
                        </div>
                    </div>
                )}
            </div>
            <div
                className={clsx(classes.column, {
                    [classes.open]: settingsOpen || instructionsOpen
                })}
            >
                {settingsOpen && settings && (
                    <>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <Typography variant="h4" color="secondary">
                                    Settings
                                </Typography>
                                <Divider color="secondary" />
                            </div>
                        </div>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                {settings()}
                            </div>
                        </div>
                    </>
                )}
                {instructionsOpen && instructions && (
                    <>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <Typography variant="h4" color="secondary">
                                    Instructions
                                </Typography>
                                <Divider color="secondary" />
                            </div>
                        </div>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                {instructions()}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

ControlBar.displayName = "ControlBar";
ControlBar.propTypes = {
    settings: PropTypes.func,
    instructions: PropTypes.func,
    updateIsAdaptive: PropTypes.func
};
export default ControlBar;
