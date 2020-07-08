import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Theme } from "../../../utils";
import { Typography } from "@material-ui/core";

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

function Page404() {
    document.title = "404";
    const classes = useStyles(Theme);

    return (
        <div className={clsx(classes.pad)}>
            <Typography color="secondary" variant="h4">
                Sorry, the page you were looking for couldn&#39;t be found.
            </Typography>
        </div>
    );
}

Page404.displayName = "404";
export default Page404;
