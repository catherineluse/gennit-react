import React from "react";
import { useAuth0 } from "./react-auth0-spa";
import './Profile.css';

const UserProfile = ({ username }) => {
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
