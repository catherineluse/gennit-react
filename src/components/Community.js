import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GennitContext } from "../AppWithContext";
import { GET_COMMUNITY_WITH_DISCUSSIONS } from '../graphQLData/communities';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CommunitySettingsForm from './forms/CommunitySettingsForm'
import Discussions from './Discussions'
import UserProfile from './UserProfile'
import CommunityHeader from './CommunityHeader'
import { communityBodyContentTypes } from './Main';

const renderCommunity = (currentCommunity, communityBodyContent) => {
    const { name, url } = currentCommunity;

    if (!communityBodyContent) {
        throw new Error("Could not find content.")
    }

    switch (communityBodyContent) {
        case communityBodyContentTypes.DISCUSSIONS:
            return (
                <div>
                    <CommunityHeader name={name} url={url} />
                    <div className="communityBody">
                        <Discussions currentCommunity={currentCommunity} />
                    </div>
                </div>
            )
        case communityBodyContentTypes.SETTINGS:
            return (
                <div>
                    <CommunityHeader name={name} url={url} />
                    <CommunitySettingsForm currentCommunity={currentCommunity} />
                </div>
            )
    }
}
const Community = ({ match, communityBodyContent }) => {
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
            { renderCommunity(state.currentCommunity, communityBodyContent)}
        </div>
    );
};

export default Community;
