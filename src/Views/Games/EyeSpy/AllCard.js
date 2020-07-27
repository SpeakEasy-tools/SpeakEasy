import PropType from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { Card } from "../../../Components/Card";
import Typography from "@material-ui/core/Typography";
import { CircularProgress, Fab, IconButton } from "@material-ui/core";
import {
    ArrowBack,
    ArrowForward,
    Done,
    RecordVoiceOver,
    Subtitles,
    CreditCard
} from "@material-ui/icons";
import { v4 as uuid } from "uuid";

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
    card: {
        width: "auto",
        position: "fixed",
        zIndex: 102,
        marginLeft: theme.spacing(15)
    },
    fab: {
        position: "fixed",
        zIndex: 102,
        color: theme.palette.secondary.main
    },
    narratationCard: {
        bottom: theme.spacing(8),
        marginRight: theme.spacing(4)
    },
    narrativeFab: {
        bottom: theme.spacing(8),
        marginLeft: theme.spacing(4)
    },
    trainerCard: {
        bottom: theme.spacing(8),
        marginRight: theme.spacing(15)
    },
    trainerFab: {
        bottom: theme.spacing(8),
        right: theme.spacing(4)
    },
    poiCard: {
        top: theme.spacing(8),
        marginRight: theme.spacing(15)
    },
    poiFab: {
        top: theme.spacing(8),
        right: theme.spacing(4)
    },
    lightIcon: {
        color: "white"
    },
    lightIconDisabled: {
        color: "grey"
    }
}));

function AllCard({ narrative, language, trainerText, currentPoi }) {
    const classes = useStyles(Theme);
    // const { type, title, body } = currentPoi;
    const { title } = currentPoi;

    const [open, setOpen] = useState(false);
    const [narrativeIndex, setNarrativeIndex] = useState(0);

    const [trainerSample, setTrainerSample] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setOpen(true);
    }, [narrative, trainerSample, currentPoi]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setNarrativeIndex(0);
    };

    useEffect(() => {
        // title = "Tone Trainer";
        setOpen(Boolean(trainerText.length));
        trainerText.length && handleTrainerWord();
    }, [trainerText, handleTrainerWord]);

    async function handleTrainerWord() {
        setLoading(true);
        return await Promise.resolve(TextToSpeech(trainerText, language))
            .then(s => setTrainerSample(s))
            .finally(() => setLoading(false));
    }

    const getTrainer = () => {
        return (
            <div className={clsx(classes.pad)}>
                <ToneTrainerComponent sample={trainerSample} />
            </div>
        );
    };

    const getNarrative = () => {
        return (
            <div className={clsx(classes.pad)}>
                <Typography variant="h6">
                    {narrative[narrativeIndex]}
                </Typography>
                <IconButton
                    disabled={!narrative[narrativeIndex - 1]}
                    onClick={() => {
                        setNarrativeIndex(prevState => prevState - 1);
                    }}
                >
                    <ArrowBack
                        className={clsx({
                            [classes.lightIcon]: narrative[narrativeIndex - 1],
                            [classes.lightIconDisabled]: !narrative[
                                narrativeIndex - 1
                            ]
                        })}
                    />
                </IconButton>
                <IconButton
                    disabled={!narrative[narrativeIndex + 1]}
                    onClick={() => {
                        setNarrativeIndex(prevState => prevState + 1);
                    }}
                >
                    <ArrowForward
                        className={clsx({
                            [classes.lightIcon]: narrative[narrativeIndex + 1],
                            [classes.lightIconDisabled]: !narrative[
                                narrativeIndex + 1
                            ]
                        })}
                    />
                </IconButton>
                <IconButton
                    disabled={Boolean(narrative[narrativeIndex + 1])}
                    onClick={handleClose}
                >
                    <Done
                        className={clsx({
                            [classes.lightIcon]: !narrative[narrativeIndex + 1],
                            [classes.lightIconDisabled]:
                                narrative[narrativeIndex + 1]
                        })}
                    />
                </IconButton>
            </div>
        );
    };

    const getTitle = () => {
        return (
            title && (
                <div className={clsx(classes.content)}>
                    <div className={clsx(classes.column)}>
                        <div className={clsx(classes.pad)}>
                            <Typography
                                style={{
                                    marginRight: "36px",
                                    marginLeft: "36px"
                                }}
                                variant="h6"
                            >
                                {title}
                            </Typography>
                        </div>
                    </div>
                </div>
            )
        );
    };

    const getBody = () => {
        return (
            <>
                {loading ? (
                    <div className={clsx(classes.row)}>
                        <div className={clsx(classes.pad)}>
                            <CircularProgress color="secondary" />
                        </div>
                    </div>
                ) : (
                    (trainerSample && getTrainer())(narrative && getNarrative())
                )
                //  (currentPoi && getPoi())
                }
            </>
        );
    };

    return (
        <>
            {open &&
                (narrative || trainerSample || currentPoi)(
                    <div
                        key={uuid()}
                        className={clsx(classes.card, {
                            [classes.narrativeCard]: narrative,
                            [classes.trainerCard]: trainerText,
                            [classes.poiCard]: currentPoi
                        })}
                    >
                        <Card
                            darkMode
                            stayOpen={narrative || trainerSample}
                            title={getTitle}
                            body={getBody}
                        />
                    </div>
                )}
            <Fab
                className={clsx(classes.fab, {
                    [classes.narrativeFab]: narrative,
                    [classes.trainerFab]: trainerText,
                    [classes.poiFab]: currentPoi
                })}
                disabled={!(narrative || trainerSample || currentPoi)}
                onClick={open ? handleClose : handleOpen}
                color={
                    !(narrative || trainerSample || currentPoi)
                        ? "secondary"
                        : "primary"
                }
            >
                {narrative && (
                    <Subtitles
                    // className={clsx({
                    //     [classes.lightIcon]: narrative.length,
                    //     [classes.lightIconDisabled]: !narrative.length
                    // })}
                    />
                )}
                {trainerText && (
                    <RecordVoiceOver
                    // className={clsx({
                    //     [classes.lightIcon]: trainerText.length,
                    //     [classes.lightIconDisabled]: !trainerText.length
                    // })}
                    />
                )}
                {currentPoi && (
                    <CreditCard
                    // className={clsx({
                    //     [classes.lightIcon]: currentPoi.length,
                    //     [classes.lightIconDisabled]: !currentPoi.length
                    // })}
                    />
                )}
            </Fab>
        </>
    );
}
AllCard.displayName = "AllCard";
AllCard.propTypes = {
    narrative: PropType.any,
    language: PropType.any,
    trainerText: PropType.any,
    currentPoi: PropType.any
};
export default AllCard;
