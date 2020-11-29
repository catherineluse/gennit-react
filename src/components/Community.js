import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { GET_COMMUNITY_WITH_DISCUSSIONS } from '../graphQLData/communities'
import CommunitySettingsForm from './forms/community/CommunitySettingsForm'
import DiscussionList from './DiscussionList'
import CommunityHeader from './CommunityHeader'
import { communityBodyContentTypes } from './Main'
import CommunitySidebar from './CommunitySidebar';
import { Redirect } from 'react-router'
  
const Community = ({ match, communityBodyContent }) => {
  const { url } = match.params
  const [newDiscussionFormWasSubmitted, setNewDiscussionFormWasSubmitted] = useState(false)
  const [newDiscussionId, setNewDiscussionId] = useState(null)

  const { loading, error, data } = useQuery(
    GET_COMMUNITY_WITH_DISCUSSIONS,
    {
      variables: {
        url
      }
    }
  )

  if (loading){
    return <p>Loading...</p>
  }
  
  if (error) {
   return <p>{`GET_COMMUNITY_WITH_DISCUSSIONS error: ${error}`}</p>
  }

  const currentCommunity = data.getCommunity;

  const { name, description, Organizer } = currentCommunity;
  const { username } = Organizer;

  const renderBody = () => {
    switch (communityBodyContent) {
      case communityBodyContentTypes.DISCUSSION_LIST:
        return (
          <div className='row'>
              <DiscussionList 
                url={url} 
                communityData={currentCommunity} 
                setNewDiscussionFormWasSubmitted={setNewDiscussionFormWasSubmitted}
                setNewDiscussionId={setNewDiscussionId}
              />
              <CommunitySidebar description={description} username={username}/>
           </div>
        )
      case communityBodyContentTypes.SETTINGS:
        return (
              <CommunitySettingsForm 
                url={url} 
                currentCommunity={currentCommunity}
              />
        )
      default:
        return (
          <div className='row'>
              <DiscussionList 
                url={url} 
                communityData={currentCommunity} 
                setNewDiscussionFormWasSubmitted={setNewDiscussionFormWasSubmitted}
                setNewDiscussionId={setNewDiscussionId}
              />
              <CommunitySidebar description={description} username={username}/>
          </div>
        )
    }
  }

  return newDiscussionFormWasSubmitted && newDiscussionId ? (
    <Redirect
      push
      to={{
        pathname: `/c/${url}/discussion/${newDiscussionId}`
      }}
    />) : (
      <div>
        <CommunityHeader 
          name={name} 
          url={url}
        />
        <div className='communityBody'>
          {renderBody()}
        </div>
      </div>
  )
}

export default Community
