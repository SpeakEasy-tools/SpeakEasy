import PropTypes from "prop-types";

import React, { createContext, useContext, useEffect, useState } from "react";
import { fetchProfile, updateProfile } from "../CloudFunctions";

const userContext = createContext({});

export function ProvideUser({ children }) {
    const user = useProvideUser();
    return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

ProvideUser.displayName = "ProvideUser";
ProvideUser.propTypes = { children: PropTypes.any };

export const useUser = () => {
    return useContext(userContext);
};

function useProvideUser() {
    const [loading, setLoading] = useState(false);

    const [userProfile, setUserProfile] = useState({});

    const [userId, setUserId] = useState("");

    function updateUserId(uid) {
        setUserId(uid);
    }

    async function fetchUserProfile(uid) {
        const profile = await fetchProfile(uid);
        setUserProfile(profile);
    }

    async function updateUserProfile(uid, profile) {
        const newProfile = await updateProfile(uid, profile);
        setUserProfile(newProfile);
    }
    useEffect(() => {
        if (userId) {
            setLoading(true);
            fetchUserProfile(userId).then(() => setLoading(false));
        }
    }, [userId]);

    return {
        loading: loading,
        userId: userId,
        updateUserId: updateUserId,
        userProfile: userProfile,
        updateProfile: updateUserProfile
    };
}
