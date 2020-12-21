import React, { useState } from 'react'
import CreateDiscussionForm from './forms/discussion/CreateDiscussionForm'
import { Link, useHistory } from 'react-router-dom'
import { Redirect } from 'react-router'

const renderDiscussions = (Discussions, url, history) => {
  const discussionList = Discussions.map((discussionData, i) => {
    const { id, title, Author } = discussionData
    const { username } = Author;

    const handleClick = () => history.push(`/c/${url}/discussion/${id}`)

    return (
      <div className='discussionListItem' key={i}>
        <div className='discussionTitle' onClick={handleClick}>
          {title}
        </div>
        <div className='discussionAuthor'>
          Posted by{' '}
          <Link
            className='understatedLink'
            to={`/u/${username}`}
          >
            {`u/${username}`} |
          </Link>
          <Link
            className='understatedLink'
            to={`/c/${url}/discussion/${id}`}
          >
            <i className='far fa-comment'></i> Comments
          </Link>
        </div>
        
      </div>
    )
  })

  return discussionList.length > 0 ? (
    <div className='discussionList'>{discussionList}</div>
  ) : (
    <div className='discussionList'>
     <p className='emptyNotice'>There are no discussions yet.</p>
    </div>
  )
}

const DiscussionList = ({ 
  url, 
  communityData
}) => {
  const { Discussions } = communityData;
  const [newDiscussionFormWasSubmitted, setNewDiscussionFormWasSubmitted] = useState(false)
  const [newDiscussionId, setNewDiscussionId] = useState(false)

  const history = useHistory()

  return newDiscussionFormWasSubmitted ? (
    <Redirect
      push
      to={{
        pathname: `/c/${url}/discussion/${newDiscussionId}`
      }}
    />
  ) : (
      <div className='col-6'>
        <CreateDiscussionForm 
          currentCommunity={communityData}
          setNewDiscussionFormWasSubmitted={setNewDiscussionFormWasSubmitted}
          setNewDiscussionId={setNewDiscussionId}
        />
        {!Discussions ? null : renderDiscussions(Discussions, url, history)}
      </div>
  )
}

export default DiscussionList
