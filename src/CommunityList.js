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
            <Link to={`/c/${url}`} key={i}>
                <div className="row communityListItem" >
                    <div className="col-2">
                        <div className="circle"></div>
                    </div>
                    <div className="col-6">
                        <h2>{name ? name : "Untitled"}</h2>
                        <div className="communityUrl">{`c/${url}`}</div>
                        <p className="communityDescription">{description ? description : "null"}</p>
                    </div>
                </div>
            </Link >

        )
    });

    console.log('community list items are ', JSON.stringify(shownCommunities))

    const main = !shownCommunities.length ? null : (
        <div>
            <h1>Communities</h1>
            { communityListItems}
        </div>
    );

    useEffect(() => {
        getData();
    }, [community, data]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="container">

            {main}
        </div>
    );
};

export default CommunityList;
