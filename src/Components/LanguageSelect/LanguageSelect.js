import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import React, { useEffect, useState } from "react";
import { listLanguages } from "../../CloudFunctions/Translate";
import clsx from "clsx";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%"
    },
    content: {
        padding: theme.spacing(1),
        flex: "1 1 100%",
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    row: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    column: {
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

function LanguageSelect({ setLanguage }) {
    const classes = useStyles(Theme);

    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState([]);

    async function getLanguages() {
        setLoading(true);
        return await Promise.resolve(listLanguages())
            .then(l => setLanguages(l))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getLanguages().finally();
    }, []);

    return (
        <>
            {loading ? (
                <div className={clsx(classes.pad)}>
                    <CircularProgress color="secondary" />
                </div>
            ) : (
                languages &&
                Boolean(languages.length) && (
                    <div className={clsx(classes.pad)}>
                        <Autocomplete
                            freeSolo
                            options={languages}
                            getOptionLabel={option => option.name}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="Target language"
                                    placeholder="e.g. Spanish"
                                    variant="outlined"
                                />
                            )}
                            onChange={(e, v) => setLanguage(v)}
                            style={{ width: 150 }}
                        />
                    </div>
                )
            )}
        </>
    );
}

LanguageSelect.displayName = "LanguageSelect";
LanguageSelect.propTypes = {
    setLanguage: PropTypes.func.isRequired
};
export default LanguageSelect;
