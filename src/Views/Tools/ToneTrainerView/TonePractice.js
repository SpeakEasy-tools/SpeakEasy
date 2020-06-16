import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Theme } from "../../../utils";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import { PlayArrow } from "@material-ui/icons";
import { Recorder } from "../../../Components";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%",
        height: "100%"
    },
    row: {
        flex: "1 1 100%",
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center"
    },
    pad: {
        margin: theme.spacing(1)
    }
}));

function TonePractice({ display }) {
    const classes = useStyles(Theme);
    const [audioUrl, setAudioUrl] = useState();
    const [samples, setSamples] = useState([]);
    const [checked, setChecked] = useState(-1);

    function handlePlay(index) {
        const audio = new Audio();
        audio.src = samples[index];
        audio.play();
    }
    useEffect(() => {
        if (audioUrl) {
            setSamples(prevState => [...prevState, audioUrl]);
        }
    }, [audioUrl]);

    useEffect(() => {
        if (checked > -1) {
            display(samples[checked]);
        } else {
            display();
        }
    }, [checked, display, samples]);

    return (
        <div className={clsx(classes.root)}>
            <div className={clsx(classes.row)}>
                <div className={clsx(classes.pad)}>
                    <Typography variant="h4" color="secondary">
                        Your attempts
                    </Typography>
                    <Divider />
                </div>
            </div>
            <List style={{ backgroundColor: Theme.palette.primary.dark }}>
                <ListItem>
                    <ListItemIcon>
                        <Recorder url={setAudioUrl} />
                    </ListItemIcon>
                    <ListItemText primary="Practice" />
                </ListItem>
                {samples &&
                    samples.map((a, i) => (
                        <ListItem key={i}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked === i}
                                    tabIndex={-1}
                                    disableRipple
                                    onChange={() =>
                                        setChecked(prevState =>
                                            prevState === i ? -1 : i
                                        )
                                    }
                                />
                            </ListItemIcon>
                            <ListItemText primary={`Attempt #${i + 1}`} />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    aria-label="play-audio"
                                    onClick={() => handlePlay(i)}
                                >
                                    <PlayArrow />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
            </List>
        </div>
    );
}

TonePractice.displayName = "TonePractice";
TonePractice.propTypes = {
    display: PropTypes.func.isRequired
};
export default TonePractice;
