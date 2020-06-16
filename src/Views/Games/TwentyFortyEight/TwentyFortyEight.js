import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { ViewWrapper } from "../../../Components/ViewWrapper";
import Autocomplete from "@material-ui/lab/Autocomplete";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { listLanguages } from "../../../CloudFunctions/Translate";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { PlayArrow } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Board from "./Board";

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
        display: "flex"
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

function TwentyFortyEight() {
    document.title = "2048";
    const classes = useStyles(Theme);

    const [loading, setLoading] = useState(false);
    const [isAdaptive, setIsAdaptive] = useState(false);
    const [startGame, setStartGame] = useState(false);

    const [languages, setLanguages] = useState();
    const [language, setLanguage] = useState();

    const [score, setScore] = useState();

    function handleAdaptiveChange() {
        setIsAdaptive(prevState => !prevState);
    }
    function handleStart() {
        setStartGame(true);
    }
    async function getLanguages() {
        setLoading(true);
        return Promise.resolve(listLanguages())
            .then(ls => setLanguages(ls))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        getLanguages().finally();
    }, []);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper score={() => score} />
            </div>
            <div className={clsx(classes.content)}>
                <div className={clsx(classes.row)}>
                    {loading && (
                        <div className={clsx(classes.pad)}>
                            <CircularProgress color="secondary" />
                        </div>
                    )}
                    {languages && Boolean(languages.length) && (
                        <div className={clsx(classes.pad)}>
                            <Autocomplete
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Language Select"
                                        placeholder="e.g. Spanish"
                                    />
                                )}
                                options={languages}
                                getOptionLabel={option => option.name}
                                style={{ width: 300 }}
                                onChange={(e, v) => setLanguage(v)}
                            />
                        </div>
                    )}
                    <div className={clsx(classes.pad)}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isAdaptive}
                                    onChange={handleAdaptiveChange}
                                />
                            }
                            label="Adaptive"
                        />
                    </div>
                    <div className={clsx(classes.pad)}>
                        <Button onClick={handleStart}>
                            <PlayArrow /> Start
                        </Button>
                    </div>
                </div>
                {language && language.name && (
                    <>
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <Divider />
                                <Typography variant="h4" color="secondary">
                                    2048 - {language.name}
                                    {isAdaptive && " - Adaptive mode"}
                                </Typography>
                            </div>
                        </div>
                        {startGame && (
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Board
                                        languageCode={language.code}
                                        adaptive={isAdaptive}
                                        updateScore={setScore}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

TwentyFortyEight.displayName = "TwentyFortyEight";
export default TwentyFortyEight;
