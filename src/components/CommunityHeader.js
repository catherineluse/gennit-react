import React from 'react';
import { NavLink } from 'react-router-dom';

const CommunityHeader = ({ name, url, activeSection }) => {

    return (
        <div className="communityHeader" >
            <div className="communityNameBar">
                <h2>{name ? name : "Untitled Community"}</h2>
                <span className="communityUrl">{`c/${url}`}</span>
            </div>
            <div className="communitySectionBar">
                <NavLink
                    exact
                    to={`/c/${url}`}
                    activeClassName="active"
                >
                    <span className="communitySectionTitle">
                        <i className="far fa-comments"></i> DISCUSSIONS
                  </span>
                </NavLink>
                <NavLink
                    exact
                    to={`/c/${url}/settings`}
                    activeClassName="active"
                >
                    <span className="communitySectionTitle">
                        <i className="fas fa-cog"></i> SETTINGS
                    </span>
                </NavLink>
            </div >
        </div >
    )
}

export default CommunityHeader;