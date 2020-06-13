import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Button from "@material-ui/core/Button";
import { PlayArrow } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import TonePractice from "./TonePractice";
import ToneGraph from "./ToneGraph";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    },
    column: {
        flex: "1 1 auto",
        display: "flex",
        flexFlow: "column noWrap"
    },
    row: {
        flex: "1 1 100%",
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
    },
    pad: {
        flex: "1 1 auto",
        padding: theme.spacing(1)
    }
}));

function ToneTrainerComponent({ sample }) {
    const classes = useStyles(Theme);

    const [text, setText] = useState("");
    const [language, setLanguage] = useState({});
    const [translation, setTranslation] = useState("");
    const [audioUrl, setAudioUrl] = useState("");

    const [example, setExample] = useState("");
    const [attempts, setAttempts] = useState([]);
    const [attempt, setAttempt] = useState("");

    useEffect(() => {
        if (sample && sample.audioUrl && !sample.audioUrl.includes("404")) {
            setText(sample["text"]);
            setLanguage({ ...sample["language"] });
            setTranslation(sample["translation"]);
            setAudioUrl(sample["audioUrl"]);
            setExample(sample["audioUrl"]);
        }
    }, [sample]);
    return (
        <>
            <div className={clsx(classes.row)}>
                {text && (
                    <div className={clsx(classes.pad)}>
                        <TextField value={text} label="Text input" />
                    </div>
                )}
                {language && language.name && (
                    <div className={clsx(classes.pad)}>
                        <TextField value={language.name} label="Language" />
                    </div>
                )}
                {translation && (
                    <div className={clsx(classes.pad)}>
                        <TextField value={translation} label="Translation" />
                    </div>
                )}
                {audioUrl && (
                    <div className={clsx(classes.pad)}>
                        <Button
                            onClick={() => {
                                const audio = new Audio();
                                audio.src = audioUrl;
                                return audio.play();
                            }}
                        >
                            <PlayArrow />
                        </Button>
                    </div>
                )}
            </div>
            {example && !example.includes("404") && Boolean(example.length) && (
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <TonePractice
                                attempts={attempts}
                                setAttempt={setAttempt}
                                setAttempts={setAttempts}
                            />
                        </div>
                    </div>
                    <div className={clsx(classes.column)}>
                        <div
                            className={clsx(classes.pad)}
                            style={{ width: 700 }}
                        >
                            <ToneGraph example={example} attempt={attempt} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

ToneTrainerComponent.displayName = "ToneTrainerComponent";
ToneTrainerComponent.propTypes = {
    sample: PropTypes.object.isRequired
};
export default ToneTrainerComponent;
