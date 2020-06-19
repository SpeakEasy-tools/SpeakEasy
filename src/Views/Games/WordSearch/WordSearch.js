import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Settings from "./Settings";
import Instructions from "./Instructions";
import { ControlBar } from "../../../Components";

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
        padding: theme.spacing(1),
        flex: "1 1 100px"
    }
}));

function WordSearch() {
    document.title = "Word Search";
    const classes = useStyles(Theme);

    const [language, setLanguage] = useState(null);

    const settings = Settings(language, setLanguage);
    const instructions = Instructions();

    const getSettings = () => {
        return settings;
    };
    const getInstructions = () => {
        return instructions;
    };

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <ControlBar
                    settings={getSettings}
                    instructions={getInstructions}
                />
            </div>
        </div>
    );
}
WordSearch.displayName = "WordSearch";
export default WordSearch;
