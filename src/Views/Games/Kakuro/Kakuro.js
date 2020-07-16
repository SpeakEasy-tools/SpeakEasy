import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Board from "./Board";
import Instructions from "./Instructions";
import { ControlBar } from "../../../Components";

const useStyles = makeStyles(theme => ({
	root: {
		height: "100%",
		display: "flex",
		flexFlow: "row wrap"
	},
	row: {
		flex: "1 1 100%"
	},
	column: {},
	content: {},
	pad: {
		margin: theme.spacing(1),
		flex: "1 1 100px"
	}
}));

function Kakuro() {
    document.title = "Kakuro";
    const classes = useStyles(Theme);
    const instructions = Instructions();

    const [language, setLanguage] = useState(null);
    const [isAdaptive, setIsAdaptive] = useState(false);
    const [board, setBoard] = useState([]);

    const getInstructions = () => {
        console.log(language, isAdaptive);
        return instructions;
    };

    function getBoard(difficulty) {
        //just take from simon for now
        fetch("api.speakeasy.services/sudoku?difficulty=" + difficulty, {
            method: "POST"
        }).then(response => {
            if (response.ok) {
                response.json().then(json => {
                    setBoard(json);
                    return json;
                });
            }
        });
    }
}

Kakuro.displayName = "Kakuro";
export default Kakuro;
