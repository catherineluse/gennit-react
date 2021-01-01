import React from 'react';

const CommunityHeader = ({ name, url }) => {
    return (
        <div className="container communityHeader" >
            <div className="communityNameBar">
                <h2>{name ? name : "Untitled Community"}</h2>
                <span className="communityUrl">{`c/${url}`}</span>
            </div>
        </div>
    )
}

export default CommunityHeader;