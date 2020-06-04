import firebase from "firebase/app";
import {useEffect, useState} from "react";

export async function StT(file) {
    const [text, setText] = useState(null);
    useEffect(() => {console.log(file, text)})
    const stt = await firebase.functions().httpsCallable('stt');
    stt({audio: file})
        .then(result => result.data)
        .then(setText)
        .catch(console.error);

    return text;
}
