import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import IconButton from "@material-ui/core/IconButton";
import { Help, Settings } from "@material-ui/icons";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ListLanguages } from "../../CloudFunctions";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
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
        backgroundColor: theme.palette.primary.main
    }
}));

function ControlBar({
    settings,
    instructions,
    updateLanguage,
    updateIsAdaptive
}) {
    const classes = useStyles(Theme);

    const [loading, setLoading] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);
    const [instructionsOpen, setInstructionsOpen] = useState(false);

    const [languages, setLanguages] = useState([]);
    const [language, setLanguage] = useState("");

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
    async function getLanguages() {
        setLoading(true);
        return Promise.resolve(ListLanguages())
            .then(ls => setLanguages(ls))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getLanguages().finally();
    }, []);

    useEffect(() => {
        if (language && updateLanguage) {
            updateLanguage(language);
        }
    }, [language, updateLanguage]);
    useEffect(() => {
        if (updateIsAdaptive) {
            updateIsAdaptive(isAdaptive);
        }
    }, [isAdaptive, updateIsAdaptive]);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)} style={{ maxWidth: 225 }}>
                {updateLanguage && (
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
                            {loading ? (
                                <CircularProgress color="secondary" />
                            ) : (
                                <Autocomplete
                                    renderInput={params => (
                                        <TextField
                                            {...params}
                                            placeholder="Language"
                                        />
                                    )}
                                    options={languages}
                                    getOptionLabel={option => option.name}
                                    style={{
                                        width: 150
                                    }}
                                    color="primary"
                                    onChange={(e, v) => setLanguage(v)}
                                />
                            )}
                        </div>
                    </div>
                )}
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
    updateLanguage: PropTypes.func,
    updateIsAdaptive: PropTypes.func
};
export default ControlBar;