import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_DISCUSSION } from '../../../graphQLData/discussions'
import {
  DELETE_COMMENTS,
  GET_COMMENT_IDS_IN_DISCUSSION
} from '../../../graphQLData/comments'
import { Redirect } from 'react-router'

const DeleteDiscussionForm = () => {
  const { url, discussionId } = useParams()
  const [submitted, setSubmitted] = useState(false)
  const [commentIds, setCommentIds] = useState([])
  const  { 
    loading: commentIdsAreLoading, 
    error: getCommentIdsError
  } = useQuery(GET_COMMENT_IDS_IN_DISCUSSION, {
    variables: {
      id: discussionId
    },
    onCompleted: (data) => {
      const commentIds = data.queryComment.map(comment => comment.id)
      setCommentIds(commentIds)
    },
    errorPolicy: 'all'
  })

  const [deleteComments, { error: deleteCommentError }] = useMutation(
    DELETE_COMMENTS
  )

  const [deleteDiscussion, { error: deleteDiscussionError}] = useMutation(
    DELETE_DISCUSSION
  )

  if (commentIdsAreLoading) {
    return null
  }
  if (getCommentIdsError) {
    throw new Error(`GET_COMMENT_IDS_IN_DISCUSSION error: ${getCommentIdsError}`)
  }
  if (deleteDiscussionError) {
    throw new Error(`Delete discussion error: ${deleteDiscussionError}`)
  }

  const handleDelete = async e => {
    e.preventDefault()

    await deleteComments({
      variables: {
        id: commentIds
      }
    })

    if (deleteCommentError) {
      throw new Error(deleteCommentError)
    }

    await deleteDiscussion({
      variables: {
        id: discussionId
      }
    })

    if (deleteDiscussionError){
      throw new Error(deleteDiscussionError)
    }

    setSubmitted(true)
  }

  return submitted ? (
    <Redirect
      push
      to={{
        pathname: `/c/${url}`
      }}
    />
  ) : (
    <>
      <h3 className='formTitle'>Delete Discussion</h3>
      <form>
        <button
          type='button'
          onClick={handleDelete}
          className='form-submit btn btn-danger'
        >
          Submit
        </button>
      </form>
    </>
  )
}

export default DeleteDiscussionForm
