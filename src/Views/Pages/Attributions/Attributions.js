import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { ExpandMore } from "@material-ui/icons";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "90%",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "auto"
    },
    row: {
        width: "100%",
        display: "flex",
        flexFlow: "row noWrap",
        justifyContent: "start",
        alignItems: "center"
    },
    pad: {
        margin: theme.spacing(1)
    },
    section: {
        backgroundColor: theme.palette.secondary.light,
        width: "100%"
    },
    details: {
        backgroundColor: theme.palette.secondary.main,
        border: `5px solid ${theme.palette.secondary.dark}`
    },
    logo: {
        maxWidth: "200px",
        maxHeight: "60px"
    },
    header: {
        width: "100%"
    }
}));

function Attributions() {
    document.title = "Attributions";
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <ExpansionPanel className={clsx(classes.section)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="translations-control"
                            id="translations-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        Translations
                                    </Typography>
                                </div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={clsx(classes.details)}
                        >
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div className={clsx(classes.pad)}>
                                        <ul>
                                            <li>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Chinese to Pinyin
                                                    translations provided by{" "}
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://www.mdbg.net/chinese/dictionary?page=cedict"
                                                    >
                                                        CC-CEDICT
                                                    </a>
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    All other translations
                                                    provided by {""}
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://cloud.google.com/translate/docs"
                                                    >
                                                        Google Cloud Translation
                                                    </a>
                                                </Typography>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <ExpansionPanel className={clsx(classes.section)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="gp-control"
                            id="gp-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        Grapheme and Phoneme Recognition
                                    </Typography>
                                </div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={clsx(classes.details)}
                        >
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div className={clsx(classes.pad)}>
                                        <ul>
                                            <li>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Grapheme and Phoneme
                                                    recognition are provided by
                                                    the{" "}
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://montreal-forced-aligner.readthedocs.io/en/latest/index.html"
                                                    >
                                                        Montreal Forced Aligner
                                                    </a>
                                                </Typography>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <ExpansionPanel className={clsx(classes.section)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="gp-control"
                            id="gp-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        Images and Annotations
                                    </Typography>
                                </div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={clsx(classes.details)}
                        >
                            <div className={clsx(classes.root)}>
                                <div className={clsx(classes.row)}>
                                    <div className={clsx(classes.pad)}>
                                        <ul>
                                            <li>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Eye-spy images provided by
                                                    the following sources:
                                                </Typography>
                                                <ul>
                                                    <li>
                                                        <a
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            href="https://developers.google.com/streetview"
                                                        >
                                                            Google Street View
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Coco Explorer images,
                                                    captions, and annotations
                                                    provided by the {""}
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://cocodataset.org/#home"
                                                    >
                                                        Coco Dataset
                                                    </a>
                                                </Typography>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <ExpansionPanel className={clsx(classes.section)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="games-control"
                            id="games-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        Games
                                    </Typography>
                                </div>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails
                            className={clsx(classes.details)}
                        >
                            <div className={clsx(classes.root)}>
                                <div className={clsx(classes.row)}>
                                    <div className={clsx(classes.pad)}>
                                        <ul>
                                            <li>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    2048 originally created by{" "}
                                                    {""}
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="https://play2048.co/"
                                                    >
                                                        Gabriele Cirulli
                                                    </a>
                                                </Typography>
                                            </li>
                                            <li>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="primary"
                                                >
                                                    Sudoku originally created by{" "}
                                                    {""}
                                                    <a
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        href="http://www.nikoli.co.jp/en/puzzles/"
                                                    >
                                                        NIKOLI Co,. Ltd.
                                                    </a>
                                                </Typography>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>

            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography variant="h6" color="secondary">
                        The work within SpeakEasy.tools is our own work except
                        where mentioned on this page. Any omissions are purely
                        accidental and we will correct them as soon as we are
                        made aware of them.
                    </Typography>
                </div>
            </div>
        </div>
    );
}

Attributions.displayName = "Attributions";
export default Attributions;
