import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS } from '../graphQLData/communities'
import CommunitySettingsForm from './forms/community/CommunitySettingsForm'
import DiscussionList from './DiscussionList'
import CommunityEventList from './CommunityEventList'
import CommunityHeader from './CommunityHeader'
import { communityBodyContentTypes } from './Main'
import CommunitySidebar from './CommunitySidebar';
import { Link, NavLink } from 'react-router-dom'

const Community = ({ match, communityBodyContent }) => {
  const { url } = match.params

  const { loading, error, data } = useQuery(
    GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS,
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
   return <p>{`GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS error: ${error}`}</p>
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
      <DiscussionList 
        url={url} 
        communityData={currentCommunity} 
      />
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
      case communityBodyContentTypes.EVENT_LIST:
        return (
          <CommunityEventList
            url={url}
            currentCommunity={currentCommunity}
          />
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
      <div className="container communityBody">
        <div className="row">
          <CommunityHeader 
            name={name} 
            url={url}
          />
        </div>
        <div className="row">
          <div className="col-sm-3">
            <CommunitySidebar 
              description={description} 
              username={username}
              communityData={currentCommunity}
            />
          </div>
          <div className="col-sm-6">
            <div className="communitySectionBar">
                    <NavLink
                        exact
                        to={`/c/${url}`}
                        activeClassName="active"
                    >
                        <span className="communitySectionTitle">
                            <i className="far fa-comments"></i> Discussions
                      </span>
                    </NavLink>
                    <NavLink
                        exact
                        to={`/c/${url}/events`}
                        activeClassName="active"
                    >
                        <span className="communitySectionTitle">
                        <i className="far fa-calendar-alt"></i> Events
                      </span>
                    </NavLink>
                    <NavLink
                        exact
                        to={`/c/${url}/settings`}
                        activeClassName="active"
                    >
                        <span className="communitySectionTitle">
                            <i className="fas fa-cog"></i> Settings
                        </span>
                    </NavLink>
                </div>
                {renderBody()}
          </div>
        </div>
      </div>
  )
}

export default Community
