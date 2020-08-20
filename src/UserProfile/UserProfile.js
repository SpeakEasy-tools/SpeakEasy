import { useUser } from "../UserProvider";

export function getUserLanguage() {
    const userProfile = UserProfile();
    if (
        userProfile &&
        Boolean(Object.keys(userProfile).length) &&
        userProfile.profile &&
        Boolean(Object.keys(userProfile.profile).length) &&
        userProfile.profile.secondLanguage &&
        Boolean(Object.keys(userProfile.profile.secondLanguage).length)
    ) {
        return userProfile.profile.secondLanguage;
    }
    return null;
}

function UserProfile() {
    const user = useUser();
    const profile = user.userProfile;

    async function updateProfile(profile) {
        await Promise.resolve(user.updateProfile(profile));
    }
    async function updateSecondLanguage(language) {
        const newProfile = { ...profile, secondLanguage: language };
        await Promise.resolve(updateProfile(newProfile));
    }

    return { profile: profile, updateSecondLanguage: updateSecondLanguage };
}

UserProfile.displayName = "UserProfile";
export default UserProfile;
