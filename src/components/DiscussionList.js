import React from 'react';
import { Link, useHistory } from 'react-router-dom';

const renderDiscussions = (Discussions, url, history) => {


    const discussionList = Discussions.map((discussionData, i) => {
        const { id } = discussionData;
        const handleClick = () => history.push(`/c/${url}/discussion/${id}`);

        return (
            <div
                className="discussionListItem"
                onClick={handleClick}/*This should not affect the Link below.*/
                key={i}
            >
                <div className="discussionTitle">{discussionData.title}</div>
                <div className="discussionAuthor">
                    Posted by <Link className="understatedLink" to={`/u/${discussionData.Author.username}`}>{`u/${discussionData.Author.username}`}
                    </Link>
                </div>
                <div className="discussionLinks"><i className="far fa-comment"></i> Comments</div>
            </div>
        )
    })

    return discussionList.length > 0 ? (
        <div className="discussionList">
            { discussionList}
        </div>
    ) : "There are no discussions yet."
}

const DiscussionList = ({ currentCommunity }) => {
    const { url, description, Organizer, Discussions
    } = currentCommunity;

    const history = useHistory();

    return (
        <div className="row">
            <div className="col-6">
                {!Discussions ? null : renderDiscussions(Discussions, url, history)}
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

export default DiscussionList;