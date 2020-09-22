import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import {
    GET_COMMUNITY,
    GET_COMMUNITIES,
    ADD_COMMUNITY,
} from './graphQLData/communities';
import { useAuth0 } from './react-auth0-spa';

const useImperativeQuery = (query) => {
    const { refetch } = useQuery(query, { skip: true });
    const imperativelyCallQuery = (variables) => {
        return refetch(variables);
    };
    return imperativelyCallQuery;
};
const CommunityList = () => {

    const [addCommunity] = useMutation(ADD_COMMUNITY);
    const getCommunityData = useImperativeQuery(GET_COMMUNITY);

    const { community } = useAuth0();

    const { loading, error, data } = useQuery(GET_COMMUNITIES);

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

    const [shownCommunities, setShownCommunities] = useState([]);

    const communityListItems = shownCommunities.map((communityData, i) => {
        const { url, name } = communityData
        return (
            <tr key={i}>
                <td><Link to={`/c/${url}`}>{url}</Link></td>
                <td>{name ? name : "null"}</td>
            </tr >
        )
    });

    const main = !shownCommunities.length ? null : (
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Community name</th>
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
            <h2>Communities</h2>
            {main}
        </div>
    );
};

export default CommunityList;
