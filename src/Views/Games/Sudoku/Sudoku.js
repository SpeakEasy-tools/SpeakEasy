import React, { useEffect, useState } from "react";
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
    const [isAdaptive, setIsAdaptive] = useState(false);
    const [board, setBoard] = useState([]);

    const getInstructions = () => {
        console.log(language, isAdaptive);
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
            <div className={clsx(classes.column)}>
                <ControlBar
                    updateLanguage={setLanguage}
                    updateIsAdaptive={setIsAdaptive}
                    instructions={getInstructions}
                />
            </div>
            <div className={clsx(classes.column)}>
                <div className={clsx(classes.pad)}>
                    {board && board.length === 81 && (
                        <Board boardState={board} setBoardState={setBoard} />
                    )}
                </div>
            </div>
        </div>
    );
}

Sudoku.displayName = "Sudoku";
export default Sudoku;
