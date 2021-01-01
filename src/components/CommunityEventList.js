import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Redirect } from 'react-router'

const renderCommunityEventList = (Events, url) => {
  if (Events.length === 0) {
    return (
     <p>There are no events yet.</p>
    )
  }

  return Events.map(event => {
    const { 
        id, 
        title, 
        startDay, 
        location, 
        Organizer: { 
            username 
        },
        isVirtual
    } = event;

    const history = useHistory()
    const handleClick = () => history.push(`/c/${url}/event/${id}`)

    return (
      <div className='discussionListItem' key={id}>
        <div className='discussionTitle' onClick={handleClick}>
          {title}
        </div>
        <p className="event-details">Date: {startDay}</p>
        <p className="event-details">Location: {isVirtual ? "Virtual" : location}</p>
        <div className='discussionAuthor'>
          Hosted by{' '}
          <Link
            className='understatedLink'
            to={`/u/${username}`}
          >
            {`u/${username}`} |
          </Link>
          <Link
            className='understatedLink'
            to={`/c/${url}/event/${id}`}
          >
            Details
          </Link>
        </div>
        
      </div>
    )
  })
}

const CommunityEventList = ({
    url,
    currentCommunity,
    newEventId,
    newEventFormWasSubmitted
}) => {
    const { Events } = currentCommunity;
    console.log('events ,', currentCommunity.Events)

    return newEventFormWasSubmitted ? (
      <Redirect
        push
        to={{
          pathname: `/c/${url}/event/${newEventId}`
        }}
      />
    ) : (
        <div>
          {renderCommunityEventList(Events, url)}
        </div>
    )
}

export default CommunityEventList