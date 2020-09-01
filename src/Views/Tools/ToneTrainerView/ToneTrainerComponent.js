import PropTypes from "prop-types";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import PracticePanel from "./PracticePanel";
import GraphPanel from "./GraphPanel";

const useStyles = makeStyles(theme => ({
    root: {
        flex: "1 1 100%",
        width: "100%",
        height: "100%",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.main
    },
    column: {
        flex: 1,
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "column noWrap",
        overflow: "hidden",
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.light
    },
    row: {
        width: "auto",
        height: "auto",
        display: "flex",
        flexFlow: "row noWrap",
        overflow: "hidden",
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        borderRadius: 10,
        backgroundColor: theme.palette.secondary.dark,
        justifyContent: "center",
        alignItems: "center"
    },
    pad: {
        margin: theme.spacing(1),
        padding: theme.spacing(1)
    },
    button: {
        backgroundColor: theme.palette.primary.main
    },
    icon: {
        color: theme.palette.primary.main
    }
}));

function ToneTrainerComponent({ sample }) {
    const classes = useStyles(Theme);

    const [attempt, setAttempt] = useState(null);

    return (
        <div className={clsx(classes.root)}>
            <div
                className={clsx(classes.row)}
                style={{
                    flex: "1 1 100%"
                }}
            >
                <div
                    className={clsx(classes.column)}
                    style={{
                        width: "auto",
                        height: "100%",
                        maxWidth: "30%",
                        margin: Theme.spacing(1),
                        padding: Theme.spacing(1)
                    }}
                >
                    <PracticePanel sample={sample} attempt={setAttempt} />
                </div>
                <div
                    className={clsx(classes.column)}
                    style={{
                        width: "auto",
                        height: "100%",
                        maxWidth: "70%",
                        margin: Theme.spacing(1),
                        padding: Theme.spacing(1)
                    }}
                >
                    <GraphPanel
                        example={sample}
                        attempt={attempt ? attempt : {}}
                    />
                </div>
            </div>
        </div>
    );
}

ToneTrainerComponent.displayName = "ToneTrainerComponent";
ToneTrainerComponent.propTypes = {
    sample: PropTypes.object.isRequired
};
export default ToneTrainerComponent;
