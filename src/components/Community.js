import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_COMMUNITY_WITH_DISCUSSIONS } from '../graphQLData/communities'
import CommunitySettingsForm from './forms/community/CommunitySettingsForm'
import DiscussionList from './DiscussionList'
import CommunityHeader from './CommunityHeader'
import { communityBodyContentTypes } from './Main'
import CommunitySidebar from './CommunitySidebar';
import { Link } from 'react-router-dom'
  
const Community = ({ match, communityBodyContent }) => {
  const { url } = match.params
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

  // If the community is not found,
  // provide a link back to the community.
  if (!data.getCommunity) {
    return (
      <div className='container'>
        <div className='discussionPage'>

          <p>Could not find the community.</p>
          <Link to={`/communities`}>
            <p>
             <i className="fas fa-arrow-left"></i> Go back to community list
            </p>
          </Link>
        </div>
    </div>)
  }

  const currentCommunity = data.getCommunity;

  const { name, description, Organizer } = currentCommunity;
  const { username } = Organizer;

  const renderDiscussionPage = () => {
    return (
      <div className='row'>
        <DiscussionList 
          url={url} 
          communityData={currentCommunity} 
        />
        <CommunitySidebar 
          description={description} 
          username={username}
        />
     </div>
    )
  }

  const renderBody = () => {
    switch (communityBodyContent) {
      case communityBodyContentTypes.DISCUSSION_LIST:
        return (
          <>
          {renderDiscussionPage()}
          </>
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
          <>
          {renderDiscussionPage()}
          </>
        )
    }
  }

  return  (
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
