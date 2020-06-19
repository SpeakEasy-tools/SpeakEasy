import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../utils";
import { Translate } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { TextToSpeech } from "../../CloudFunctions";
import Button from "@material-ui/core/Button";
import { LanguageSelect } from "../LanguageSelect";

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
    const [language, setLanguage] = useState({});
    const [text, setText] = useState("");
    const [sample, setSample] = useState({});

    async function handleSearch() {
        setLoading(true);
        return await Promise.resolve(TextToSpeech(text, language))
            .then(s => setSample(s))
            .finally(() => setLoading(false));
    }

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
                        multiline
                        label="Text to translate"
                        placeholder="e.g. Hello, World!"
                        onChange={e => setText(e.target.value)}
                        style={{ width: 200 }}
                    />
                </div>
                <LanguageSelect setLanguage={setLanguage} />
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
