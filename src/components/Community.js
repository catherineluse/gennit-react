import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useDispatch, useSelector } from 'react-redux'
import { GET_COMMUNITY_WITH_DISCUSSIONS } from '../graphQLData/communities'
import CommunitySettingsForm from './forms/CommunitySettingsForm'
import DiscussionList from './DiscussionList'
import CommunityHeader from './CommunityHeader'
import { communityBodyContentTypes } from './Main'

const renderCommunity = (currentCommunity, communityBodyContent) => {
  const { name, url } = currentCommunity

  switch (communityBodyContent) {
    case communityBodyContentTypes.DISCUSSION_LIST:
      return (
        <div>
          <CommunityHeader
            name={name}
            url={url}
            activeSection={communityBodyContentTypes.DISCUSSION_LIST}
          />
          <div className='communityBody'>
            <DiscussionList currentCommunity={currentCommunity} />
          </div>
        </div>
      )
    case communityBodyContentTypes.SETTINGS:
      return (
        <div>
          <CommunityHeader
            name={name}
            url={url}
            activeSection={communityBodyContentTypes.SETTINGS}
          />
          <CommunitySettingsForm  />
        </div>
      )
    default:
      return (
        <div>
          <CommunityHeader name={name} url={url} />
          <div className='communityBody'>
            <DiscussionList currentCommunity={currentCommunity} />
          </div>
        </div>
      )
  }
}
const Community = ({ match, communityBodyContent }) => {
  const { url } = match.params
  const currentCommunity = useSelector(state => state.currentCommunity)
  const dispatch = useDispatch()

  const { loading: communityIsLoading, error, data } = useQuery(
    GET_COMMUNITY_WITH_DISCUSSIONS,
    {
      variables: {
        url
      }
    }
  )

  const getCommunity = () => {
    if (communityIsLoading) {
      return null
    }
    if (error) {
      throw new Error(`GET_COMMUNITY_WITH_DISCUSSIONS error: ${error}`)
    }
    if (data.getCommunity) {
      dispatch({
        type: 'SET_CURRENT_COMMUNITY',
        payload: data.getCommunity
      })
    }
  }

  useEffect(() => {
    getCommunity()
    // eslint-disable-next-line
  }, [data])

  return !currentCommunity ? null : (
    <div>{renderCommunity(currentCommunity, communityBodyContent)}</div>
  )
}

export default Community
