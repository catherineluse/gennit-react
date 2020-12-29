import React, { useState } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'
import { DELETE_COMMENT } from '../../../graphQLData/comments'
import {
  DELETE_COMMENTS,
} from '../../../graphQLData/comments'
import { Button, Modal } from 'react-bootstrap'
import { GET_COMMUNITY_WITH_COMMENTS } from '../../../graphQLData/communities';

const DeleteCommentForm = ({ 
  url,
  commentId, 
  handleClose,
  setCommentWasDeleted
}) => {

  const [deleteComment, { error: deleteCommentError }] = useMutation(
    DELETE_COMMENT
  )

  if (deleteCommentError) {
    throw new Error(`Delete comment error: ${deleteCommentError}`)
  }

  const handleDelete = async e => {
    e.preventDefault()

    deleteComment({
      variables: {
        id: commentId
      }
    })
    setCommentWasDeleted(true)

    handleClose()
  }

  return (
    <>
      <form>
      <Modal.Body>
      Are you sure you want to delete this comment?
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

export default DeleteCommentForm
