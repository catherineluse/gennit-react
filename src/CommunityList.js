import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import {
    GET_COMMUNITIES,
} from './graphQLData/communities';
import { useAuth0 } from './react-auth0-spa';


const CommunityList = () => {

    const { community } = useAuth0();
    const { loading, error, data } = useQuery(GET_COMMUNITIES);
    const [shownCommunities, setShownCommunities] = useState([]);

    const getData = () => {
        if (loading) {
            return null;
        }
        if (error) {
            console.error(`GET_COMMUNITIES error: ${error}`);
            return `Error: ${error.message}`;
        }
        if (data.queryCommunity) {
            setShownCommunities(data.queryCommunity);
        }
    };

    const communityListItems = shownCommunities.map((communityData, i) => {
        const { url, name, description } = communityData
        return (
            <tr key={i}>
                <td><Link to={`/c/${url}`}>c/{url}</Link></td>
                <td>{description ? description : "null"}</td>
                <td>{name ? name : "null"}</td>
            </tr >
        )
    });

    const main = !shownCommunities.length ? null : (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Community URL</th>
                    <th scope="col">Description</th>
                    <th scope="col">Name</th>
                </tr>
            </thead>
            <tbody>
                {communityListItems}
            </tbody>
        </table>
    );

    useEffect(() => {
        getData();
    }, [community, data]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="container">
            <h1>Communities</h1>
            {main}
        </div>
    );
};

export default CommunityList;
