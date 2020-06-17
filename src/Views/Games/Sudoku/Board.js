import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Square from "./Square";
import Divider from "@material-ui/core/Divider";
import { Button, ButtonGroup, Container } from "@material-ui/core";

const useStyles = makeStyles(() => ({
    root: {
        width: "100%"
    },
    row: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        cursor: "pointer"
    },
    buttongroup: {
        width: "100%",
        justifyContent: "center"
    },
    container: {
        display: "flex",
        justifyContent: "center"
    }
}));

function Board() {
    const classes = useStyles(Theme);
    var [board, setBoard] = useState(
        Array(9)
            .fill()
            .map(() => Array(9).fill("\u00A0"))
    );
    var [initialBoard, setInitialBoard] = useState(
        Array(9)
            .fill()
            .map(() => Array(9).fill("\u00A0"))
    );
    const deepCopy = oldarray => {
        return JSON.parse(JSON.stringify(oldarray));
    };
    useEffect(() => {
        const initialBoardState = async () => {
            let data;
            let strings = Array(9)
                .fill()
                .map(() => Array(9).fill("\u00A0"));
            await fetch(
                "https://sugoku.herokuapp.com/board?difficulty=easy"
            ).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        data = json["board"];
                        for (let i = 0; i < 9; i++) {
                            for (let j = 0; j < 9; j++) {
                                let element = document.getElementById(
                                    getID(i, j)
                                );
                                if (data[i][j] !== 0) {
                                    strings[i][j] = data[i][j].toString();
                                    element.disabled = true;
                                } else {
                                    element.style.color =
                                        Theme.palette.secondary.light;
                                }
                            }
                        }
                        setInitialBoard(strings);
                        setBoard(deepCopy(strings));
                    });
                }
            });
        };
        initialBoardState();
    }, []);
    const countOccurrencesOf = (word, search) => {
        return word.filter(el => el.includes(search)).length;
    };
    const checkBoard = alerts => {
        let flag = true;
        for (let i = 0; i < board.length; i++) {
            let column = board.map(function(value) {
                return value[i];
            });
            let box = getSquare(i);
            for (let j = 0; j < 9; j++) {
                let element = document.getElementById(getID(i, j));
                element.style.backgroundColor = Theme.palette.primary.light;
                element.addEventListener("mouseover", function() {
                    this.style.backgroundColor = Theme.palette.primary.main;
                });
                element.addEventListener("mouseout", function() {
                    this.style.backgroundColor = Theme.palette.primary.light;
                });
            }
            for (let j = 1; j <= board[0].length; j++) {
                let j_s = j.toString();
                if (
                    !board[i].includes(j_s) ||
                    !column.includes(j_s) ||
                    !box.includes(j_s) ||
                    board[i].includes("\u00A0") ||
                    column.includes("\u00A0") ||
                    box.includes("\u00A0")
                ) {
                    flag = false;
                    if (alerts) {
                        alert("The puzzle isn't finished yet!");
                        return false;
                    }
                }
                if (countOccurrencesOf(board[i], j_s) > 1) {
                    let rowduplicates = getIndicesOf(j_s, board[i]);
                    for (let k = 0; k < rowduplicates.length; k++) {
                        let rowid = getID(i, rowduplicates[k]);
                        let rowelement = document.getElementById(rowid);
                        rowelement.style.backgroundColor =
                            Theme.palette.error.light;
                        rowelement.addEventListener("mouseover", function() {
                            this.style.backgroundColor =
                                Theme.palette.error.main;
                        });
                        rowelement.addEventListener("mouseout", function() {
                            this.style.backgroundColor =
                                Theme.palette.error.light;
                        });
                    }
                }
                if (countOccurrencesOf(column, j_s) > 1) {
                    let colduplicates = getIndicesOf(j_s, column);
                    for (let m = 0; m < colduplicates.length; m++) {
                        let colid = getID(colduplicates[m], i);
                        let colelement = document.getElementById(colid);
                        colelement.style.backgroundColor =
                            Theme.palette.error.light;
                        colelement.addEventListener("mouseover", function() {
                            this.style.backgroundColor =
                                Theme.palette.error.main;
                        });
                        colelement.addEventListener("mouseout", function() {
                            this.style.backgroundColor =
                                Theme.palette.error.light;
                        });
                    }
                }
                if (countOccurrencesOf(box, j_s) > 1) {
                    let boxduplicates = getIndicesOf(j_s, box);
                    for (let n = 0; n < boxduplicates.length; n++) {
                        let boxid = i.toString() + boxduplicates[n];
                        let boxelement = document.getElementById(boxid);
                        boxelement.style.backgroundColor =
                            Theme.palette.error.light;
                        boxelement.addEventListener("mouseover", function() {
                            this.style.backgroundColor =
                                Theme.palette.error.main;
                        });
                        boxelement.addEventListener("mouseout", function() {
                            this.style.backgroundColor =
                                Theme.palette.error.light;
                        });
                    }
                }
            }
        }
        if (flag) {
            alert("Done!");
        }
    };
    const clearBoard = () => {
        setBoard(deepCopy(initialBoard));
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                let id = getID(i, j);
                let element = document.getElementById(id);
                element.style.backgroundColor = Theme.palette.primary.light;
                element.addEventListener("mouseover", function() {
                    this.style.backgroundColor = Theme.palette.primary.main;
                });
                element.addEventListener("mouseout", function() {
                    this.style.backgroundColor = Theme.palette.primary.light;
                });
                element.textContent = initialBoard[i][j].toString();
                if (initialBoard[i][j] !== "\u00A0") {
                    element.disabled = true;
                }
            }
        }
    };
    function getIndicesOf(searchStr, str) {
        let searchStrLen = searchStr.length;
        if (searchStrLen === 0) {
            return [];
        }
        let startIndex = 0,
            index,
            indices = [];
        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    }
    const getID = (row, column) => {
        let id = "";
        id += Math.floor(row / 3) * 3 + Math.floor(column / 3);
        id += (row % 3) * 3 + (column % 3);
        return id;
    };
    const getSquare = squareId => {
        switch (squareId) {
            case 0:
                return [
                    board[0][0],
                    board[0][1],
                    board[0][2],
                    board[1][0],
                    board[1][1],
                    board[1][2],
                    board[2][0],
                    board[2][1],
                    board[2][2]
                ];
            case 1:
                return [
                    board[0][3],
                    board[0][4],
                    board[0][5],
                    board[1][3],
                    board[1][4],
                    board[1][5],
                    board[2][3],
                    board[2][4],
                    board[2][5]
                ];
            case 2:
                return [
                    board[0][6],
                    board[0][7],
                    board[0][8],
                    board[1][6],
                    board[1][7],
                    board[1][8],
                    board[2][6],
                    board[2][7],
                    board[2][8]
                ];
            case 3:
                return [
                    board[3][0],
                    board[3][1],
                    board[3][2],
                    board[4][0],
                    board[4][1],
                    board[4][2],
                    board[5][0],
                    board[5][1],
                    board[5][2]
                ];
            case 4:
                return [
                    board[3][3],
                    board[3][4],
                    board[3][5],
                    board[4][3],
                    board[4][4],
                    board[4][5],
                    board[5][3],
                    board[5][4],
                    board[5][5]
                ];
            case 5:
                return [
                    board[3][6],
                    board[3][7],
                    board[3][8],
                    board[4][6],
                    board[4][7],
                    board[4][8],
                    board[5][6],
                    board[5][7],
                    board[5][8]
                ];
            case 6:
                return [
                    board[6][0],
                    board[6][1],
                    board[6][2],
                    board[7][0],
                    board[7][1],
                    board[7][2],
                    board[8][0],
                    board[8][1],
                    board[8][2]
                ];
            case 7:
                return [
                    board[6][3],
                    board[6][4],
                    board[6][5],
                    board[7][3],
                    board[7][4],
                    board[7][5],
                    board[8][3],
                    board[8][4],
                    board[8][5]
                ];
            case 8:
                return [
                    board[6][6],
                    board[6][7],
                    board[6][8],
                    board[7][6],
                    board[7][7],
                    board[7][8],
                    board[8][6],
                    board[8][7],
                    board[8][8]
                ];
            default:
                return;
        }
    };

    const handleTileClick = (squareId, tileId, val) => {
        let column = (squareId % 3) * 3 + (tileId % 3);
        let row = Math.floor(squareId / 3) * 3 + Math.floor(tileId / 3);
        board[row][column] = val;
        setBoard(deepCopy(board)); //setboard is laggy for some reason
        checkBoard(false);
    };
    return (
        <div className={clsx(classes.root)}>
            <Container className={classes.container}>
                <ButtonGroup id="buttongroup">
                    <Button onClick={checkBoard}> Check Board </Button>
                    <Button onClick={clearBoard}> Clear Board </Button>
                </ButtonGroup>
            </Container>
            <div className={clsx(classes.row)}>
                <Square
                    handleClick={handleTileClick}
                    squareId={0}
                    vals={getSquare(0)}
                />
                <Divider orientation="vertical" style={{ height: "auto" }} />
                <Square
                    handleClick={handleTileClick}
                    squareId={1}
                    vals={getSquare(1)}
                />
                <Divider orientation="vertical" style={{ height: "auto" }} />
                <Square
                    handleClick={handleTileClick}
                    squareId={2}
                    vals={getSquare(2)}
                />
            </div>
            <Divider style={{ width: "auto" }} />
            <div className={clsx(classes.row)}>
                <Square
                    handleClick={handleTileClick}
                    squareId={3}
                    vals={getSquare(3)}
                />
                <Divider orientation="vertical" style={{ height: "auto" }} />
                <Square
                    handleClick={handleTileClick}
                    squareId={4}
                    vals={getSquare(4)}
                />
                <Divider orientation="vertical" style={{ height: "auto" }} />
                <Square
                    handleClick={handleTileClick}
                    squareId={5}
                    vals={getSquare(5)}
                />
            </div>
            <Divider style={{ width: "auto" }} />
            <div className={clsx(classes.row)}>
                <Square
                    handleClick={handleTileClick}
                    squareId={6}
                    vals={getSquare(6)}
                />
                <Divider orientation="vertical" style={{ height: "auto" }} />
                <Square
                    handleClick={handleTileClick}
                    squareId={7}
                    vals={getSquare(7)}
                />
                <Divider orientation="vertical" style={{ height: "auto" }} />
                <Square
                    handleClick={handleTileClick}
                    squareId={8}
                    vals={getSquare(8)}
                />
            </div>
        </div>
    );
}

Board.displayName = "Board";
export default Board;
