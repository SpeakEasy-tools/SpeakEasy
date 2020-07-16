import PropTypes from "prop-types";
import React, { useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { Button, ListItemIcon } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Square from "./Square";
import DeleteIcon from "@material-ui/icons/Delete";
import { getTranslations } from "../../../CloudFunctions/Translate";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    row: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    },
    typography: {
        "&:hover": {
            cursor: "pointer"
        }
    }
}));

// boardState is a 1-d list of integers representing the 81 tiles in sudoku
function Board({ languageCode }) {
    const classes = useStyles(Theme);

    const [board, setBoard] = useState([]);
    const [boardState, setBoardState] = useState([]);

    const [rows, setRows] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);

    const [diffAnchorEl, setDiffAnchorEl] = useState(null);

    const [validChoices, setValidChoices] = useState([]);

    const [selectedTile, setSelectedTile] = useState(null);

    const [selectedDifficulty, setselectedDifficulty] = React.useState(1);
    const [loading, setLoading] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [translation, setTranslation] = useState();

    const difficultyOptions = ["Beginner", "Easy", "Medium", "Hard", "Extreme"];

    const translate = useCallback(
        tiles => {
            for (let i = 0; i < 81; i++) {
                switch (tiles[i]) {
                    case 1:
                        tiles[i] = translation[0];
                        break;
                    case 2:
                        tiles[i] = translation[1];
                        break;
                    case 3:
                        tiles[i] = translation[2];
                        break;
                    case 4:
                        tiles[i] = translation[3];
                        break;
                    case 5:
                        tiles[i] = translation[4];
                        break;
                    case 6:
                        tiles[i] = translation[5];
                        break;
                    case 7:
                        tiles[i] = translation[6];
                        break;
                    case 8:
                        tiles[i] = translation[7];
                        break;
                    case 9:
                        tiles[i] = translation[8];
                        break;
                    default:
                        tiles[i] = 0;
                }
            }
            setBoard(tiles);
            return tiles;
        },
        [translation]
    );
    const handleTranslation = useCallback(() => {
        setLoading(true);
        let transcript = [
            "one",
            "two",
            "three",
            "four",
            "five",
            "six",
            "seven",
            "eight",
            "nine"
        ];
        return Promise.resolve(
            getTranslations(Object.values(transcript), languageCode)
        )
            .then(ts => {
                let trans = [];
                ts.forEach(t => trans.push(t.translation));
                setTranslation(trans);
            })
            .finally(() => setBoard([]));
    }, [languageCode]);
    function checkBoard() {
        for (let i = 0; i < 9; i++) {
            let rowset = new Set(getRow(i).map(a => a.value));
            let colset = new Set(getColumn(i).map(a => a.value));
            let squareset = new Set(
                getSquare(i)
                    .map(a => [a[0].value, a[1].value, a[2].value])
                    .flat()
            );
            if (
                rowset.size !== 9 ||
                colset.size !== 9 ||
                squareset.size !== 9
            ) {
                return false;
            }
        }
        setGameWon(true);
        return true;
    }

    function handleClick(squareId, tileId, e) {
        if (board[tileId] !== 0 && boardState[tileId] === board[tileId]) {
            return;
        } else {
            let id =
                9 * squareId + (Math.floor(tileId / 9) % 3) * 3 + (tileId % 3);
            let tiles = document.querySelectorAll(
                "[class^='makeStyles-tileRoot']"
            );
            tiles[id].style.color = "#5c5c5c";
        }
        setAnchorEl(e);
        setSelectedTile(tileId);
        setValidChoices([...getValid(squareId, tileId)]);
    }

    function handleClose(e) {
        if (e.target.textContent) {
            let newBoard = [...board];
            newBoard[selectedTile] = e.target.textContent;
            setBoard(newBoard);
        }
        setAnchorEl(null);
    }

    function handleClear() {
        let newBoard = [...board];
        newBoard[selectedTile] = 0;
        setBoard(newBoard);
        setAnchorEl(null);
        setGameWon(false);
    }

    function clearBoard() {
        setBoard(boardState);
        setGameWon(false);
    }

    function selectDifficulty(e, index) {
        if (e && e.target.textContent) {
            setLoading(true);
            setselectedDifficulty(index);
            fetch("http://api.speakeasy.services/sudoku/1")
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                            setBoardState(translate(json["board"].flat()));
                        });
                    }
                })
                .finally(() => setLoading(false));
        }
        setGameWon(false);
        setDiffAnchorEl(null);
    }

    function handleDifficultyClick(event) {
        setDiffAnchorEl(event.currentTarget);
    }

    function handleDifficultyClose() {
        setDiffAnchorEl(null);
    }
    // Rows go from top to bottom numbered 0-8
    function getRow(rowNum) {
        const row = [];
        for (let i = 0; i < 9; i++) {
            let index = rowNum * 9 + i;
            let value = board[index];
            row.push({ id: index, value: value });
        }
        return row;
    }

    // Columns go from left to right numbered 0-8
    function getColumn(colNum) {
        const column = [];
        for (let i = 0; i < board.length; i += 9) {
            let index = i + colNum;
            let value = board[index];
            column.push({ id: index, value: value });
        }
        return column;
    }

    // Squares go from left to right, top to bottom numbered 0-8
    function getSquare(squareNum) {
        let square = [];
        let colNum = Math.floor(squareNum % 3);
        let rowNum = Math.floor(squareNum / 3);
        for (let i = 0; i < 3; i++) {
            let r = [];
            for (let j = 0; j < 3; j++) {
                let index = (rowNum * 3 + i) * 9 + colNum * 3 + j;
                let value = board[index];
                r.push({ id: index, value: value });
            }
            square.push(r);
        }
        return square;
    }

    function getValid(squareId, tileId) {
        const rowNum = Math.floor(tileId / 9);
        const colNum = Math.floor(tileId % 9);

        const row = getRow(rowNum).map(r => r.value);
        const col = getColumn(colNum).map(c => c.value);
        const square = getSquare(squareId)
            .flat(1)
            .map(s => s.value);

        const options = new Set(translation);
        const invalid = new Set([...row, ...col, ...square]);
        return new Set([...options].filter(x => !invalid.has(x)));
    }

    useEffect(() => {
        function square(squareId) {
            let s = [];
            let colNum = Math.floor(squareId % 3);
            let rowNum = Math.floor(squareId / 3);
            for (let i = 0; i < 3; i++) {
                let r = [];
                for (let j = 0; j < 3; j++) {
                    let index = (rowNum * 3 + i) * 9 + colNum * 3 + j;
                    let value = board[index];
                    r.push({ id: index, value: value });
                }
                s.push(r);
            }
            return s;
        }

        if (board && board.length === 81) {
            setRows([
                [square(0), square(1), square(2)],
                [square(3), square(4), square(5)],
                [square(6), square(7), square(8)]
            ]);
        }
    }, [board]);
    useEffect(() => {
        if (handleTranslation) {
            handleTranslation();
        }
    }, [handleTranslation]);
    useEffect(() => {
        if (translation) {
            fetch("http://api.speakeasy.services/sudoku/1")
                .then(response => {
                    if (response.ok) {
                        response.json().then(json => {
                            setBoardState(translate(json["board"].flat()));
                        });
                    }
                })
                .finally(() => setLoading(false));
        }
    }, [translate, translation]);
    useEffect(() => {
        if (boardState && boardState.length === 81) {
            setBoard([...boardState]);
        }
    }, [boardState]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Button onClick={checkBoard}> Check Board </Button>
                </div>
                <div className={clsx(classes.pad)}>
                    <Button onClick={clearBoard}> Clear Board </Button>
                </div>
                <div className={clsx(classes.pad)}>
                    <Button
                        aria-controls="Difficulty-Select"
                        aria-haspopup="true"
                        onClick={handleDifficultyClick}
                    >
                        Select Difficulty
                    </Button>
                    <Menu
                        id="Difficulty-Select"
                        anchorEl={diffAnchorEl}
                        keepMounted
                        open={Boolean(diffAnchorEl)}
                        onClose={handleDifficultyClose}
                    >
                        {difficultyOptions.map((option, index) => (
                            <MenuItem
                                key={index}
                                onClick={e => selectDifficulty(e, index)}
                                selected={index === selectedDifficulty}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </div>
            </div>
            {gameWon && (
                <div className={clsx(classes.row)}>
                    <div className={clsx(classes.pad)}>
                        <Typography variant="h4" color="secondary">
                            Complete!
                        </Typography>
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
                rows &&
                rows.map((row, index) => (
                    <div
                        key={`row${index}`}
                        className={clsx(classes.row)}
                        aria-controls={"Number Select"}
                    >
                        {row &&
                            row.map((square, id) => (
                                <div
                                    key={id}
                                    className={clsx(classes.pad)}
                                    style={{
                                        border: `2px solid ${Theme.palette.secondary.main}`
                                    }}
                                >
                                    <Square
                                        vals={square}
                                        squareId={index * 3 + id}
                                        handleClick={handleClick}
                                    />
                                </div>
                            ))}
                    </div>
                ))
            )}
            <Menu
                id="Number select"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <ListItemIcon style={{ minWidth: "0px" }}>
                        <DeleteIcon
                            key="delete"
                            onClick={handleClear}
                        ></DeleteIcon>
                    </ListItemIcon>
                </MenuItem>
                {validChoices.map((v, i) => (
                    <MenuItem
                        key={i}
                        onClick={handleClose}
                        style={{ justifyContent: "center" }}
                    >
                        {v}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

Board.displayName = "Board";
Board.propTypes = {
    languageCode: PropTypes.string.isRequired
};
export default Board;
