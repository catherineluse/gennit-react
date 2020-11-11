import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { DELETE_COMMUNITY } from '../../graphQLData/communities'
import {
  DELETE_DISCUSSIONS,
  GET_DISCUSSIONS_IN_COMMUNITY
} from '../../graphQLData/discussions'
import {
  DELETE_COMMENTS,
  GET_COMMENT_IDS_IN_COMMUNITY
} from '../../graphQLData/comments'
import { Redirect } from 'react-router'

const mapObjectsToIds = objectArray => {
  return objectArray.map(e => {
    return e.id
  })
}

const DeleteCommunityForm = ({ url }) => {
  const dispatch = useDispatch()
  const getIdsOfCommentsInCommunity = useQuery(GET_COMMENT_IDS_IN_COMMUNITY, {
    variables: {
      url
    }
  })
  const getIdsOfDiscussionsInCommunity = useQuery(
    GET_DISCUSSIONS_IN_COMMUNITY,
    {
      variables: {
        url
      }
    }
  )
  const [deleteField, setDeleteField] = useState('')
  const [typedCommunitySuccessfully, setTypedCommunitySuccessfully] = useState(
    false
  )
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [commentsToDelete, setCommentsToDelete] = useState([])
  const [discussionsToDelete, setDiscussionsToDelete] = useState([])

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
        id: discussionsToDelete
      }
    }
  )

  const [deleteComments, { error: deleteCommentError }] = useMutation(
    DELETE_COMMENTS,
    {
      variables: {
        id: commentsToDelete
      }
    }
  )

  const handleDelete = async e => {
    e.preventDefault()

    if (deleteField !== url) {
      setError('Must match community URL.')
      return
    }

    try {
      const commentsToDelete = await getIdsOfCommentsInCommunity()
      const commentIdsForDeletion = mapObjectsToIds(commentsToDelete)
      setCommentsToDelete(commentIdsForDeletion)
      await deleteComments()
    } catch (e) {
      console.log('Delete comments error:', e)
      console.log('Delete comment error', deleteCommentError)
    }

    try {
      const discussionsToDelete = await getIdsOfDiscussionsInCommunity()
      const discussionIdsForDeletion = mapObjectsToIds(discussionsToDelete)
      setDiscussionsToDelete(discussionIdsForDeletion)
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
        {error}
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
