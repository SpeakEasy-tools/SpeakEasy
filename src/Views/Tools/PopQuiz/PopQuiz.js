import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { ViewWrapper } from "../../../Components/ViewWrapper";
import Instructions from "./Instructions";
import Settings from "./Settings";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    },
    row: {
        flex: "1 1 100%",
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    }
}));

function PopQuiz() {
    document.title = "Pop Quiz";
    const classes = useStyles(Theme);

    const settings = Settings();
    const getSettings = () => {
        return settings;
    };
    const instructions = Instructions();
    const getInstructions = () => {
        return instructions;
    };
    const getScore = () => {};
    const getTime = () => {};

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <ViewWrapper
                    settings={getSettings}
                    instructions={getInstructions}
                    score={getScore}
                    time={getTime}
                />
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)} />
            </div>
        </div>
    );
}

PopQuiz.displayName = "PopQuiz";
PopQuiz.propTypes = {};
export default PopQuiz;
