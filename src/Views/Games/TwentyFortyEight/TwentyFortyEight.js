import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Board from "./Board";
import { ControlBar } from "../../../Components";
import Instructions from "./Instructions";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        height: "100%",
        display: "flex"
    },
    column: {
        display: "flex",
        flexFlow: "column noWrap",
        flex: "1 1 auto"
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

    const [isAdaptive, setIsAdaptive] = useState(false);
    const [language, setLanguage] = useState();

    const [score, setScore] = useState();
    const instructions = Instructions();
    function getInstructions() {
        console.log(score);
        return instructions;
    }

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <ControlBar
                    updateLanguage={setLanguage}
                    updateIsAdaptive={setIsAdaptive}
                    instructions={getInstructions}
                />
            </div>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.row)}>
                    {language && language.name && (
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
                </div>
            </div>
        </div>
    );
}

TwentyFortyEight.displayName = "TwentyFortyEight";
export default TwentyFortyEight;
