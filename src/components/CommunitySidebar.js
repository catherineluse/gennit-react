import React from 'react';
import { Link } from 'react-router-dom'
import CreateDiscussionForm from './forms/discussion/CreateDiscussionForm';
import CreateEventForm from './forms/event/CreateEventForm';
  

const CommunitySidebar = ({ 
  description, 
  username,
  communityData
 }) => {
    return (
        <>
            
            <div className='box'>
              <div className='boxHeader'>About Community</div>
              <div className='boxContent'>
                <p className='communityDescription'>
                  {description ? description : 'Welcome'}
                </p>
              </div>
            </div>
            <CreateDiscussionForm 
              currentCommunity={communityData}
            />
            <CreateEventForm
              currentCommunity={communityData}
            />
            <div className='box'>
              <div className='boxHeader'>Moderators</div>
              <div className='boxContent'>
                <p className='communityInfo'>
                  {username ? (
                    <Link
                      to={`/u/${username}`}
                    >{`u/${username}`}</Link>
                  ) : (
                    'None'
                  )}
                </p>
              </div>
            </div>
       </>
    )
}
export default CommunitySidebar