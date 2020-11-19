import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GET_DISCUSSION } from '../graphQLData/discussions'
import EditDiscussionForm from './forms/discussion/EditDiscussionForm'
import DeleteDiscussionForm from './forms/discussion/DeleteDiscussionForm'

const renderComments = Comments => {
  return Comments.map((commentData, i) => {
    const { text } = commentData
    const { username } = commentData.Author

    return (
      <div className='comment' key={i}>
        <div className='commentAuthor'>
          <Link to={`/u/${username}`}>{username}</Link>
        </div>
        <div className='commentText'>{text}</div>
      </div>
    )
  })
}

const renderDiscussionPage = (discussionData, url) => {
  const { title, body, Author, Comments } = discussionData;
  const { username } = Author
  return (
    <div className='discussionPage'>
      <div className='communitySectionTitle'>DISCUSSION IN {`c/${url}`}</div>
      
      <div className='discussionBody'>
        <h2>{title}</h2>
        {body}
        <div className='discussionAuthor'>
          Posted by{' '}
          <Link to={`/u/${username ? username : '[deleted]'}`}>{`/u/${
            username ? username : '[deleted'
          }`}</Link>
        </div>
        <EditDiscussionForm discussionData={discussionData} />
      </div>
      
      <div className='communitySectionTitle'>COMMENTS</div>
      {renderComments(Comments)}
    </div>
  )
}

const Discussion = () => {
  const { url, discussionId } = useParams()
  const discussionData = useSelector(state => state.currentDiscussion)
  // discussion data is in the format: { currentDiscussion: {...}}
  const { currentDiscussion } = discussionData
  const dispatch = useDispatch()

  const { loading: discussionIsLoading, error, data } = useQuery(
    GET_DISCUSSION,
    {
      variables: {
        id: discussionId
      }
    }
  )
  
  const getDiscussion = () => {
    if (discussionIsLoading) {
      return null
    }
    if (error) {
      alert(`GET_DISCUSSION error: ${error}`)
    }
    if (data.getDiscussion) {
      dispatch({
        type: 'SET_CURRENT_DISCUSSION',
        payload: data.getDiscussion
      })
    }
  }

  useEffect(() => {
    getDiscussion()
    // eslint-disable-next-line
  }, [discussionData])

  return Object.keys(currentDiscussion).length === 0 ? <div>Loading...</div> : (
    <div className='container'>{renderDiscussionPage(discussionData.currentDiscussion, url)}</div>
  )
}

export default Discussion
