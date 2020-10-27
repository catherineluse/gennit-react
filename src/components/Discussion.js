import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { GET_DISCUSSION } from '../graphQLData/discussions';

const renderComments = (Comments) => {
    return Comments.map((commentData, i) => {
        const { id, text } = commentData;
        const { username } = commentData.Author;

        return (
            <div className="comment" key={i}>
                <div className="commentAuthor"><Link to={`/u/${username}`}>{username}</Link></div>
                <div className="commentText">{text}</div>
            </div>
        )
    })
}

const renderDiscussionPage = ({ title, body, Author, Comments }, url) => {
    const { username } = Author;
    return (
        <div className="discussionPage">
            <div className="communitySectionTitle">DISCUSSION IN {`c/${url}`}</div>
            <h2>{title}</h2>
            <div className="discussionBody">
                {body}
            </div>
            <div className="discussionAuthor">Posted by <Link to={`/u/${username ? username : "[deleted]"}`}>{`/u/${username ? username : "[deleted"}`}</Link></div>
            <div className="communitySectionTitle">COMMENTS</div>
            {renderComments(Comments)}
        </div>
    )
}

const Discussion = () => {
    const { url, discussionId } = useParams();

    const { loading: discussionIsLoading, error, data } = useQuery(GET_DISCUSSION, {
        variables: {
            id: discussionId
        }
    });

    const [discussionData, setDiscussionData] = useState()

    // getDiscussion(id: $id) {
    //     title
    //     body
    //     Author {
    //         username
    //     }
    //     Community {
    //         url
    //     }
    //     Comments {
    //         Author {
    //             username
    //         }
    //         text
    //     }
    //   }

    const getDiscussion = () => {
        if (discussionIsLoading) {
            return null;
        }
        if (error) {
            console.log(`GET_DISCUSSION error: ${error}`);
        }
        if (data.getDiscussion) {
            setDiscussionData(data.getDiscussion)
            console.log('discussion is ', data.getDiscussion)
        }

    };

    useEffect(() => {
        getDiscussion();
        // eslint-disable-next-line
    }, [data])

    return !discussionData ? null : (
        <div className="container">
            { renderDiscussionPage(discussionData, url)}
        </div>
    )
}

export default Discussion;