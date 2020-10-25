import React, { useContext, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { GennitContext } from "../AppWithContext";
import { GET_COMMUNITY_WITH_DISCUSSIONS } from '../graphQLData/communities';

const renderCommunityWithDiscussions = (currentCommunity) => {
    const { name, url, description, Organizer, Discussion
    } = currentCommunity;

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>{name ? name : "Untitled Community"}</h1>
                    <p className="communityUrl">{`c/${url}`}</p>
                    <p className="communityDescription">{description ? description : "null"}</p>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    {!Discussion ? null : renderDiscussions(Discussion)}
                </div>
                <div className="col">
                    <p className="communityInfo">Organizer: {Organizer ? Organizer.username : "None"}</p>
                </div>
            </div>
        </div>
    )
}

const renderDiscussions = (Discussion) => {

    const discussions = Discussion.map((discussionData, i) => {
        return (
            <li key={i}>
                <p>Title: {discussionData.title}</p>
                <p>Author: {discussionData.Author.username}</p>
            </li>
        )
    })

    return discussions.length > 0 ? (
        <ul>
            { discussions}
        </ul>
    ) : "There are no discussions yet."
}

const Community = ({ match }) => {
    const { url } = match.params;
    const { state, dispatch } = useContext(GennitContext);
    const { loading: communityIsLoading, error, data } = useQuery(GET_COMMUNITY_WITH_DISCUSSIONS, {
        variables: {
            url
        }
    });

    const getCommunity = () => {
        if (communityIsLoading) {
            return null;
        }
        if (error) {
            return `GET_COMMUNITY_WITH_DISCUSSIONS error: ${error}`;
        }
        if (data.getCommunity) {
            dispatch({
                type: "SET_CURRENT_COMMUNITY",
                payload: data.getCommunity
            })
        }

    };

    useEffect(() => {
        getCommunity();
        // eslint-disable-next-line
    }, [data])

    // sample data for community: [{
    //  "name":"goats",
    //  "url":"goats",
    //  "description":"all about goats",
    //  "Organizer":{
    //    "username":"cluse",
    //    "__typename":"User"
    //  },
    // "__typename":"Community"}



    return !state.currentCommunity ? null : (
        <div >
            { renderCommunityWithDiscussions(state.currentCommunity)}
        </div>
    );
};

export default Community;
