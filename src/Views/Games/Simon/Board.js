import PropTypes from "prop-types";
import React, { useCallback, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { getTranslations } from "../../../CloudFunctions/Translate";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        marginTop: 30
    },
    row: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    panel: {
        width: 200,
        height: 200,
        display: "inline-block",
        "&:hover": {
            boxShadow: `0px 0px 0px 3px ${theme.palette.primary.light}`,
        }
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
    },
    active: {
        backgroundColor: theme.palette.primary.light
    },
    center: {
        display: "inline-block",
        position: "absolute",
        width: 200,
        height: 200,
        borderRadius: "100%",
        backgroundColor: "ba000d", //TODO: make on theme
        top: 135,
        left: 540

    }
}));

function Board() {
    const classes = useStyles(Theme);
    const topLeft = document.querySelector('topLeftPanel');
    const topRight = document.querySelector('topRightPanel');
    const bottomLeft = document.querySelector('bottomLeftPanel');
    const bottomRight = document.querySelector('bottomRightPanel');

    function getRandomPanel() {
        const panels = [
            topLeft,
            topRight,
            bottomLeft,
            bottomRight
        ];
        return panels[parseInt(Math.random() * panels.length)];
    };

    const sequence = [getRandomPanel()];
    let sequenceToGuess = [...sequence];

    function flash(panel) {
        return new Promise(resolve => {
            panel.className += classes.active;
            setTimeout(() => {
                panel.className = panel.className.replace(classes.active, '');
                setTimeout(() => {
                    resolve();
                }, 250);
            }, 1000);
        });
    }

    let canClick = false;

    function handlePanelClick(event) {
        panelClicked(event.currentTarget);
    }

    function panelClicked(panelClicked) {
        if(!canClick) return;
        const expectedPanel = sequenceToGuess.shift();
        if (expectedPanel === panelClicked) {
            if (sequenceToGuess.length === 0) {
                //next round
                sequence.push(getRandomPanel());
                sequenceToGuess = [...sequence];
                startFlashing();
            }
        } else {
            // end game
            alert('game over');
        }
    }

    const startFlashing = async() => {
        canClick = false;
        for (const panel of sequence) {
            await flash(panel);
        }
        canClick = true;
    }

    startFlashing();

    return  (
        <div className={clsx(classes.root)}>
            <div className={classes.row}>
                <Button
                    className={classes.panel , classes.topLeftPanel}
                    onClick={handlePanelClick}
                ></Button>
                <Button
                    className={classes.panel , classes.topRightPanel}
                    onClick={handlePanelClick}
                ></Button>
            <div className={classes.row}>
                <Button
                    className={classes.panel , classes.bottomLeftPanel}
                    onClick={handlePanelClick}
                ></Button>
                <Button
                    className={classes.panel , classes.bottomRightPanel}
                    onClick={handlePanelClick}
                ></Button>
            </div>
                <div className={classes.center}></div>
            </div>
        </div>
    )
}

Board.displayName = "Board";
export default Board;