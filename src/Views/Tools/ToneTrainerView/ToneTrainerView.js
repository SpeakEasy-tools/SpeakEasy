import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { LoadingBar } from "../../../Components";
import ToneTrainerComponent from "./ToneTrainerComponent";
import { getUserLanguage } from "../../../UserProfile";
import CategorySelect from "../CocoExplorer/CategorySelect";
import { translate } from "../../../CloudFunctions/Translate";
import { synthesizeSpeech } from "../../../CloudFunctions";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.light
    },
    column: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.dark
    },
    row: {
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        overflow: "hidden",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.dark,
        justifyContent: "start",
        alignItems: "center"
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    }
}));

function ToneTrainerView() {
    document.title = "Tone Trainer";
    const classes = useStyles(Theme);

    const [isLoading, setIsLoading] = useState(false);
    const [loadingLabel, setLoadingLabel] = useState("Tone Trainer");

    const language = getUserLanguage();

    const [category, setCategory] = useState(null);

    const [words, setWords] = useState({});

    const [word, setWord] = useState(null);

    useEffect(() => {
        if (
            category &&
            words &&
            !(category in words) &&
            language &&
            Boolean(Object.keys(language).length)
        ) {
            setWord(null);
            setIsLoading(true);
            setLoadingLabel("Translation and Synthesis");
            Promise.resolve(
                translate(category, language.code).then(results =>
                    synthesizeSpeech(
                        results["translation"],
                        language.code
                    ).then(url =>
                        setWords(prevState => {
                            return {
                                ...prevState,
                                [category]: {
                                    ...results,
                                    url: url,
                                    language: language
                                }
                            };
                        })
                    )
                )
            ).then(() => setIsLoading(false));
        }
    }, [category, language, words]);
    useEffect(() => {
        if (words && Boolean(Object.keys(words).length) && category in words) {
            setWord(words[category]);
        }
    }, [words, category]);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div>
                    <CategorySelect selectedCategory={setCategory} />
                </div>
            </div>

            <div
                className={clsx(classes.column)}
                style={{
                    margin: Theme.spacing(1),
                    padding: Theme.spacing(1)
                }}
            >
                <div style={{ flex: 1 }}>
                    {word && Boolean(Object.keys(word).length) && (
                        <ToneTrainerComponent sample={word} />
                    )}
                </div>
            </div>

            {isLoading && (
                <div className={clsx(classes.row)}>
                    <div
                        className={clsx(classes.pad)}
                        style={{ flex: "1 1 100%" }}
                    >
                        <LoadingBar label={loadingLabel} />{" "}
                    </div>
                </div>
            )}
        </div>
    );
}

ToneTrainerView.displayName = "ToneTrainerView";
export default ToneTrainerView;
