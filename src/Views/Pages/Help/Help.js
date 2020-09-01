import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Theme } from "../../../utils";
import { Typography } from "@material-ui/core";
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
        backgroundColor: theme.palette.secondary.light,
        border: `5px solid ${theme.palette.secondary.main}`
    },
    logo: {
        maxWidth: "200px",
        maxHeight: "60px"
    },
    header: {
        width: "100%"
    }
}));

function Help() {
    document.title = "Help";
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <Accordion className={clsx(classes.section)}>
                        <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="create-account-control"
                            id="create-account-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        How do I create an account?
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
                                            To create an account, click the
                                            button that says
                                            &ldquo;Sign-In&rdquo; in the upper
                                            left-hand corner. If you have an
                                            existing Gmail, Twitter, or GitHub
                                            account you can sign-in using it. If
                                            you would like to create an account
                                            using an email address press the
                                            button that says &ldquo;Sign in with
                                            Email&rdquo;
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
                            aria-controls="sign-in-control"
                            id="sign-in-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        How do I sign-in?
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
                                            To sign-in to an account, click the
                                            button that says
                                            &ldquo;Sign-In&rdquo; in the upper
                                            left-hand corner. Next press the
                                            button that matches your sign-in
                                            method.
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
                            aria-controls="language-control"
                            id="language-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        How do I change the language?
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
                                            To change languages, locate the
                                            language selection box in the top
                                            bar and press the downward pointing
                                            arrow. Now select the desired
                                            language from the list. This
                                            language is used across
                                            SpeakEasy.tools and can be changed
                                            at anytime. Your progress from one
                                            language will not carry over to
                                            another language.
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
                            aria-controls="settings-control"
                            id="settings-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        How do I change a game&apos;s settings?
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
                                            To change a games settings menu,
                                            locate and press the settings gear
                                            towards the upper left-hand side of
                                            the page, note that not all games
                                            have a settings gear.
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

Help.displayName = "Help";
export default Help;
