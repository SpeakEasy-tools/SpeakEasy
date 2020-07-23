import { useUser } from "../UserProvider";

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
