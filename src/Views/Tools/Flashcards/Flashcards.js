import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { GetCocoCategories } from "../../../Queries";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { translate } from "../../../CloudFunctions/Translate";
import { getUserLanguage } from "../../../UserProfile";
import { LoadingBar } from "../../../Components/LoadingBar";
import Flashcard from "./Flashcard";
import { synthesizeSpeech } from "../../../CloudFunctions";
import { PlayArrow } from "@material-ui/icons";
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
    autocomplete: {
        color: theme.palette.primary.main,
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.main
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.light
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.primary.dark
        }
    },
    label: {
        color: theme.palette.primary.main
    }
}));

function Flashcards() {
    document.title = "Flashcards";
    const classes = useStyles(Theme);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingLabel, setLoadingLabel] = useState("");

    const language = getUserLanguage();

    const categories = GetCocoCategories();
    const [category, setCategory] = useState(null);

    const [options, setOptions] = useState({});

    const [cards, setCards] = useState([]);
    const [samples, setSamples] = useState([]);

    function handleChange(e, v) {
        setCategory(v);
    }
    function getFront(i) {
        return (
            <div className={clsx(classes.root)}>
                <div
                    className={clsx(classes.row)}
                    style={{ backgroundColor: Theme.palette.secondary.light }}
                >
                    <div className={classes.pad}>{cards[i].translation}</div>
                    {samples && Boolean(samples.length) && (
                        <div className={clsx(classes.pad)}>
                            <IconButton
                                onClick={() => {
                                    const audio = new Audio();
                                    audio.src = samples[i].url;
                                    audio.play().then();
                                }}
                            >
                                <PlayArrow
                                    style={{
                                        color: Theme.palette.primary.main
                                    }}
                                />
                            </IconButton>
                        </div>
                    )}
                </div>
            </div>
        );
    }
    function getBack(i) {
        return (
            <div className={clsx(classes.root)}>
                <div
                    className={clsx(classes.row)}
                    style={{ backgroundColor: Theme.palette.secondary.light }}
                >
                    <div className={classes.pad}>{cards[i].transcript}</div>
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (categories && Boolean(categories.length)) {
            let cats = {};
            categories.forEach(c => {
                if (!(c.supercategory in cats)) {
                    cats[c.supercategory] = [];
                }
                cats[c.supercategory] = [...cats[c.supercategory], c.name];
            });
            setOptions(cats);
        }
    }, [categories]);
    useEffect(() => {
        async function getTranslations() {
            setIsLoading(true);
            setLoadingLabel("Translations");
            await Promise.all(
                options[category].map(c => translate(c, language.code))
            )
                .then(setCards)
                .finally(() => {
                    setIsLoading(false);
                });
        }

        if (
            category &&
            options &&
            Boolean(Object.keys(options).length) &&
            language
        ) {
            getTranslations().then();
        }
    }, [category, options, language]);
    useEffect(() => {
        async function getSynthesis() {
            setIsLoading(true);
            setLoadingLabel("Synthesis");
            await Promise.all(
                cards.map(c => synthesizeSpeech(c.translation, language.code))
            )
                .then(urls =>
                    urls.map((u, i) => {
                        return { ...cards[i], url: u };
                    })
                )
                .then(setSamples)
                .finally(() => {
                    setIsLoading(false);
                });
        }

        if (cards && Boolean(cards.length) && language) {
            getSynthesis().then();
        }
    }, [cards, language]);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                {options && Boolean(Object.keys(options).length) && (
                    <div className={clsx(classes.pad)}>
                        <Autocomplete
                            options={Object.keys(options).sort(
                                (a, b) => -b.localeCompare(a)
                            )}
                            classes={{
                                inputRoot: clsx(classes.autocomplete)
                            }}
                            renderInput={params => (
                                <TextField
                                    {...params}
                                    InputLabelProps={{
                                        className: clsx(classes.label)
                                    }}
                                    label="Select a category"
                                    placeholder="e.g. Animals"
                                    variant="outlined"
                                    margin="none"
                                />
                            )}
                            style={{ width: 200 }}
                            onChange={handleChange}
                        />
                    </div>
                )}
            </div>

            {cards && Boolean(cards.length) && (
                <div
                    className={clsx(classes.row)}
                    style={{ flexFlow: "row wrap" }}
                >
                    {cards &&
                        Boolean(cards.length) &&
                        cards.map((c, i) => (
                            <div
                                key={c.transcript}
                                className={clsx(classes.pad)}
                            >
                                <Flashcard
                                    front={() => getFront(i)}
                                    back={() => getBack(i)}
                                />
                            </div>
                        ))}
                </div>
            )}

            {isLoading && (
                <div className={clsx(classes.row)}>
                    <LoadingBar label={loadingLabel} />
                </div>
            )}
        </div>
    );
}

Flashcards.displayName = "Flashcards";
export default Flashcards;
