import firebase from "firebase/app";
import {useState} from "react";

const tts = firebase.functions().httpsCallable('tts');

const callTtS = (text) =>     new Promise((resolve, reject) => {
        tts({text: text, language: 'en'})
            .then(result => result.data)
            .then(data => resolve(data))
            .catch(reject)
        ;
    });



export const textToSpeech = ({text}) => {
    const [loading, setLoading] = useState(null);
    const [audioUrl, setAudioUrl] = useState(null);

    const startAsync = () => {
        setLoading(true);
        callTtS(text).then(result => setAudioUrl(result));
    }

}