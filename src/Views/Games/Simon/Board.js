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
        height: "100%",
        width: "100%"
    },
    bottomLeftPanel: {
        borderBottomLeftRadius: 200,
        width: 100,
        backgroundColor: 'red',
        height: 100
    }, 
    bottomRightPanel: {
        borderBottomRightRadius: 200,
        width: 100,
        backgroundColor: 'yellow',
        height: 100
    },
    topLeftPanel: {
        borderTopLeftRadius: 200,
        width: 100,
        backgroundColor: 'blue',
        height: 100
    },
    topRightPanel: {
        borderTopRightRadius: 200,
        width: 100,
        backgroundColor: 'green ',
        height: 100
    }
}));

function Board() {
    
}