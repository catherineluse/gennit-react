import React from "react";
import { useAuth0 } from "./react-auth0-spa";

const Community = ({ match }) => {
    const { url } = match.params;
    const { loading } = useAuth0();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <h1>Welcome to c/{url}</h1>
        </div >
    );
};

export default Community;
