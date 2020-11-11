import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { DELETE_COMMUNITY } from '../../../graphQLData/communities'
import {
  DELETE_DISCUSSIONS,
  GET_DISCUSSIONS_IN_COMMUNITY
} from '../../../graphQLData/discussions'
import {
  DELETE_COMMENTS,
  GET_COMMENT_IDS_IN_COMMUNITY
} from '../../../graphQLData/comments'
import { Redirect } from 'react-router'

const mapObjectsToIds = objectArray => {
  return objectArray.map(e => {
    return e.id
  })
}

const DeleteCommunityForm = ({ url }) => {
  const [commentsToDelete, setCommentsToDelete] = useState([])
  const [discussionsToDelete, setDiscussionsToDelete] = useState([])
  const [commentIds, setCommentIds] = useState([])
  const [discussionIds, setDiscussionIds] = useState([])

  const dispatch = useDispatch()

  const  { loading: commentIdsAreLoading, error: getCommentIdsError, data: commentData } = useQuery(GET_COMMENT_IDS_IN_COMMUNITY, {
    variables: {
      url
    }
  })


  const getCommentIdsToDelete = () => {
    if (commentIdsAreLoading) {
      return null
    }
    if (getCommentIdsError) {
      throw new Error(`GET_COMMENT_IDS_IN_COMMUNITY error: ${getCommentIdsError}`)
    }
    if (commentData.queryComment) {
      setCommentsToDelete(commentData.queryComment)
    }
  }

  const { loading: discussionIdsAreLoading, error: getDiscussionIdsError, data: discussionData} = useQuery(
    GET_DISCUSSIONS_IN_COMMUNITY,
    {
      variables: {
        url
      }
    }
  )

  const getDiscussionIdsToDelete = () => {
    if (discussionIdsAreLoading) {
      return null
    }
    if (getDiscussionIdsError) {
      throw new Error(`GET_DISCUSSIONS_IN_COMMUNITY error: ${getDiscussionIdsError}`)
    }
    if (discussionData.queryDiscussion) {
      setDiscussionsToDelete(discussionData.queryDiscussion)
    }
  }

  const [deleteField, setDeleteField] = useState('')
  const [typedCommunitySuccessfully, setTypedCommunitySuccessfully] = useState(
    false
  )
  const [submitted, setSubmitted] = useState(false)
  

  const [deleteCommunity, { error: deleteCommunityError }] = useMutation(
    DELETE_COMMUNITY,
    {
      variables: {
        url
      }
    }
  )

  const [deleteDiscussions, { error: deleteDiscussionError }] = useMutation(
    DELETE_DISCUSSIONS,
    {
      variables: {
        id: discussionIds
      }
    }
  )

  const [deleteComments, { error: deleteCommentError }] = useMutation(
    DELETE_COMMENTS,
    {
      variables: {
        id: commentIds
      }
    }
  )

  const handleDelete = async e => {
    e.preventDefault()

    if (deleteField !== url) {
      throw new Error('Must match community URL.')
    }

    try {
      await getCommentIdsToDelete()
      const commentIdsForDeletion = mapObjectsToIds(commentsToDelete)
      setCommentIds(commentIdsForDeletion)
      await deleteComments()
    } catch (e) {
      console.log('Delete comments error:', e)
      console.log('Delete comment error', deleteCommentError)
    }

    try {
      await getDiscussionIdsToDelete()
      const discussionIdsForDeletion = mapObjectsToIds(discussionsToDelete)
      setDiscussionIds(discussionIdsForDeletion)
      await deleteDiscussions()
    } catch (e) {
      console.log('Delete discussion error', e)
      console.log('Delete discussion error:', deleteDiscussionError)
    }

    try {
      await deleteCommunity()

      dispatch({
        type: 'DELETE_COMMUNITY',
        payload: {
          url
        }
      })

      setSubmitted(true)
    } catch (e) {
      alert('Community error:', e)
      alert('Delete community error:', deleteCommunityError)
    }
  }

  const handleDeleteFieldChange = e => {
    setDeleteField(e.target.value)
    if (deleteField === url) {
      setTypedCommunitySuccessfully(true)
    }
  }

  return submitted ? (
    <Redirect
      push
      to={{
        pathname: `/communities`
      }}
    />
  ) : (
    <>
      <h3 className='formTitle'>Delete Community</h3>
      <form>
        <div className='form-group'>
          <label htmlFor='communityDescription'>
            Type {url} to confirm deletion
          </label>
          <input
            component='textarea'
            rows='3'
            type='description'
            name='description'
            placeholder={url}
            className='form-control'
            onKeyUp={handleDeleteFieldChange}
          />
        </div>
        <button
          type='button'
          onClick={handleDelete}
          disabled={!typedCommunitySuccessfully}
          className='form-submit btn btn-danger'
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default DeleteCommunityForm
