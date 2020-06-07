import firebase from "firebase";

const Synthesize = firebase.functions().httpsCallable("synthesize");
const Voices = firebase.functions().httpsCallable("voices");
const storageRef = firebase.storage().ref();

export async function synthesizeSpeech(text, language) {
    return await Promise.resolve(
        Synthesize({ text: text, languageCode: language })
            .then(res => storageRef.child(res.data))
            .then(child => child.getDownloadURL())
    );
}

export function getVoices() {
    const results = {};
    new Promise(() =>
        Voices()
            .then(result => result.data)
            .then(data => data[0])
            .then(d => d["voices"])
            .then(vs => (results["voices"] = vs))
    );

    return results;
}
