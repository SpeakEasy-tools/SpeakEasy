import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { ViewWrapper } from "../../../Components/ViewWrapper";
import Board from "./Board";
import Settings from "./Settings";

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

    const handleClick = () => {};
    const getSettings = () => {
        return settings;
    };
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper settings={getSettings} />
            </div>
            <div className={clsx(classes.row)}>
                <Board handleClick={handleClick} />
            </div>
        </div>
    );
}

Sudoku.displayName = "Sudoku";
export default Sudoku;
