import React, { useContext, useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';
import { GennitContext } from "../AppWithContext";
import { GET_COMMUNITY_WITH_DISCUSSIONS } from '../graphQLData/communities';
import CommunitySettingsForm from './forms/CommunitySettingsForm'
import DiscussionList from './DiscussionList'
import CommunityHeader from './CommunityHeader'
import { communityBodyContentTypes } from './Main';

const renderCommunity = (currentCommunity, communityBodyContent) => {
    const { name, url } = currentCommunity;

    switch (communityBodyContent) {
        case communityBodyContentTypes.DISCUSSION_LIST:
            return (
                <div>
                    <CommunityHeader name={name} url={url} />
                    <div className="communityBody">
                        <DiscussionList currentCommunity={currentCommunity} />
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
        default:
            return (
                <div>
                    <CommunityHeader name={name} url={url} />
                    <div className="communityBody">
                        <DiscussionList currentCommunity={currentCommunity} />
                    </div>
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
            throw new Error(`GET_COMMUNITY_WITH_DISCUSSIONS error: ${error}`);
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

    return !state.currentCommunity ? null : (
        <div >
            { renderCommunity(state.currentCommunity, communityBodyContent)}
        </div>
    );
};

export default Community;
