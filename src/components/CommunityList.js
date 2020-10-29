import React, { useEffect, useContext } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_COMMUNITIES } from '../graphQLData/communities';
import { GennitContext } from "../AppWithContext";

const CommunityList = () => {

    const { state, dispatch } = useContext(GennitContext);
    const { loading: communitiesAreLoading, error, data } = useQuery(GET_COMMUNITIES);

    const getCommunities = () => {
        if (communitiesAreLoading) {
            return null;
        }
        if (error) {
            return `GET_COMMUNITIES error: ${error}`;
        }
        if (data.queryCommunity) {
            dispatch({
                type: "GET_COMMUNITIES",
                payload: data.queryCommunity
            })
        }
    };

    useEffect(() => {
        getCommunities();
        // eslint-disable-next-line
    }, [data])

    const communityListItems = () => {

        return state.communities.map((communityData, i) => {
            const { url, name, description } = communityData;

            return (
                <Link to={`/c/${url}`} key={url}>
                    <div className="row communityListItem" >
                        <div className="col-6">
                            <h2>{name ? name : "Untitled"}</h2>
                            <div className="communityUrl">{`c/${url}`}</div>
                            <p className="communityDescription">{description ? description : "null"}</p>
                        </div>
                    </div>
                </Link >
            )
        })
    };

    return !state.communities ? null : (
        <div className="container">
            <h1>Communities</h1>
            <div className="communityList">{communityListItems()}</div>
        </div>
    )
}

export default CommunityList;
