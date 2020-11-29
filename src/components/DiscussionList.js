import React from 'react'
import CreateDiscussionForm from './forms/discussion/CreateDiscussionForm'
import { Link, useHistory } from 'react-router-dom'

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
            {`u/${username}`}
          </Link>
        </div>
        <div className='discussionLinks'>
          <button 
            onClick={handleClick}
          >
            <i className='far fa-comment'></i> Comments
          </button>
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
  communityData,
  setNewDiscussionFormWasSubmitted,
  setNewDiscussionId
}) => {
  const { Discussions } = communityData;

  const history = useHistory()

  return (
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
