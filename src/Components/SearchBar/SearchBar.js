import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import { Translate } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { listLanguages } from "../../CloudFunctions/Translate";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextToSpeech } from "../../CloudFunctions";
import Button from "@material-ui/core/Button";

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

function SearchBar({ results }) {
    const classes = useStyles(Theme);

    const [loading, setLoading] = useState(false);
    const [languages, setLanguages] = useState([]);
    const [language, setLanguage] = useState({});
    const [text, setText] = useState("");
    const [sample, setSample] = useState({});
    async function handleSearch() {
        setLoading(true);
        return await Promise.resolve(TextToSpeech(text, language))
            .then(s => setSample(s))
            .finally(() => setLoading(false));
    }

    async function getLanguages() {
        setLoading(true);
        return await Promise.resolve(listLanguages())
            .then(l => setLanguages(l))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getLanguages().finally();
    }, []);
    useEffect(() => {
        if (sample) {
            results({ ...sample });
        }
    }, [sample, results]);

    return (
        <div className={clsx(classes.root)}>
            {loading && (
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <CircularProgress color="secondary" />
                    </div>
                </div>
            )}
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <TextField
                        label="Translate text"
                        placeholder="Hello, World!"
                        onChange={e => setText(e.target.value)}
                        style={{ width: 200 }}
                    />
                </div>
                {languages && Boolean(languages.length) && (
                    <div className={clsx(classes.pad)}>
                        <Autocomplete
                            freeSolo
                            options={languages}
                            getOptionLabel={option => option.name}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    label="to..."
                                    placeholder="Spanish"
                                    variant="outlined"
                                />
                            )}
                            onChange={(e, v) => setLanguage(v)}
                            style={{ width: 150 }}
                        />
                    </div>
                )}
                <div className={clsx(classes.pad)}>
                    <Button onClick={handleSearch}>
                        <Typography color="secondary">Translate</Typography>
                        <Translate
                            style={{ color: Theme.palette.secondary.main }}
                        />
                    </Button>
                </div>
            </div>
        </div>
    );
}

SearchBar.displayName = "SearchBar";
SearchBar.propTypes = {
    results: PropTypes.func.isRequired
};
export default SearchBar;
