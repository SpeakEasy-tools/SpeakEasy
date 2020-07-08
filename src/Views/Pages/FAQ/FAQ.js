import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Theme } from "../../../utils";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap",
        overflowY: "scroll"
    },
    row: {
        flex: "1 1 100%"
    },
    column: {},
    content: {},
    header: {
        width: "100%",
        textAlign: "center",
        verticalAlign: "text-top"
    },
    pad: {
        margin: theme.spacing(1),
        flex: "1 1 100px"
    }
}));

function FAQ() {
    document.title = "FAQs";
    const classes = useStyles(Theme);

    const headers = [
        "What is SpeakEasy.tools?",
        "Why is it better than traditional language learning?",
        "How do I create a profile?",
        "I created a profile, now how do I start learning?",
        "Do I have to make a profile to use SpeakEasy.tools?"
    ];
    const content = [
        "SpeakEasy.tools is a data-driven web application for helping people learn a second language through artificial intelligence, data science, immersion, and gamification.",
        "SpeakEasy.tools has a portable and unique combination of tone training, fun and educational games, and informative progress tracking allows you to learn to read a language faster and learn more accurate pronunciation than the average language learning program.",
        "To create a profile, click the profile icon to open up the sign in menu and select your preferred sign in method. Currently supported sign in methonds are email, Google, and GitHub.",
        "To start learning, select one of the games or tools from the menu on the left. The tools include things like a dictionary, flashcards, tone trainer, and pop quizes, while the games include 2048, Eye Spy, Sudoku, Memory, and Tile Slider.",
        "No, but wihtout a profle your experience will not be tailored to you over time and you won't be able to keep track of your progress."
    ];

    const output = (headerContent, bodyContent, index) => (
        <div className={clsx(classes.pad)} key={index}>
            <Typography color="secondary" variant="h4">
                {headerContent}
            </Typography>
            <Divider />
            <Typography
                color="secondary"
                align="justify"
                paragraph
                gutterBottom
                className={clsx(classes.pad)}
            >
                {bodyContent}
            </Typography>
        </div>
    );

    return (
        <div className={clsx(classes.root)}>
            {headers.map((h, index) => output(h, content[index], index))}
        </div>
    );
}

FAQ.displayName = "FAQ";
export default FAQ;
