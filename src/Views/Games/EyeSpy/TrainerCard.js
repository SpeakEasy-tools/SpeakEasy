import PropType from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { Card } from "../../../Components/Card";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, Fab } from "@material-ui/core";
import { RecordVoiceOver } from "@material-ui/icons";
// import { v4 as uuid } from "uuid";

import ToneTrainerComponent from "../../Tools/ToneTrainerView/ToneTrainerComponent";
import { TextToSpeech } from "../../../CloudFunctions";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    },
    content: {
        width: "100%",
        display: "flex",
        flexFlow: "column noWrap"
    },
    column: {
        flex: "1 1 100%",
        display: "flex",
        flexFlow: "column noWrap",
        justifyContent: "space-around",
        alignItems: "center"
    },
    pad: {
        padding: theme.spacing(1)
    },
    trainerCard: {
        width: "auto",
        position: "fixed",
        zIndex: 102,
        bottom: theme.spacing(8),
        marginLeft: theme.spacing(15),
        marginRight: theme.spacing(15)
    },
    trainerFab: {
        position: "fixed",
        zIndex: 102,
        bottom: theme.spacing(8),
        right: theme.spacing(4),
        color: theme.palette.secondary.main
    },
    lightIcon: {
        color: "white"
    },
    lightIconDisabled: {
        color: "grey"
    }
}));

function TrainerCard({ language, trainerText }) {
    const classes = useStyles(Theme);

    const [trainerSample, setTrainerSample] = useState({});

    const [trainerLoading, setTrainerLoading] = useState(false);
    const [trainerOpen, setTrainerOpen] = useState(false);

    useEffect(() => {
        setTrainerOpen(Boolean(trainerText.length));
        trainerText.length && handleTrainerWord();
    }, [trainerText]);

    async function handleTrainerWord() {
        setTrainerLoading(true);
        return await Promise.resolve(TextToSpeech(trainerText, language))
            .then(s => setTrainerSample(s))
            .finally(() => setTrainerLoading(false));
    }

    return (
        <>
            {trainerOpen && (
                <div className={clsx(classes.trainerCard)}>
                    <Card
                        stayOpen
                        darkMode
                        title={() => (
                            <div className={clsx(classes.content)}>
                                <div className={clsx(classes.column)}>
                                    <div className={clsx(classes.pad)}>
                                        <Typography variant="h6">
                                            {"Tone Trainer"}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        )}
                        body={() =>
                            trainerLoading ? (
                                <div className={clsx(classes.row)}>
                                    <div className={clsx(classes.pad)}>
                                        <CircularProgress color="secondary" />
                                    </div>
                                </div>
                            ) : (
                                <div className={clsx(classes.pad)}>
                                    <ToneTrainerComponent
                                        sample={trainerSample}
                                    />
                                </div>
                            )
                        }
                    />
                </div>
            )}
            <Fab
                className={clsx(classes.trainerFab)}
                disabled={!trainerText.length}
                onClick={() => {
                    setTrainerOpen(!trainerOpen);
                }} //open ? handleClose : handleOpen}}
                color="primary"
            >
                <RecordVoiceOver
                    className={clsx({
                        [classes.lightIcon]: trainerText.length,
                        [classes.lightIconDisabled]: !trainerText.length
                    })}
                />
            </Fab>
        </>
    );
}

TrainerCard.displayName = "TrainerCard";
TrainerCard.propTypes = {
    trainerText: PropType.any,
    language: PropType.any
};
export default TrainerCard;
