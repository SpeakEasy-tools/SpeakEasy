function Recorder() {
    async function getMedia(contraints) {
        let mediaRecorder = null;
        navigator.mediaDevices
            .getUserMedia(contraints)
            .then(function(stream) {
                mediaRecorder = new MediaRecorder(stream);
            })
            .catch(console.error);
        return mediaRecorder;
    }

    const recorder = getMedia({ audio: true });
    let chunks = [];
    recorder.onstop = function() {
        console.log("on stop");
        const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
        chunks = [];
        const audioUrl = URL.createObjectURL(blob);
        console.log(audioUrl);
    };
    recorder.ondataavailable = function(e) {
        console.log("data available");
        chunks.push(e.data);
    };
}

Recorder.displayName = "Recorder";
export default Recorder;
