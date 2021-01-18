import React from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'
import { DELETE_DISCUSSION } from '../../../graphQLData/discussions'
import {
  DELETE_COMMENTS,
  GET_COMMENT_IDS_IN_DISCUSSION
} from '../../../graphQLData/comments'
import { Button, Modal } from 'react-bootstrap'
import { GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS } from '../../../graphQLData/communities';

const DeleteDiscussionForm = ({ 
  url,
  discussionId, 
  handleClose,
  setDiscussionWasDeleted
}) => {
  let commentIds = []

  const  { 
    loading: commentIdsAreLoading, 
    error: getCommentIdsError,
    data: commentData
  } = useQuery(GET_COMMENT_IDS_IN_DISCUSSION, {
    variables: {
      id: discussionId
    },
    errorPolicy: 'all'
  })

  const [deleteComments, { error: deleteCommentError }] = useMutation(
    DELETE_COMMENTS
  )

  const [deleteDiscussion, { error: deleteDiscussionError}] = useMutation(
    DELETE_DISCUSSION, {
    update(cache) {
        const existingCommunity = cache.readQuery({ 
          query: GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS,
          variables: {
            url
          } 
         });
        const existingCommunityData = existingCommunity.getCommunity
        const existingDiscussions = existingCommunityData.Discussions;
        const updatedDiscussions = existingDiscussions.filter(discussion => {
          return discussion.id !== discussionId;
        })
        
        cache.writeFragment({
          id: cache.identify(existingCommunityData),
          fragment: gql`
            fragment updatedDiscussions on Community {
              Discussions
            }
          `,
          data: {
            Discussions: updatedDiscussions
          }
        })
    }}
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
  commentIds = commentData.queryComment.map(comment => comment.id)


  const handleDelete = async e => {
    e.preventDefault()

    deleteComments({
      variables: {
        id: commentIds
      }
    })

    deleteDiscussion({
      variables: {
        id: discussionId
      }
    })
    setDiscussionWasDeleted(true)

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
