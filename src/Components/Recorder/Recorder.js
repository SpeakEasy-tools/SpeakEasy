import PropTypes from "prop-types";
import IconButton from "@material-ui/core/IconButton";
import React, { useEffect, useState } from "react";
import { RecordVoiceOver } from "@material-ui/icons";
import { Theme } from "../../utils";

function Recorder({ url }) {
    const [loading, setLoading] = useState(true);
    const [recording, setRecording] = useState(false);
    const [recorder, setRecorder] = useState();

    useEffect(() => {
        async function getMicrophone() {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            });
            let mediaRecorder = new MediaRecorder(stream);
            let chunks = [];
            mediaRecorder.ondataavailable = function(e) {
                chunks.push(e.data);
            };
            mediaRecorder.onstop = function() {
                const blob = new Blob(chunks, {
                    type: "audio/ogg; codecs=opus"
                });
                chunks = [];
                url(window.URL.createObjectURL(blob));
            };
            setRecorder(mediaRecorder);
        }

        getMicrophone().finally();
    }, [url]);

    useEffect(() => {
        if (recorder) {
            setLoading(false);
        }
    }, [recorder]);
    function toggle() {
        if (recording) {
            handleStop();
        } else {
            handleStart();
        }
    }
    function handleStart() {
        recorder.start();
        setRecording(true);
    }
    function handleStop() {
        recorder.stop();
        setRecording(false);
    }

    return (
        <IconButton
            style={{
                backgroundColor: recording
                    ? Theme.palette.error.main
                    : Theme.palette.secondary.main,
                color: Theme.palette.secondary.contrastText
            }}
            onClick={toggle}
            disabled={loading}
        >
            <RecordVoiceOver />
        </IconButton>
    );
}

Recorder.displayName = "Recorder";
Recorder.propTypes = {
    url: PropTypes.func.isRequired
};
export default Recorder;
