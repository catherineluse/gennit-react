import React from 'react'
import { useMutation, gql } from '@apollo/client'
import { DELETE_COMMENT } from '../../../../graphQLData/comments'
import { GET_DISCUSSION } from '../../../../graphQLData/discussions'
import { Button, Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const DeleteCommentInDiscussion = ({ 
  commentId, 
  handleClose,
}) => {
  const { discussionId } = useParams()
  const [deleteComment, { error: deleteCommentError }] = useMutation(
    DELETE_COMMENT,
    {
      variables: {
        id: commentId
      },
      update(
        cache
      ) {
          const existingDiscussion = cache.readQuery({ 
            query: GET_DISCUSSION,
            variables: {
              id: discussionId
            } 
           });
  
          const existingComments = existingDiscussion.getDiscussion.Comments;
          const updatedComments = existingComments.filter(comment => {
            return comment.id !== commentId
          })
          cache.writeFragment({
            id: 'Discussion:' + discussionId,
            fragment: gql`
              fragment updatedDiscussionComments on Discussion {
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

export default DeleteCommentInDiscussion
