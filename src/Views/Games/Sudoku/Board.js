import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Square from "./Square";
import DeleteIcon from "@material-ui/icons/Delete";

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
function Board({ boardState, setBoardState }) {
    const classes = useStyles(Theme);

    const [board, setBoard] = useState([]);

    const [rows, setRows] = useState([]);

    const [anchorEl, setAnchorEl] = useState(null);

    const [diffAchorEl, setDiffAnchorEl] = useState(null);

    const [validChoices, setValidChoices] = useState([]);

    const [selectedTile, setSelectedTile] = useState(null);

    const [selectedDifficulty, setselectedDifficulty] = React.useState(1);

    const difficultyOptions = ["Easy", "Medium", "Hard", "Extreme"];

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
                rowset.length !== 9 ||
                colset.length !== 9 ||
                squareset.length !== 9
            ) {
                return false;
            }
        }
        return true;
    }

    function handleClick(squareId, tileId, e) {
        if (board[tileId] !== 0 && boardState[tileId] === board[tileId]) {
            return;
        }
        setAnchorEl(e);
        setSelectedTile(tileId);
        setValidChoices([...getValid(squareId, tileId)]);
    }

    function handleClose(e) {
        if (e.target.textContent) {
            let newBoard = [...board];
            newBoard[selectedTile] = parseInt(e.target.textContent);
            setBoard(newBoard);
        }
        setAnchorEl(null);
    }

    function handleClear(e) {
        let newBoard = [...board];
        newBoard[selectedTile] = parseInt(e.target.textContent);
        setBoard(newBoard);
        setAnchorEl(null);
    }

    function clearBoard() {
        setBoard(boardState);
    }

    function selectDifficulty(e, index) {
        if (e.target.textContent) {
            setselectedDifficulty(index);
            fetch(
                "http://127.0.0.1:5000/sudoku?difficulty=" +
                    e.target.textContent,
                {
                    method: "POST"
                }
            ).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        setBoard(json);
                        setBoardState(json);
                    });
                }
            });
        }
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

        const options = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
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
        if (boardState && boardState.length === 81) {
            setBoard([...boardState]);
        }
    }, [boardState]);
    return (
        <div className={clsx(classes.root)}>
            <div className={classes.row}>
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
                        anchorEl={diffAchorEl}
                        keepMounted
                        open={Boolean(diffAchorEl)}
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
            {rows &&
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
                ))}
            <Menu
                id="Number select"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <div className={clsx(classes.row)}>
                    <DeleteIcon key="delete" onClick={handleClear}>
                        {" "}
                        {"test"}{" "}
                    </DeleteIcon>
                </div>
                {validChoices.map((v, i) => (
                    <MenuItem key={i} onClick={handleClose}>
                        {v}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}

Board.displayName = "Board";
Board.propTypes = {
    boardState: PropTypes.array.isRequired,
    setBoardState: PropTypes.func.isRequired
};
export default Board;
