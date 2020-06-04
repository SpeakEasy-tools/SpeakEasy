import React, {useEffect, useState} from "react";
import firebase from "firebase";
import {makeStyles} from "@material-ui/core/styles";
import {Theme} from "../utils";
import clsx from "clsx";
import {CircularProgress, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Clear} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";


const tts = firebase.functions().httpsCallable('tts');
const voices = firebase.functions().httpsCallable('getVoices');
const storageRef = firebase.storage().ref();

const useStyles = makeStyles(theme => ({
    root: {}
}));

export const getVoices = () => {
    const result = {};
    new Promise(() => voices()
        .then(result => console.log(result.data))
    );
    return (
        <>
        </>
    )
}

export default () => {
    const classes = useStyles(Theme);
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState('');
    const [loading, setLoading] = useState(false);


    const handleChange = e => {
        setText(e.target.value);
    };
    const handleClick = () => {
        if (!(Boolean(text) && ((typeof text) === 'string'))) return;
        setLoading(true);
        new Promise(() =>
            tts({text: text, language: 'cmn'})
                .then(results => results.data)
                .then(data => data['filename'])
                .then(base64 => storageRef.child(base64).getDownloadURL())
                .then(url => setAudioUrl(url))
                .finally(() => setLoading(false))
        );
    };
    const handleClear = () => {
        setText('');
    };

    useEffect(() => {
        if (!(audioUrl)) return;
        console.log(audioUrl)
        setLoading(false);
    }, [audioUrl]);

    return (
        <div className={clsx(classes.root)}>
            <div>
                <TextField
                    placeholder='Text to Synthesize'
                    onChange={handleChange}
                    value={text}
                />

                <IconButton
                    disabled={!Boolean(text) || loading}
                    onClick={handleClear}>
                    <Clear/>
                </IconButton>
                <Button
                    disabled={!Boolean(text) || loading}
                    onClick={handleClick}
                >
                    Synthesize
                </Button>
            </div>
            <div>
                {loading && (
                    <CircularProgress/>
                )}
            </div>
            {Boolean(audioUrl) && (
                <audio controls src={audioUrl}/>
            )}
        </div>
    )
}

