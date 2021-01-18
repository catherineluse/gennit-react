import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { DELETE_COMMENT } from '../../../../graphQLData/comments'
import { GET_EVENT } from '../../../../graphQLData/events'
import { Button, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const DeleteCommentOnEvent = ({ 
  commentId, 
  handleClose,
}) => {
  const { eventId } = useParams()
  const [deleteComment, { error: deleteCommentError }] = useMutation(
    DELETE_COMMENT,
    {
      variables: {
        id: commentId
      },
      update(
        cache
      ) {
          const existingEvent = cache.readQuery({ 
            query: GET_EVENT,
            variables: {
              id: eventId
            } 
           });
  
          const existingComments = existingEvent.getEvent.Comments;
          const updatedComments = existingComments.filter(comment => {
            return comment.id !== commentId
          })
          cache.writeFragment({
            id: 'Event:' + eventId,
            fragment: gql`
              fragment updatedEventComments on Event {
                Comments
              }
            `,
            data: {
              Comments: updatedComments
            }
          })
      }
    }
  )

  if (deleteCommentError) {
    throw new Error(`Delete comment error: ${deleteCommentError}`)
  }

  const handleDelete = async e => {
    e.preventDefault()
    deleteComment()
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

export default DeleteCommentOnEvent
