import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Shuffle, Theme } from "../../../utils";
import clsx from "clsx";
import Tile from "./Tile";
import { ControlBar } from "../../../Components";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexFlow: "row wrap"
    },
    content: {
        padding: theme.spacing(1),
        flex: "1 1 100%",
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap"
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
        padding: theme.spacing(1),
        flex: "1 1 100px"
    }
}));

function TileSlider() {
    document.title = "Tile Slider";
    const classes = useStyles(Theme);

    const [board, setBoard] = useState(null);
    const [vacant, setVacant] = useState(15);

    const [language, setLanguage] = useState();
    function isntSolvable(board) {
        let inv_count = 0;
        for (let i = 0; i < 16 - 1; i++) {
            for (let j = i + 1; j < 16; j++) {
                if (board[j] && board[i] && board[i] > board[j]) inv_count++;
            }
        }
        return inv_count & 1;
    }
    const initializeBoard = useCallback(() => {
        do {
            var squares = Shuffle([
                1,
                2,
                3,
                4,
                5,
                6,
                7,
                8,
                9,
                10,
                11,
                12,
                13,
                14,
                15
            ]);
        } while (isntSolvable(squares));
        return [...squares, null];
    }, []);

    const shift = useCallback(
        direction => {
            let newBoard = [...board];

            switch (direction) {
                case "left":
                    if ([0, 4, 8, 12].includes(vacant)) return;
                    newBoard[vacant] = newBoard[vacant - 1];
                    newBoard[vacant - 1] = null;
                    setVacant(vacant - 1);
                    break;
                case "right":
                    if ([3, 7, 11, 15].includes(vacant)) return;
                    newBoard[vacant] = newBoard[vacant + 1];
                    newBoard[vacant + 1] = null;
                    setVacant(vacant + 1);
                    break;
                case "up":
                    if ([0, 1, 2, 3].includes(vacant)) return;
                    newBoard[vacant] = newBoard[vacant - 4];
                    newBoard[vacant - 4] = null;
                    setVacant(vacant - 4);
                    break;
                case "down":
                    if ([12, 13, 14, 15].includes(vacant)) return;
                    newBoard[vacant] = newBoard[vacant + 4];
                    newBoard[vacant + 4] = null;
                    setVacant(vacant + 4);
                    break;
                default:
                    return;
            }

            setBoard(newBoard);
        },
        [board, vacant]
    );
    const handleKeyDown = useCallback(
        event => {
            if (event.key === "ArrowUp") {
                shift("up");
            } else if (event.key === "ArrowDown") {
                shift("down");
            } else if (event.key === "ArrowLeft") {
                shift("left");
            } else if (event.key === "ArrowRight") {
                shift("right");
            }
        },
        [shift]
    );

    useEffect(() => {
        setBoard(initializeBoard());
    }, [initializeBoard]);
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [handleKeyDown]);

    useEffect(() => {
        console.log(language);
    }, [language]);
    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)} style={{ maxWidth: 250 }}>
                <ControlBar updateLanguage={setLanguage} />
            </div>
            {board && (
                <div className={clsx(classes.column)}>
                    <div className={clsx(classes.pad)}>
                        <div className={clsx(classes.row)}>
                            <Tile value={board[0]} />
                            <Tile value={board[1]} />
                            <Tile value={board[2]} />
                            <Tile value={board[3]} />
                        </div>
                        <div className={clsx(classes.row)}>
                            <Tile value={board[4]} />
                            <Tile value={board[5]} />
                            <Tile value={board[6]} />
                            <Tile value={board[7]} />
                        </div>
                        <div className={clsx(classes.row)}>
                            <Tile value={board[8]} />
                            <Tile value={board[9]} />
                            <Tile value={board[10]} />
                            <Tile value={board[11]} />
                        </div>
                        <div className={clsx(classes.row)}>
                            <Tile value={board[12]} />
                            <Tile value={board[13]} />
                            <Tile value={board[14]} />
                            <Tile value={board[15]} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

TileSlider.displayName = "TileSlider";
export default TileSlider;
