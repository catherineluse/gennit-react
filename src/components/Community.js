import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { GennitContext } from "../AppWithContext";
import { GET_COMMUNITY_WITH_DISCUSSIONS } from '../graphQLData/communities';
import { Switch, Route } from 'react-router-dom';
import CommunitySettingsForm from './forms/CommunitySettingsForm'
import Discussions from './Discussions'

const renderCommunityWithDiscussions = (currentCommunity) => {
    const { name, url, description, Organizer, Discussion
    } = currentCommunity;

    return (
        <div className="community">
            <div className="communityHeader">
                <h2>{name ? name : "Untitled Community"}</h2>
                <span className="communityUrl">{`c/${url}`}</span>
                <Link to={`/c/${url}`} >
                    <span className="communitySectionTitle">
                        <i className="far fa-comments"></i> DISCUSSIONS
                  </span>
                </Link>
                <Link to={`/c/${url}/settings`}>
                    <span className="communitySectionTitle">
                        <i className="fas fa-cog"></i> SETTINGS
                    </span>
                </Link>
            </div>
            <div className="communityBody">
                <Switch>
                    <Route
                        path='/c/:url'
                        render={(props) => (
                            <Discussions {...props} currentCommunity={currentCommunity} />
                        )}
                        exact
                    />
                    <Route
                        path='/c/:url/settings'
                        component={CommunitySettingsForm}
                        exact
                    />
                </Switch>
            </div>
        </div>
    )
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
