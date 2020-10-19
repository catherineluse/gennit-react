import React, { useEffect, useContext, useReducer } from "react";
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import Context from "../context";
import reducer from "../reducers/index"
import { GET_COMMUNITIES } from '../graphQLData/communities';

const CommunityList = () => {

    const initialState = useContext(Context)
    console.log('initial state is ', initialState)

    const [state, dispatch] = useReducer(reducer, initialState)
    console.log('community list items are ', state.communities)
    const { loading: communitiesAreLoading, error, data } = useQuery(GET_COMMUNITIES);

    const getCommunities = () => {
        if (communitiesAreLoading) {
            return;
        }
        if (error) {
            console.error(`GET_COMMUNITIES error: ${error}`);
            return;
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
        })
    };



    return !state.communities ? null : (
        <div className="container">
            <h1>Communities</h1>
            { communityListItems}
        </div>
    )
}

export default CommunityList;
