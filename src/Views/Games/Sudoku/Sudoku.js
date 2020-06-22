import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { ViewWrapper } from "../../../Components/ViewWrapper";
import Board from "./Board";
import Settings from "./Settings";
import Instructions from "./Instructions";

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
    const [language, setLanguage] = useState(null);
    const classes = useStyles(Theme);
    const settings = Settings(language, setLanguage);
    const instructions = Instructions();

    const [board, setBoard] = useState([]);

    const getSettings = () => {
        return settings;
    };
    const getInstructions = () => {
        return instructions;
    };

    useEffect(() => {
        fetch("http://127.0.0.1:5000/sudoku?difficulty=Medium", {
            method: "POST"
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    setBoard(json);
                    return json;
                });
            }
        });
    }, []);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper
                    settings={getSettings}
                    instructions={getInstructions}
                />
            </div>
            <div className={clsx(classes.row)}>
                {board && board.length === 81 && (
                    <Board boardState={board} setBoardState={setBoard} />
                )}
            </div>
        </div>
    );
}

Sudoku.displayName = "Sudoku";
export default Sudoku;
