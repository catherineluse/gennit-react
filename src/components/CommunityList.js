import React, { useState, useEffect, useContext } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import {
    GET_COMMUNITIES,
} from '../graphQLData/communities';
import Context from "../context";

const CommunityList = () => {
    const { state, dispatch } = useContext(Context);
    const { loading, error, data } = useQuery(GET_COMMUNITIES);
    const [communities, setCommunities] = useState([]);

    const getData = () => {
        if (loading) {
            return null;
        }
        if (error) {
            console.error(`GET_COMMUNITIES error: ${error}`);
            return `Error: ${error.message}`;
        }
        if (data.queryCommunity) {
            setCommunities(data.queryCommunity);
            console.log(communities)
        }
    };

    const communityListItems = communities.map((communityData, i) => {
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

    console.log('community list items are ', JSON.stringify(communities))

    const main = !communities.length ? null : (
        <div>
            <h1>Communities</h1>
            { communityListItems}
        </div>
    );

    useEffect(() => {
        getData();
    }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="container">

            {main}
        </div>
    );
};

export default CommunityList;
