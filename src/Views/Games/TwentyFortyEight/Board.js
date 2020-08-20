import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Tile from "./Tile";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { LoadingBar, ScoreBoard } from "../../../Components";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Help } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import Key from "./Key";
import Transcript, { colors, transcript } from "./Transcript";
import { UserProfile } from "../../../UserProfile";

const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        width: "100%",
        backgroundColor: theme.palette.secondary.light,
        borderRadius: 10
    },
    column: {
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap",
        flex: "1 1 auto",
        padding: theme.spacing(1)
    },
    row: {
        width: "100%",
        display: "flex",
        flex: "1 1 auto"
    },
    pad: {
        width: "20%",
        padding: theme.spacing(1),
        flex: "1 1 auto"
    }
}));

function addNewTile(boardState) {
    let vacancies = [];
    boardState.forEach((v, i) => {
        if (!v) {
            vacancies.push(i);
        }
    });
    let newIndex = Math.floor(Math.random() * vacancies.length);
    let newValue = [2, 4][Math.floor(Math.random() * 2)];
    let newBoardState = [...boardState];
    newBoardState[newIndex] = newValue;
    return newBoardState;
}

function Board() {
    const classes = useStyles(Theme);
    const [loading, setLoading] = useState(true);

    const [isAdaptive, setIsAdaptive] = useState(false);

    const [gameOver, setGameOver] = useState(false);

    const [board, setBoard] = useState([]);

    const [score, setScore] = useState(0);

    const [rows, setRows] = useState([]);

    const [language, setLanguage] = useState({});

    const [translations, setTranslations] = useState({});

    const { profile } = UserProfile();

    function handleAdaptiveChange() {
        setIsAdaptive(prevState => !prevState);
    }

    const shift = useCallback(
        direction => {
            const newBoard = [...board];

            let rows = {};
            rows.left = [
                [0, 1, 2, 3],
                [4, 5, 6, 7],
                [8, 9, 10, 11],
                [12, 13, 14, 15]
            ];
            rows.right = [
                [3, 2, 1, 0],
                [7, 6, 5, 4],
                [11, 10, 9, 8],
                [15, 14, 13, 12]
            ];
            rows.up = [
                [0, 4, 8, 12],
                [1, 5, 9, 13],
                [2, 6, 10, 14],
                [3, 7, 11, 15]
            ];
            rows.down = [
                [12, 8, 4, 0],
                [13, 9, 5, 1],
                [14, 10, 6, 2],
                [15, 11, 7, 3]
            ];

            let count = 0;
            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    if (newBoard[rows[direction][i][j]]) {
                        for (let k = j - 1; k >= 0; k--) {
                            if (!newBoard[rows[direction][i][k]]) {
                                newBoard[rows[direction][i][k]] =
                                    newBoard[rows[direction][i][k + 1]];
                                newBoard[rows[direction][i][k + 1]] = 0;
                                count++;
                            } else if (
                                Boolean(newBoard[rows[direction][i][k]]) &&
                                newBoard[rows[direction][i][k]] ===
                                    newBoard[rows[direction][i][k + 1]]
                            ) {
                                newBoard[rows[direction][i][k]] *= 2;
                                newBoard[rows[direction][i][k + 1]] = 0;

                                setScore(
                                    prevState =>
                                        prevState +
                                        newBoard[rows[direction][i][k]]
                                );
                                count++;
                                break;
                            } else {
                                break;
                            }
                        }
                    }
                }
            }

            let vacantIndices = [];
            for (let i = 0; i < newBoard.length; i++) {
                if (!newBoard[i]) {
                    vacantIndices.push(i);
                }
            }

            if (vacantIndices.length > 0) {
                if (count > 0) {
                    const newIndex =
                        vacantIndices[
                            Math.floor(
                                Math.random() * Math.floor(vacantIndices.length)
                            )
                        ];

                    const values = [2, 4];
                    newBoard[newIndex] =
                        values[
                            Math.floor(
                                Math.random() * Math.floor(values.length)
                            )
                        ];
                }
            } else {
                let pairs = false;
                for (let i = 0; i < 4; i++) {
                    if (pairs) {
                        break;
                    }
                    for (let j = 0; j < 4; j++) {
                        if (pairs) {
                            break;
                        }
                        if (
                            newBoard[rows["right"][i][j]] ===
                            newBoard[rows["right"][i][j - 1]]
                        ) {
                            pairs = true;
                            break;
                        }
                        if (
                            newBoard[rows["up"][i][j]] ===
                            newBoard[rows["up"][i][j - 1]]
                        ) {
                            pairs = true;
                            break;
                        }
                    }
                }

                if (!pairs) {
                    setGameOver(true);
                }
            }
            setBoard(newBoard);
        },
        [board]
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

    function handleRestart() {
        const initialBoard = addNewTile(Array(16).fill(undefined));
        setBoard(initialBoard);
        setGameOver(false);
        setScore(0);
    }

    useEffect(() => {
        if (
            profile &&
            profile["secondLanguage"] &&
            Boolean(Object.keys(profile["secondLanguage"]).length)
        ) {
            setLoading(true);
            let initialBoard = Array(16).fill(null);
            initialBoard = addNewTile(initialBoard);

            setBoard(initialBoard);
            setLanguage(profile["secondLanguage"].code);
        }
    }, [profile]);
    useEffect(() => {
        if (language && Boolean(Object.keys(language).length)) {
            Promise.resolve(Transcript(language)).then(ts =>
                setTranslations(ts)
            );
        }
    }, [language]);
    useEffect(() => {
        if (
            board &&
            Boolean(board.length) &&
            translations &&
            Boolean(Object.keys(translations).length) &&
            transcript &&
            Boolean(Object.keys(transcript).length)
        ) {
            const rs = [];
            for (let i = 0; i < 4; i++) {
                let ts = [];
                for (let j = 0; j < 4; j++) {
                    let index = i * 4 + j;
                    const color = board[index]
                        ? colors[board[index]]
                        : {
                              backgroundColor: Theme.palette.secondary.main,
                              color: Theme.palette.primary.main
                          };
                    const val = board[index]
                        ? isAdaptive
                            ? transcript[board[index]]
                            : translations[transcript[board[index]]]
                        : null;
                    ts.push(
                        <Tile
                            key={`tile-${index}`}
                            color={color.color}
                            backgroundColor={color.backgroundColor}
                            value={val}
                        />
                    );
                }
                rs.push(
                    <div key={`row-${i}`} className={classes.row}>
                        {ts}
                    </div>
                );
            }
            setRows(rs);
            setLoading(false);
        }
    }, [board, classes, translations, isAdaptive]);
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [handleKeyDown]);

    return (
        <div className={clsx(classes.root)}>
            {loading ? (
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <LoadingBar label="Translations" />
                    </div>
                </div>
            ) : (
                <>
                    <div className={clsx(classes.column)}>
                        <div
                            className={clsx(classes.row)}
                            style={{
                                backgroundColor: Theme.palette.secondary.dark,
                                borderRadius: 10
                            }}
                        >
                            <div className={clsx(classes.pad)}>
                                <div
                                    className={clsx(classes.row)}
                                    style={{
                                        alignItems: "center"
                                    }}
                                >
                                    <div
                                        style={{
                                            margin: Theme.spacing(1),
                                            padding: Theme.spacing(2)
                                        }}
                                    >
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={isAdaptive}
                                                    onChange={
                                                        handleAdaptiveChange
                                                    }
                                                    style={{
                                                        color:
                                                            Theme.palette
                                                                .primary.main
                                                    }}
                                                />
                                            }
                                            style={{
                                                color:
                                                    Theme.palette.primary.main
                                            }}
                                            label="English"
                                        />
                                    </div>
                                    <div className={clsx(classes.pad)}>
                                        <IconButton
                                            style={{
                                                color:
                                                    Theme.palette.primary.main
                                            }}
                                        >
                                            <Help />
                                        </IconButton>
                                    </div>
                                </div>
                            </div>
                            <div className={clsx(classes.pad)}>
                                <ScoreBoard score={() => score} />
                            </div>
                            <div className={clsx(classes.pad)}>
                                <div className={clsx(classes.row)}>
                                    {gameOver && (
                                        <>
                                            <div className={clsx(classes.pad)}>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="secondary"
                                                >
                                                    Game over
                                                </Typography>
                                            </div>
                                            <div className={clsx(classes.pad)}>
                                                <Button onClick={handleRestart}>
                                                    Restart
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        {rows}
                    </div>
                    <div>
                        <Key />
                    </div>
                </>
            )}
        </div>
    );
}

Board.displayName = "Board";
export default Board;
