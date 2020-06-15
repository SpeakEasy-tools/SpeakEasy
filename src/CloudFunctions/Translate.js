import firebase from "firebase";

const DetectLanguage = firebase.functions().httpsCallable("detectLanguage");
const ListLanguages = firebase.functions().httpsCallable("listLanguages");
const Translate = firebase.functions().httpsCallable("translate");

export async function detectLanguage(text) {
    return await Promise.resolve(
        DetectLanguage({ text: text }).then(result => result.data)
    );
}

export async function listLanguages() {
    return await Promise.resolve(
        ListLanguages()
            .then(res => res.data)
            .then(data => data[0])
    );
}

export async function translate(text, target) {
    return await Promise.resolve(
        Translate({ text: text, target: target })
            .then(result => result.data)
            .then(data => data[0])
    );
}
