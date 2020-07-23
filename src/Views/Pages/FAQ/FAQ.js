import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Theme } from "../../../utils";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import { ExpandMore } from "@material-ui/icons";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import { Link } from "react-router-dom";

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

function FAQ() {
    document.title = "FAQs";
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad, classes.header)}>
                    <ExpansionPanel className={clsx(classes.section)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMore />}
                            aria-controls="who-control"
                            id="who-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        Who is behind SpeakEasy.tools?
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
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            SpeakEasy.tools was designed and
                                            created Jeramey Tyler with
                                            sponsorship from CISL and IBM. See{" "}
                                            <Link to="/about">About</Link> for
                                            more details.
                                        </Typography>
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
                            aria-controls="what-control"
                            id="what-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        What is SpeakEasy.tools?
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
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            SpeakEasy.tools is a data-driven web
                                            application that combines data
                                            science, artificial intelligence,
                                            and gamefulness in an effort to help
                                            people learn a new language and
                                            research new techniques for language
                                            acquisition.
                                        </Typography>
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
                            aria-controls="how-control"
                            id="how-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        How does SpeakEasy.tools work?
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
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            SpeakEasy.tools aims to help people
                                            learn a new language by providing
                                            various ways to practice and receive
                                            feedback. Our goal is to develop new
                                            learning techniques that motivate
                                            the user to learn.
                                        </Typography>
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
                            aria-controls="cost-control"
                            id="cost-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        Does SpeakEasy.tools cost anything?
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
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            No. SpeakEasy.tools is completely
                                            free to use.
                                        </Typography>
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
                            aria-controls="account-control"
                            id="account-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        Do I need an account to use
                                        SpeakEasy.tools?
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
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            You can use SpeakEasy.tools without
                                            an account though you will not be
                                            able to track your progress.
                                        </Typography>
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
                            aria-controls="data-control"
                            id="data-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        What data does SpeakEasy.tools collect
                                        and how do you use?
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
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            SpeakEasy.tools collects data in the
                                            form of telemetries, analytics, and
                                            user interactions (including media
                                            created by tools and game results).
                                            User data is used to track a
                                            user&apos;s progress learning a new
                                            language and is anonymized before
                                            used to research second language
                                            acquisition. Personal data is not
                                            sold or shared in anyway though
                                            anonymized data may be used in
                                            future research or aggregated into
                                            datasets.
                                        </Typography>
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
                            aria-controls="idea-control"
                            id="idea-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        I have an idea SpeakEasy.tools, who do I
                                        talk to?
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
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            We would love to hear any ideas or
                                            suggestions you may have. See the{" "}
                                            <Link to="/contacts">contacts</Link>{" "}
                                            page for more details.
                                        </Typography>
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
                            aria-controls="contribute-control"
                            id="contribute-header"
                        >
                            <div className={clsx(classes.row)}>
                                <div className={clsx(classes.pad)}>
                                    <Typography variant="h4" color="primary">
                                        Can I contribute to SpeakEasy.tools?
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
                                        <Typography
                                            variant="subtitle1"
                                            color="primary"
                                            align="justify"
                                        >
                                            Absolutely. SpeakEasy.tools is an
                                            open-source project hosted on
                                            GitHub. You are welcome to create a
                                            pull request or you can contact us
                                            through either GitHub or the email
                                            address on the{" "}
                                            <Link to="/contacts">contacts</Link>{" "}
                                            page.
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </div>
        </div>
    );
}

FAQ.displayName = "FAQ";
export default FAQ;
