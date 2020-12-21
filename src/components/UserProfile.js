import React from "react";
import { useAuth0 } from "../Auth0Provider";

const UserProfile = ({ match }) => {
    const { username } = match.params;
    const { loading } = useAuth0();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!username) {
        return <p>Could not find user.</p>;
    }

    return (
        <div className="profile">
            <h2>{username}</h2>
        </div>
    );
};

export default UserProfile;
