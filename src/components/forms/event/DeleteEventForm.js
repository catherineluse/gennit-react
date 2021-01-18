import React from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'
import { DELETE_EVENT } from '../../../graphQLData/events'
import {
  DELETE_COMMENTS,
  GET_COMMENT_IDS_IN_EVENT
} from '../../../graphQLData/comments'
import { Button, Modal } from 'react-bootstrap'
import { GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS } from '../../../graphQLData/communities';

const DeleteEventForm = ({ 
  url,
  eventId, 
  handleClose,
  setEventWasDeleted
}) => {
  let commentsToDelete = []

  const  { 
    loading: commentIdsAreLoading, 
    error: getCommentIdsError,
    data: commentData
  } = useQuery(GET_COMMENT_IDS_IN_EVENT, {
    variables: {
      id: eventId
    },
    errorPolicy: 'all'
  })

  const [deleteComments, { error: deleteCommentError }] = useMutation(
    DELETE_COMMENTS
  )

  const [deleteEvent, { error: deleteEventError}] = useMutation(
    DELETE_EVENT, 
    {
      update(
          cache
      ) {
        const existingCommunity = cache.readQuery({ 
          query: GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS,
          variables: {
            url
          } 
         });
        
        if (!existingCommunity){
          return;
        }
        const existingCommunityData = existingCommunity.getCommunity
        const existingEvents = existingCommunityData.Events;
        const updatedEvents = existingEvents.filter(event => {
          return event.id !== eventId;
        })
        
        cache.writeFragment({
          id: cache.identify(existingCommunityData),
          fragment: gql`
            fragment updatedEvents on Community {
              Events
            }
          `,
          data: {
            Events: updatedEvents
          }
        })
    }}
  )

  if (commentIdsAreLoading) {
    return null
  }
  if (getCommentIdsError) {
    throw new Error(`GET_COMMENT_IDS_IN_EVENT error: ${getCommentIdsError}`)
  }
  if (deleteCommentError) {
    throw new Error(`Delete comment error: ${deleteCommentError}`)
  }
  if (deleteEventError) {
    throw new Error(`Delete event error: ${deleteEventError}`)
  }

  commentsToDelete = commentData.queryComment.map(comment => comment.id)
  console.log("comments to delete are ", commentsToDelete)

  const handleDelete = async e => {
    e.preventDefault()

    await deleteComments({
      variables: {
        id: commentsToDelete
      }
    })

    await deleteEvent({
      variables: {
        id: eventId
      }
    })
    setEventWasDeleted(true)

    handleClose()
  }

  return (
    <>
      <form>
      <Modal.Body>
      Are you sure you want to delete this event and all of the comments?
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

export default DeleteEventForm
