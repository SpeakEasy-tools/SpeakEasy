import firebase from "firebase";

const RecognizeSpeech = firebase.functions().httpsCallable("recognize");

export function recognizeSpeech(audio) {
    const results = {};
    new Promise(() =>
        RecognizeSpeech({ audioContent: audio })
            .then(result => result.data)
            .then(data => (results["transcript"] = data))
    );
    return results;
}
