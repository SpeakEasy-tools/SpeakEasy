import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Theme } from "../../../utils";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Link from "@material-ui/core/Link";

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

function Contacts() {
    document.title = "Contact";
    const classes = useStyles(Theme);

    const headers = ["Email Researchers", "Report Issues", "View Code"];
    const content = [
        <>
            Jeramey Tyler:{" "}
            <Link href="mailto:jerameyatyler@gmail.com" color="initial" key={0}>
                jerameyatyler@gmail.com{" "}
            </Link>{" "}
        </>,
        <Link
            href="https://github.com/SpeakEasy-tools/SpeakEasy/issues/new/choose"
            color="initial"
            key={1}
        >
            Issues can be reported on GitHub here.
        </Link>,
        <Link
            href="https://github.com/SpeakEasy-tools"
            color="initial"
            key={2}
            display="inline"
        >
            Code can be viewed on GitHub here.{" "}
        </Link>
    ];

    const output = (headerContent, bodyContent, index) => (
        <div className={clsx(classes.pad)} key={index}>
            <Typography color="secondary" variant="h2">
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

Contacts.displayName = "Contacts";
export default Contacts;
