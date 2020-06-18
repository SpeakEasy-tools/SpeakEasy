import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { GetConfigsByName } from "../../../Queries";
import ParseConfig from "./ParseConfig";

const modes = [{ mode: "Explore" }, { mode: "Quiz" }];

const useStyles = makeStyles(theme => ({
    root: {},
    column: {},
    pad: {
        padding: theme.spacing(1)
    }
}));

function Settings({ mode, setMode, config, setConfig, setParsedConfigs }) {
    const classes = useStyles(Theme);

    const [configs] = GetConfigsByName("eye-spy");
    const parsedConfigs = ParseConfig(configs);

    useEffect(() => {
        setParsedConfigs(parsedConfigs);
    }, [parsedConfigs, setParsedConfigs]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id="config-select"
                        autoHighlight
                        options={parsedConfigs || []}
                        value={config}
                        getOptionLabel={option => option.name}
                        style={{ width: 300 }}
                        onChange={(e, v) => setConfig(v)}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Select Config"
                                variant="outlined"
                                margin="none"
                            />
                        )}
                    />
                </div>
                <div className={clsx(classes.pad)}>
                    <Autocomplete
                        id="mode-select"
                        autoHighlight
                        options={modes}
                        value={mode}
                        getOptionLabel={option => option.mode}
                        style={{ width: 300 }}
                        onChange={(e, v) => setMode(v)}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Select Mode"
                                variant="outlined"
                                margin="none"
                            />
                        )}
                    />
                </div>
            </div>
        </div>
    );
}

Settings.displayName = "Settings";
Settings.propTypes = {
    language: PropTypes.any,
    setLanguage: PropTypes.any,
    mode: PropTypes.any,
    setMode: PropTypes.any,
    config: PropTypes.any,
    setConfig: PropTypes.any,
    setParsedConfigs: PropTypes.any
};
export default Settings;
