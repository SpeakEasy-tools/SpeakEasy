import firebase from "firebase";

const storage = firebase.storage();
const UploadAudioAttempt = firebase
    .functions()
    .httpsCallable("uploadAudioAttempt");
const DownloadAudioAttempts = firebase
    .functions()
    .httpsCallable("downloadAudioAttempts");

export async function uploadAttempt(userId, language, transcript, blob) {
    return await Promise.resolve(
        UploadAudioAttempt({
            userId: userId,
            language: language,
            url: blob,
            transcript: transcript
        })
            .then(res => res.data)
            .then(path =>
                storage
                    .ref()
                    .child(path)
                    .getDownloadURL()
            )
    );
}

export async function getAttempts(language, transcript, userId) {
    return await Promise.resolve(
        DownloadAudioAttempts({
            userId: userId,
            language: language.code,
            transcript: transcript
        })
            .then(res => res.data)
            .catch(e => e.message)
    );
}
