import React from 'react';
import { Link } from 'react-router-dom'

const CommunitySidebar = ({ description, username }) => {
    return (
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
       </div>
    )
}
export default CommunitySidebar