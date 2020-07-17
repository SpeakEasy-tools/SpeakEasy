import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Shuffle, Theme } from "../../../utils";
import clsx from "clsx";
import Tile from "./Tile";
import { ControlBar } from "../../../Components/ControlBar";
import { getTranslations } from "../../../CloudFunctions/Translate";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import Instructions from "./Instructions";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexFlow: "row wrap"
    },
    content: {
        padding: theme.spacing(1),
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10%"
    },
    column: {
        display: "flex",
        flexFlow: "column noWrap",
        flex: "1 1 auto"
    },
    row: {
        width: "100%",
        display: "flex",
        justifyContent: "center"
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
    const [translation, setTranslation] = useState(Array(15).fill(""));
    const [loading, setLoading] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [language, setLanguage] = useState("");
    const instructions = Instructions();

    function getInstructions() {
        return instructions;
    }
    function isntSolvable(board) {
        let inv_count = 0;
        for (let i = 0; i < 16 - 1; i++) {
            for (let j = i + 1; j < 16; j++) {
                if (board[j] && board[i] && board[i] > board[j]) inv_count++;
            }
        }
        return inv_count & 1;
    }
    function checkBoard() {
        for (let i = 0; i < 16; i++) {
            if (board[i] !== translation[i]) {
                return;
            }
        }
        setGameWon(true);
    }
    const handleTranslation = useCallback(() => {
        setLoading(true);
        let squares = [
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten",
            "eleven",
            "twelve",
            "thirteen",
            "fourteen",
            "fifteen"
        ];
        return Promise.resolve(getTranslations(squares, language.code))
            .then(ts => {
                let trans = [];
                ts.forEach(t => trans.push(t.translation));
                setTranslation([...trans, null]);
            })
            .finally(() => setLoading(false));
    }, [language]);
    const initializeBoard = useCallback(() => {
        setGameWon(false);
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
        for (let i = 0; i < 16; i++) {
            switch (squares[i]) {
                case 1:
                    squares[i] = translation[0];
                    break;
                case 2:
                    squares[i] = translation[1];
                    break;
                case 3:
                    squares[i] = translation[2];
                    break;
                case 4:
                    squares[i] = translation[3];
                    break;
                case 5:
                    squares[i] = translation[4];
                    break;
                case 6:
                    squares[i] = translation[5];
                    break;
                case 7:
                    squares[i] = translation[6];
                    break;
                case 8:
                    squares[i] = translation[7];
                    break;
                case 9:
                    squares[i] = translation[8];
                    break;
                case 10:
                    squares[i] = translation[9];
                    break;
                case 11:
                    squares[i] = translation[10];
                    break;
                case 12:
                    squares[i] = translation[11];
                    break;
                case 13:
                    squares[i] = translation[12];
                    break;
                case 14:
                    squares[i] = translation[13];
                    break;
                case 15:
                    squares[i] = translation[14];
                    break;
                default:
                    squares[i] = null;
            }
        }
        return [...squares];
    }, [translation]);

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
        if (handleTranslation) {
            handleTranslation();
        }
    }, [handleTranslation]);
    useEffect(() => {
        setBoard(initializeBoard());
    }, [translation, initializeBoard]);
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [handleKeyDown]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.column)} style={{ maxWidth: 250 }}>
                <ControlBar
                    updateLanguage={setLanguage}
                    instructions={getInstructions}
                />
            </div>
            {language && language.name && board && (
                <div className={clsx(classes.column)}>
                    {gameWon && (
                        <div className={clsx(classes.content)}>
                            <Typography variant="h4" color="secondary">
                                Complete!
                            </Typography>
                        </div>
                    )}
                    {loading ? (
                        <div className={clsx(classes.row)}>
                            <div className={clsx(classes.pad)}>
                                <CircularProgress color="secondary" />
                            </div>
                        </div>
                    ) : (
                        <div className={clsx(classes.pad)}>
                            <div className={clsx(classes.row)}>
                                <Button onClick={checkBoard}>
                                    Check Board
                                </Button>
                            </div>
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
            )}
        </div>
    );
}

TileSlider.displayName = "TileSlider";
export default TileSlider;
