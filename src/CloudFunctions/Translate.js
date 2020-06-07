import firebase from "firebase";

const DetectLanguage = firebase.functions().httpsCallable("detectLanguage");
const ListLanguages = firebase.functions().httpsCallable("listLanguages");
const Translate = firebase.functions().httpsCallable("translate");

export function detectLanguage(text) {
    const results = {};
    new Promise(() =>
        DetectLanguage({ text: text })
            .then(result => result.data)
            .then(data => (results["languages"] = data))
    );
    return results;
}

export async function listLanguages() {
    return await Promise.resolve(
        ListLanguages()
            .then(res => res.data)
            .then(data => data[0])
    );
}

export function translate(text, target) {
    const results = {};
    new Promise(() =>
        Translate({ text: text, target: target })
            .then(result => result.data)
            .then(data => data[0])
            .then(d => (results["translation"] = d))
    );

    return results;
}
