import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Board from "./Board";
import Instructions from "./Instructions";
import { ControlBar } from "../../../Components";
import { Kakuro } from ".";

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

Kakuro.displayName = "Kakuro";
export default Kakuro;
