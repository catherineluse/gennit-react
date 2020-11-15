import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { GET_COMMUNITIES } from '../graphQLData/communities'
import CreateCommunityForm from './forms/community/CreateCommunityForm'

const CommunityList = () => {
  const communities = useSelector(state => state.communities)
  const dispatch = useDispatch()

  const { loading: communitiesAreLoading, error, data } = useQuery(
    GET_COMMUNITIES
  )

  const getCommunities = () => {
    if (communitiesAreLoading) {
      return null
    }
    if (error) {
      return `GET_COMMUNITIES error: ${error}`
    }
    if (data.queryCommunity) {
      dispatch({
        type: 'GET_COMMUNITIES',
        payload: data.queryCommunity
      })
    }
  }

  useEffect(() => {
    getCommunities()
    console.log('rendered list of communities')
  }, [data, communities])

  const communityListItems = () => {
    return communities.map((communityData, i) => {
      const { url, name, description } = communityData

      return (
        <Link to={`/c/${url}`} key={url}>
          <div className='row communityListItem'>
            <div className='col-6'>
              <h2>{name ? name : 'Untitled'}</h2>
              <div className='communityUrl'>{`c/${url}`}</div>
              <p className='communityDescription'>
                {description ? description : ''}
              </p>
            </div>
          </div>
        </Link>
      )
    })
  }

  return (
    <div className='container'>
      <h1>Communities</h1>
      <CreateCommunityForm />
      <div className='communityList'>{communityListItems()}</div>
    </div>
  )
}

export default CommunityList
