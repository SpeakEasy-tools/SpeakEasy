import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Theme } from "../../../utils";
import Typography from "@material-ui/core/Typography";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import { ExpandMore } from "@material-ui/icons";
import AccordionDetails from "@material-ui/core/AccordionDetails";

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

function Contacts() {
    document.title = "Contact";
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <Accordion className={clsx(classes.section)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="email-control"
                            id="email-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        Email
                                    </Typography>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className={clsx(classes.details)}>
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div className={clsx(classes.pad)}>
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            Jeramey Tyler:{" "}
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="mailto:tylerj2@rpi.edu"
                                            >{`${"tylerj2"}@${"rpi.edu"}`}</a>
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <Accordion className={clsx(classes.section)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="issues-control"
                            id="issues-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        Issues
                                    </Typography>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className={clsx(classes.details)}>
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div className={clsx(classes.pad)}>
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            Issues can be reported on GitHub
                                            here.
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="https://github.com/SpeakEasy-tools/SpeakEasy/issues/new/choose"
                                            >
                                                github.com/SpeakEasy-tools/SpeakEasy/issues
                                            </a>
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <Accordion className={clsx(classes.section)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="issues-control"
                            id="issues-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        Code Repository
                                    </Typography>
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails className={clsx(classes.details)}>
                            <div className={clsx(classes.root)}>
                                <div className={classes.row}>
                                    <div className={clsx(classes.pad)}>
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            Code can be viewed on GitHub here.{" "}
                                            <a
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                href="https://github.com/SpeakEasy-tools"
                                            >
                                                github.com/SpeakEasy-tools
                                            </a>
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

Contacts.displayName = "Contacts";
export default Contacts;
