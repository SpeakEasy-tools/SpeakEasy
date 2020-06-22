import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Theme } from "../../../utils";
import { Divider, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "auto"
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

function Help() {
    document.title = "Help";
    const classes = useStyles(Theme);
    const headers = ["LOGIN", "GAMES", "SETTINGS", "MISC"];

    const output = (headerContent, bodyContent, index) => (
        <div className={clsx(classes.pad)} key={index}>
            <Typography color="secondary" variant="h2">
                {headerContent}
            </Typography>
            <Divider />
            <Typography color="secondary"> {bodyContent} </Typography>
        </div>
    );

    const loginInfo =
        "Under the person icon on the left menu, you can find the login options. By logging in we are able to keep track of any progress you make through the games and tailor the experience to you over time. Login can be done through Google, Github, or any email.";

    const gamesInfo =
        "Under the dice block icon on the left menu, you can find all of the games. Currently available games are 2048, Eye Spy, and Tile Slider. 2048 will steadily change from numbers to your chosen language of study as you play. [EYE SPY INFO]. [TILE SLIDER INFO].";

    const settingInfo =
        "Under the wrench icon, you can find the settings and tools. The Dictionary can be used to search in Mandarin as of now. Flashcards can be used to review and study any material used throughout SpeakEasy. Pop Quiz allows you to test yourself further on what you have learned so far. Tone Trainer can help you practice pitch accent in Mandarin.";

    const miscInfo =
        "Under the three dots icon on the left menu, you can find miscelaneous project information. Here you can find the About, contact information, FAQ, and Help pages.";

    return (
        <div className={clsx(classes.root)}>
            {output(headers[0], loginInfo, 0)}
            {output(headers[1], gamesInfo, 1)}
            {output(headers[2], settingInfo, 2)}
            {output(headers[3], miscInfo, 3)}
        </div>
    );
}

Help.displayName = "Help";
export default Help;
