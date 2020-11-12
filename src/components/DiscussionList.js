import React from 'react'
import CreateDiscussionForm from './forms/discussion/CreateDiscussionForm'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

const renderDiscussions = (Discussions, url, history) => {
  const discussionList = Discussions.map((discussionData, i) => {
    const { id } = discussionData
    const handleClick = () => history.push(`/c/${url}/discussion/${id}`)

    return (
      <div className='discussionListItem' key={i}>
        <div className='discussionTitle' onClick={handleClick}>
          {discussionData.title}
        </div>
        <div className='discussionAuthor'>
          Posted by{' '}
          <Link
            className='understatedLink'
            to={`/u/${discussionData.Author.username}`}
          >
            {`u/${discussionData.Author.username}`}
          </Link>
        </div>
        <div className='discussionLinks'>
          <i className='far fa-comment'></i> Comments
        </div>
      </div>
    )
  })

  return discussionList.length > 0 ? (
    <div className='discussionList'>{discussionList}</div>
  ) : (
    <div className='discussionList'>There are no discussions yet.</div>
  )
}

const DiscussionList = () => {
  const currentCommunity = useSelector(state => state.currentCommunity)
  const { url, description, Organizer, Discussions } = currentCommunity

  const history = useHistory()

  return (
    <div className='row'>
      <div className='col-6'>
        <CreateDiscussionForm/>
        {!Discussions ? null : renderDiscussions(Discussions, url, history)}
      </div>
      <div className='col-3'>
        <div className='box'>
          <div className='boxHeader'>About Community</div>
          <div className='boxContent'>
            <p className='communityDescription'>
              {description ? description : 'Welcome'}
            </p>
          </div>
        </div>
        <div className='box'>
          <div className='boxHeader'>Moderators</div>
          <div className='boxContent'>
            <p className='communityInfo'>
              {Organizer ? (
                <Link
                  to={`/u/${Organizer.username}`}
                >{`u/${Organizer.username}`}</Link>
              ) : (
                'None'
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiscussionList
