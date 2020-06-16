import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { getTranslations } from "../../../CloudFunctions/Translate";
import CircularProgress from "@material-ui/core/CircularProgress";
import Tile from "./Tile";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

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
        width: "20%",
        padding: theme.spacing(1),
        flex: "1 1 100%"
    }
}));

const transcript = {
    two: "two",
    four: "four",
    eight: "eight",
    sixteen: "sixteen",
    "thirty two": "thirty two",
    "sixty four": "sixty four",
    "one hundred twenty eight": "one hundred twenty eight",
    "two hundred fifty six": "two hundred fifty six",
    "five hundred twelve": "five hundred twelve",
    "one thousand twenty four": "one thousand twenty four",
    "two thousand forty eight": "two thousand forty eight"
};

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

function Board({ languageCode, adaptive, updateScore }) {
    const classes = useStyles(Theme);

    const [loading, setLoading] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const [board, setBoard] = useState([]);

    const [translation, setTranslation] = useState();

    const [score, setScore] = useState(0);
    const handleTranslation = useCallback(() => {
        setLoading(true);
        return Promise.resolve(
            getTranslations(Object.values(transcript), languageCode)
        )
            .then(ts => {
                let trans = {};
                ts.forEach(t => (trans[t.text] = t.translation));
                setTranslation(trans);
            })
            .finally(() => setLoading(false));
    }, [languageCode]);

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
        setLoading(false);
        setGameOver(false);
    }
    function getProps(value) {
        let index =
            Math.random() *
            Math.log2(
                Math.max(
                    Math.log2(Math.max(Math.log2(Math.max(score, 3)), 3)),
                    3
                )
            );
        index = Math.round(index + Number.EPSILON);
        console.log(`index: ${index}`);

        if (adaptive) {
            switch (index) {
                case 0:
                    return { label: "", value: value ? value : 0 };
                case 1:
                    return {
                        label: value ? value.toString() : "",
                        value: value ? value : 0
                    };

                default:
                    break;
            }
        }
        switch (value) {
            case 2:
                return {
                    label: translation["two"],
                    value: index === 2 ? value : 0
                };
            case 4:
                return {
                    label: translation["four"],
                    value: index === 2 ? value : 0
                };
            case 8:
                return {
                    label: translation["eight"],
                    value: index === 2 ? value : 0
                };
            case 16:
                return {
                    label: translation["sixteen"],
                    value: index === 2 ? value : 0
                };
            case 32:
                return {
                    label: translation["thirty two"],
                    value: index === 2 ? value : 0
                };
            case 64:
                return {
                    label: translation["sixty four"],
                    value: index === 2 ? value : 0
                };
            case 128:
                return {
                    label: translation["one hundred twenty eight"],
                    value: index === 2 ? value : 0
                };
            case 256:
                return {
                    label: translation["two hundred fifty six"],
                    value: index === 2 ? value : 0
                };
            case 512:
                return {
                    label: translation["five hundred twelve"],
                    value: index === 2 ? value : 0
                };
            case 1024:
                return {
                    label: translation["one thousand twenty four"],
                    value: index === 2 ? value : 0
                };
            case 2048:
                return {
                    label: translation["two thousand forty eight"],
                    value: index === 2 ? value : 0
                };
            default:
                return { label: "", value: 0 };
        }
    }

    function GetRows() {
        let rows = [];
        for (let i = 0; i < 4; i++) {
            rows.push(
                <div key={`row-${i}`} className={classes.row}>
                    {getTiles(i)}
                </div>
            );
        }
        return rows;
    }

    function getTiles(rowNum) {
        let tiles = [];
        for (let i = 0; i < 4; i++) {
            let index = rowNum * 4 + i;
            tiles.push(
                <Tile key={`tile-${index}`} {...getProps(board[index])} />
            );
        }
        return tiles;
    }

    useEffect(() => {
        if (handleTranslation) {
            const initialBoard = addNewTile(Array(16).fill(undefined));
            setBoard(initialBoard);
            handleTranslation().finally();
        }
    }, [handleTranslation]);
    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown, false);
        return () => {
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [handleKeyDown]);
    useEffect(() => {
        updateScore(score);
    }, [score, updateScore]);
    return (
        <div className={clsx(classes.root)}>
            {gameOver && (
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <Typography variant="h2" color="secondary">
                            Game over
                        </Typography>
                    </div>
                    <div className={clsx(classes.pad)} onClick={handleRestart}>
                        <Button>Restart</Button>
                    </div>
                </div>
            )}
            {loading ? (
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <CircularProgress color="secondary" />
                    </div>
                </div>
            ) : (
                <>{board && GetRows()}</>
            )}
        </div>
    );
}

Board.displayName = "Board";
Board.propTypes = {
    languageCode: PropTypes.string.isRequired,
    updateScore: PropTypes.func,
    adaptive: PropTypes.bool
};
export default Board;
