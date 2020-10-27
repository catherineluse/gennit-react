import React from 'react';
import { Link } from 'react-router-dom';

const CommunityHeader = ({ name, url }) => {

    return (
        <div className="communityHeader" >
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
        </div >
    )
}

export default CommunityHeader;