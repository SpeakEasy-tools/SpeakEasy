import firebase from "firebase";
import { translate } from "./Translate";

const Synthesize = firebase.functions().httpsCallable("synthesize");
const Voices = firebase.functions().httpsCallable("voices");
const storageRef = firebase.storage().ref();

export async function synthesizeSpeech(text, language) {
    return await Promise.resolve(
        Synthesize({ text: text, languageCode: language })
            .then(r => {
                if (r.data.includes("INVALID")) {
                    return "";
                } else {
                    return storageRef.child(r.data).getDownloadURL();
                }
            })
            .catch(() => "404")
    );
}

export async function getVoices() {
    return await Promise.resolve(
        Voices()
            .then(result => result.data)
            .then(data => data[0])
            .then(d => d["voices"])
    );
}

async function TextToSpeech(text, language) {
    const { translation } = await Promise.resolve(
        translate(text, language.code)
    );
    const synth = await Promise.resolve(
        synthesizeSpeech(translation, language.code).catch(console.error)
    ).catch(console.error);
    return {
        text: text,
        language: { ...language },
        translation: translation,
        audioUrl: synth
    };
}

TextToSpeech.displayName = "TextToSpeech";
export default TextToSpeech;
