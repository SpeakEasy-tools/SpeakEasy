import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Board from "./Board";
import Instructions from "./Instructions";
import { ControlBar } from "../../../Components";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexFlow: "row wrap"
    },
    row: {
        flex: "1 1 100%"
    },
    column: {},
    content: {},
    pad: {
        margin: theme.spacing(1),
        flex: "1 1 100px"
    }
}));

function Sudoku() {
    document.title = "Sudoku";
    const classes = useStyles(Theme);
    const instructions = Instructions();

    const [language, setLanguage] = useState(null);

    const getInstructions = () => {
        console.log(language);
        return instructions;
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <ControlBar
                    updateLanguage={setLanguage}
                    instructions={getInstructions}
                />
            </div>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad)}>
                    {language && language.name && (
                        <Board languageCode={language.code} />
                    )}
                </div>
            </div>
        </div>
    );
}

Sudoku.displayName = "Sudoku";
export default Sudoku;
