import firebase from "firebase";

const storage = firebase.storage();
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
            .then(path =>
                storage
                    .ref()
                    .child(path)
                    .getDownloadURL()
            )
            .then(url => fetch(url).then(response => response.json()))
            .catch(e => e.message)
    );
}

export async function translate(text, target) {
    return await Promise.resolve(
        Translate({ text: text, target: target })
            .then(result => storage.ref().child(result.data))
            .then(child => child.getDownloadURL())
            .then(url => fetch(url).then(response => response.json()))
            .catch(e => e.message)
    );
}

export async function getTranslations(transcripts, language) {
    return await Promise.all(transcripts.map(t => translate(t, language)));
}
