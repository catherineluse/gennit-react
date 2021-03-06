import React from 'react'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { GET_COMMUNITIES } from '../graphQLData/communities'
import CreateCommunityForm from './forms/community/CreateCommunityForm'

const CommunityList = () => {

  const { 
    loading, 
    error, 
    data 
  } = useQuery(GET_COMMUNITIES)

  if (loading) {
    return <p>Loading...</p>
  }
  
  if (error) {
      return <p>{`GET_COMMUNITIES error: ${error}`}</p>
  }

  const communityListItems = () => {
    const communities = data.queryCommunity;

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
