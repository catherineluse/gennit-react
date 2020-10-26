import React from 'react';
import { Link } from 'react-router-dom';

const renderDiscussions = (Discussion) => {

    const discussions = Discussion.map((discussionData, i) => {
        return (
            <li className="discussionListItem" key={i}>
                <p className="discussionTitle">{discussionData.title}</p>
                <p className="discussionAuthor">Posted by <Link className="understatedLink" to={`/u/${discussionData.Author.username}`}>{`u/${discussionData.Author.username}`}</Link></p>
            </li>
        )
    })

    return discussions.length > 0 ? (
        <div className="discussionList">
            { discussions}
        </div>
    ) : "There are no discussions yet."
}

const Discussions = ({ currentCommunity }) => {
    const { name, url, description, Organizer, Discussion
    } = currentCommunity;

    return (
        <div className="row">
            <div className="col-6">
                {!Discussion ? null : renderDiscussions(Discussion)}
            </div>
            <div className="col-3">
                <div className="box">
                    <div className="boxHeader">
                        About Community
                      </div>
                    <div className="boxContent">
                        <p className="communityDescription">{description ? description : "null"}</p>
                    </div>
                </div>
                <div className="box">
                    <div className="boxHeader">
                        Moderators
                      </div>
                    <div className="boxContent">
                        <p className="communityInfo">{Organizer ? (
                            <Link to={`/u/${Organizer.username}`}>{`u/${Organizer.username}`}</Link>
                        ) : "None"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discussions;