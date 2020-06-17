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

    function getBoard() {
        // This will be replaced with a server call to fetch a board
        return [
            null,
            null,
            null,
            2,
            6,
            null,
            7,
            null,
            1,
            6,
            8,
            null,
            null,
            7,
            null,
            null,
            9,
            null,
            1,
            9,
            null,
            null,
            null,
            4,
            5,
            null,
            null,
            8,
            2,
            null,
            1,
            null,
            null,
            null,
            4,
            null,
            null,
            null,
            4,
            6,
            null,
            2,
            9,
            null,
            null,
            null,
            5,
            null,
            null,
            null,
            3,
            null,
            2,
            8,
            null,
            null,
            9,
            3,
            null,
            null,
            null,
            7,
            4,
            null,
            4,
            null,
            null,
            5,
            null,
            null,
            3,
            6,
            7,
            null,
            3,
            null,
            1,
            8,
            null,
            null,
            null
        ];
    }

    const getSettings = () => {
        return settings;
    };
    const getInstructions = () => {
        return instructions;
    };

    useEffect(() => {
        setBoard(getBoard());
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
                {board && board.length === 81 && <Board boardState={board} />}
            </div>
        </div>
    );
}

Sudoku.displayName = "Sudoku";
export default Sudoku;
