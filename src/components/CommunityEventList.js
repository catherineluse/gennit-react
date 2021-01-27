import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Redirect } from 'react-router'

const renderCommunityEventList = (Events, url, history) => {
  if (Events.length === 0) {
    return (
     <p>There are no events yet.</p>
    )
  }

  return Events.map((event) => {
    const { 
        id, 
        title, 
        startTime,
        endTime, 
        location,
        virtualEventUrl,
        Organizer: { 
            username 
        },
        isVirtual
    } = event;

    
    const handleClick = () => history.push(`/c/${url}/event/${id}`)

    return (
      <div className='discussionListItem' key={id}>
        <div className='discussionTitle' onClick={handleClick}>
          {title}
        </div>
        <p className="event-details">Date: {startTime}</p>
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
    const history = useHistory()

    return newEventFormWasSubmitted ? (
      <Redirect
        push
        to={{
          pathname: `/c/${url}/event/${newEventId}`
        }}
      />
    ) : (
        <div>
          {renderCommunityEventList(Events, url, history)}
        </div>
    )
}

export default CommunityEventList