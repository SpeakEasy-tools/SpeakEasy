import PropType from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import { Card } from "../../../Components/Card";
import Typography from "@material-ui/core/Typography";
import { Fab, IconButton } from "@material-ui/core";
import { ArrowBack, ArrowForward, Done, Subtitles } from "@material-ui/icons";
import { v4 as uuid } from "uuid";

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
    narratationCard: {
        width: "auto",
        position: "fixed",
        bottom: theme.spacing(8),
        marginLeft: theme.spacing(15),
        marginRight: theme.spacing(4)
    },
    narrativeFab: {
        position: "fixed",
        zIndex: 102,
        bottom: theme.spacing(8),
        marginLeft: theme.spacing(4),
        color: theme.palette.secondary.main
    },
    lightIcon: {
        color: "white"
    },
    lightIconDisabled: {
        color: "grey"
    }
}));

function NarrativeCard({ narrative }) {
    const classes = useStyles(Theme);

    const [open, setOpen] = useState(false);
    const [narrativeIndex, setNarrativeIndex] = useState(0);

    useEffect(() => {
        setOpen(true);
    }, [narrative]);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setNarrativeIndex(0);
    };

    const createNarration = () => {
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

    return (
        <>
            {open && narrative.length && (
                <div key={uuid()} className={clsx(classes.narratationCard)}>
                    <Card body={createNarration} darkMode stayOpen />
                </div>
            )}
            <Fab
                className={clsx(classes.narrativeFab)}
                disabled={!(narrative.length || open)}
                onClick={open ? handleClose : handleOpen}
                color="primary"
            >
                <Subtitles
                    className={clsx({
                        [classes.lightIcon]: narrative.length,
                        [classes.lightIconDisabled]: !narrative.length
                    })}
                />
            </Fab>
        </>
    );
}
NarrativeCard.displayName = "NarrativeCard";
NarrativeCard.propTypes = {
    narrative: PropType.any
};
export default NarrativeCard;
