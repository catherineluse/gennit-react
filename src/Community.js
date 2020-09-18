import React from "react";
import { useAuth0 } from "./react-auth0-spa";

const Community = ({ url }) => {
    const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div >
            <p>Community URL: <strong>{url}</strong></p>
        </div>
    );
};

export default Community;
