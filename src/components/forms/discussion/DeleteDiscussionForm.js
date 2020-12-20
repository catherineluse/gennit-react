import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_DISCUSSION } from '../../../graphQLData/discussions'
import {
  DELETE_COMMENTS,
  GET_COMMENT_IDS_IN_DISCUSSION
} from '../../../graphQLData/comments'
import { Button, Modal } from 'react-bootstrap'

const DeleteDiscussionForm = ({ discussionId, handleClose}) => {
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
  if (deleteCommentError) {
    throw new Error(`Delete comment error: ${deleteCommentError}`)
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

    await deleteDiscussion({
      variables: {
        id: discussionId
      }
    })

    handleClose()
  }

  return (
    <>
      <form>
      <Modal.Body>
      Are you sure you want to delete this discussion and all of the comments?
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
          Close
        </Button>
        <Button type='submit' variant='danger' onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
      </form>
    </>
  )
}

export default DeleteDiscussionForm
