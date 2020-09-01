import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { LoadingBar } from "../../../Components";
import TextField from "@material-ui/core/TextField";
import { PlayArrow, Search } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import {
    detectLanguage,
    listLanguages,
    translate
} from "../../../CloudFunctions/Translate";
import Typography from "@material-ui/core/Typography";
import { synthesizeSpeech } from "../../../CloudFunctions";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 10
    },
    column: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "auto",
        borderRadius: 10
    },
    row: {
        display: "flex",
        width: "auto",
        height: "auto",
        flexFlow: "row noWrap",
        overflow: "hidden",
        justifyContent: "start",
        alignItems: "center",
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.dark,
        color: theme.palette.primary.main
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    icon: { color: theme.palette.primary.main }
}));

function Dictionary() {
    document.title = "Dictionary";
    const classes = useStyles(Theme);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingLabel, setLoadingLabel] = useState("");

    const [searchTerm, setSearchTerm] = useState(null);

    const [languages, setLanguages] = useState(null);
    const [language, setLanguage] = useState(null);

    const [results, setResults] = useState({});
    const [samples, setSamples] = useState({});

    function handleChange(e) {
        setSearchTerm(e.currentTarget.value);
    }

    function handleSearch() {
        async function languageDetect(query) {
            setIsLoading(true);
            setLoadingLabel("Detect language");
            return await Promise.resolve(
                detectLanguage(query)
                    .then(result => setLanguage(languages[result["language"]]))
                    .then(() => {
                        setIsLoading(false);
                    })
            );
        }

        async function getTranslations(query) {
            setIsLoading(true);
            setLoadingLabel("Translations");
            return await Promise.all(
                Object.keys(languages).map(l =>
                    translate(query, l).then(res => {
                        return { ...res, language: l };
                    })
                )
            )
                .then(r => setResults(r))
                .finally(() => setIsLoading(false));
        }

        languageDetect(searchTerm).then(() => getTranslations(searchTerm));
    }

    function handlePlay(url) {
        console.log(url);
        const audio = new Audio();
        audio.src = url;
        audio.play().then();
    }

    useEffect(() => {
        Promise.resolve(
            listLanguages().then(result => {
                let langs = {};
                result.forEach(r => (langs[r.code] = r.name));
                setLanguages(langs);
            })
        ).then();
    }, []);
    useEffect(() => {
        async function getSynthesis() {
            setIsLoading(true);
            setLoadingLabel("Synthesis");
            let synths = {};
            await Promise.all(
                results.map(r =>
                    synthesizeSpeech(r.translation, r.language)
                        .then(url => (synths[r.language] = url))
                        .catch(() => "404")
                )
            )
                .then(() => {
                    console.log(synths);
                    setSamples(synths);
                })
                .finally(() => setIsLoading(false))
                .catch(() => "404");
        }

        if (results && Boolean(results.length)) {
            getSynthesis().then();
        }
    }, [results]);
    return (
        <div className={clsx(classes.root)}>
            <div
                className={clsx(classes.row)}
                style={{
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <div
                    className={clsx(classes.pad)}
                    style={{
                        flex: 1,
                        backgroundColor: Theme.palette.primary.main,
                        borderRadius: 10
                    }}
                >
                    <TextField
                        placeholder="Word to look"
                        label="Dictionary Search"
                        onChange={handleChange}
                        style={{ flex: 1, width: "100%" }}
                    />
                </div>
                <div className={clsx(classes.pad)}>
                    <Button disabled={!searchTerm} onClick={handleSearch}>
                        <Search />
                        Search
                    </Button>
                </div>
            </div>

            {language && (
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <Typography>Language detected: {language}</Typography>
                    </div>
                </div>
            )}
            <div
                style={{
                    flex: "1 1 100%",
                    display: "flex",
                    flexFlow: "column noWrap",
                    overflow: "auto"
                }}
            >
                {results &&
                    Boolean(Object.keys(results).length) &&
                    Object.keys(results).map(r => (
                        <div
                            key={results[r].language}
                            className={clsx(classes.row)}
                        >
                            <div className={clsx(classes.pad)}>
                                <Typography
                                    variant="subtitle1"
                                    color="primary"
                                    align="center"
                                >
                                    {`${languages[results[r].language]} - ${
                                        results[r].translation
                                    }`}
                                </Typography>
                            </div>

                            {samples &&
                                Boolean(Object.keys(samples).length) &&
                                results[r].language in samples &&
                                Boolean(samples[results[r].language]) && (
                                    <IconButton
                                        onClick={() =>
                                            handlePlay(
                                                samples[results[r].language]
                                            )
                                        }
                                    >
                                        <PlayArrow
                                            style={{
                                                color:
                                                    Theme.palette.primary.main
                                            }}
                                        />
                                    </IconButton>
                                )}
                        </div>
                    ))}
            </div>
            {isLoading && (
                <div className={clsx(classes.row)}>
                    <LoadingBar label={loadingLabel} />
                </div>
            )}
        </div>
    );
}

Dictionary.displayName = "Dictionary";
export default Dictionary;
