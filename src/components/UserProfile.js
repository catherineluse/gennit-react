import React from "react";
import { useAuth0 } from "../Auth0Provider";

const UserProfile = ({ match }) => {
    const { username } = match.params;
    const { loading } = useAuth0();

    if (loading || !username) {
        return <div>Loading...</div>;
    }

    return (
        <div className="profile">
            <h2>{username}</h2>
        </div>
    );
};

export default UserProfile;
