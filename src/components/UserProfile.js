import React from "react";
import { useAuth0 } from "../Auth0Provider";

const UserProfile = ({ match }) => {
    const { username } = match.params;
    const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!username) {
        return <div>Could not find user.</div>;
    }

    return (
        <div className="profile">
            <h2>{username}</h2>
        </div>
    );
};

export default UserProfile;
