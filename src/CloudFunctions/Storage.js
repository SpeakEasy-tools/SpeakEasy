import firebase from "firebase";

const storage = firebase.storage();

const profilePath = uid => `users/${uid}/profile.json`;

export async function fetchProfile(uid) {
    async function onResolve(foundUrl) {
        const profile = {};
        await Promise.resolve(
            fetch(foundUrl)
                .then(res => res.json())
                .then(json => (profile["json"] = json))
        );

        return profile["json"];
    }

    async function onReject(error) {
        if (error.code === "storage/object-not-found") {
            const newProfile = await updateProfile({ userId: uid });
            console.log(newProfile);
        }
    }

    const userProfile = {};
    await storage
        .ref()
        .child(profilePath(uid))
        .getDownloadURL()
        .then(onResolve, onReject)
        .then(json => (userProfile["json"] = json));
    return userProfile["json"];
}

export async function updateProfile(newProfile) {
    const uid = newProfile["userId"];
    const blob = new Blob([JSON.stringify(newProfile, null, 2)], {
        type: "application/json"
    });

    const profile = {};
    await storage
        .ref()
        .child(profilePath(uid))
        .put(blob)
        .then(res =>
            storage
                .ref()
                .child(res["metadata"]["fullPath"])
                .getDownloadURL()
        )
        .then(url =>
            fetch(url)
                .then(res => res.json())
                .then(json => (profile["json"] = json))
        );

    return profile["json"];
}
