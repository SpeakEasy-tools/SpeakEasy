import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { GetRandomLessons } from "../../../Queries";
import Board from "./Board";
import { ControlBar } from "../../../Components/ControlBar";
import Settings from "./Settings";
import Instructions from "./Instructions";
import { ScoreBoard } from "../../../Components/ScoreBoard";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexFlow: "row wrap"
    },
    row: {
        flex: "1 1 100%"
    },
    pad: {
        margin: theme.spacing(1),
        flex: "1 1 100px"
    }
}));

function Memory() {
    document.title = "Memory";
    const classes = useStyles(Theme);

    const [language, setLanguage] = useState(null);
    const [boardSize, setBoardSize] = useState(null);

    const [score, setScore] = useState(0);
    const [time, setTime] = useState(null);

    const [tileCount, setTileCount] = useState(null);
    const [lessons] = GetRandomLessons(tileCount);
    const [tiles, setTiles] = useState(null);

    const settings = Settings({
        boardSize: boardSize,
        setBoardSize: setBoardSize
    });
    const instructions = Instructions();

    function getSettings() {
        console.log(time);
        return settings;
    }
    function getInstructions() {
        return instructions;
    }

    useEffect(() => {
        if (!lessons) return;
        setTiles(lessons.map(l => l.lesson));
    }, [lessons]);

    useEffect(() => {
        if (!boardSize) return;
        const t = Math.floor(boardSize.size / 2);

        setTileCount(t);
    }, [boardSize]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)}>
                <ControlBar
                    updateLanguage={setLanguage}
                    instructions={getInstructions}
                    settings={getSettings}
                />
            </div>
            <div className={clsx(classes.column)}>
                {tiles && language && (
                    <>
                        <ScoreBoard score={score} />
                        <Board
                            tiles={tiles}
                            language={language.text}
                            setScore={setScore}
                            setTime={setTime}
                        />
                    </>
                )}
            </div>
        </div>
    );
}

Memory.displayName = "Memory";
export default Memory;
