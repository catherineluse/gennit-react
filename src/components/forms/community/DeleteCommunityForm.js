import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@apollo/client'
import { DELETE_COMMUNITY } from '../../../graphQLData/communities'
import {
  DELETE_DISCUSSIONS,
  GET_DISCUSSIONS_IN_COMMUNITY
} from '../../../graphQLData/discussions'
import {
  DELETE_COMMENTS,
  GET_COMMENT_IDS_IN_COMMUNITY
} from '../../../graphQLData/comments'
import {
  DELETE_EVENTS,
  GET_EVENTS_IN_COMMUNITY
} from '../../../graphQLData/events'
import { Redirect } from 'react-router'

const DeleteCommunityForm = () => {
  const { url } = useParams()

  // get comments in community
  const  { 
    loading: loadingComments,
    error: getCommentIdsError, 
    data: commentData 
  } = useQuery(GET_COMMENT_IDS_IN_COMMUNITY, {
    variables: {
      url
    },
    errorPolicy: 'all'
  })

  // get discussions in community
  const { 
    loading: loadingDiscussions,
    error: getDiscussionIdsError, 
    data: discussionData
  } = useQuery(
    GET_DISCUSSIONS_IN_COMMUNITY,
    {
      variables: {
        url
      }
    }
  )

  // get events in community
  const {
    loading: loadingEvents,
    error: getEventIdsError,
    data: eventData
  } = useQuery(
    GET_EVENTS_IN_COMMUNITY,
    {
      variables: {
        url
      }
    }
  )

  const [deleteCommunity, { error: deleteCommunityError }] = useMutation(
    DELETE_COMMUNITY,
    {
      variables: {
        url
      },
      update(cache, { data: { deleteCommunity }}) {
        cache.modify({
          fields: {
            queryCommunity(existingCommunityRefs, { readField }) {
              return existingCommunityRefs.filter(
                communityRef => {
                  return url !== readField('url', communityRef)
                }
              );
            }
          }
        })
      }
    }
  )

  const [deleteDiscussions, { error: deleteDiscussionError }] = useMutation(
    DELETE_DISCUSSIONS
  )

  const [deleteComments, { error: deleteCommentError }] = useMutation(
    DELETE_COMMENTS
  )

  const [deleteEvents, { error: deleteEventError }] = useMutation(
    DELETE_EVENTS
  )

  const [deleteField, setDeleteField] = useState('')
  const [typedCommunitySuccessfully, setTypedCommunitySuccessfully] = useState(
    false
  )
  const [submitted, setSubmitted] = useState(false)

  if (loadingComments){
    return null;
  }

  if (getCommentIdsError) {
    alert(getCommentIdsError)
  }

  if (loadingDiscussions) {
    return null;
  }

  if (getDiscussionIdsError) {
    alert(getDiscussionIdsError)
  }

  if (loadingEvents) {
    return null;
  }

  if (getEventIdsError) {
    alert(getEventIdsError)
  }

  let discussionIds = []
  let commentIds = []
  let eventIds = []

  const handleDelete = async e => {
    e.preventDefault()
    setSubmitted(true)

    if (deleteField !== url) {
      throw new Error('Must match community URL.')
    }

    await deleteComments({
      variables: {
        id: commentIds
      }
    })
    if (deleteCommentError){
      alert(deleteCommentError)
    }

    await deleteDiscussions({
      variables: {
        id: discussionIds
      }
    })
    if (deleteDiscussionError) {
      alert(deleteDiscussionError)
    }

    await deleteEvents({
      variables: {
        id: eventIds
      }
    })
    if (deleteEventError) {
      alert(deleteEventError)
    }

    await deleteCommunity()
    if (deleteCommunityError) {
      alert(deleteCommunityError)
    }
  }

  const handleDeleteFieldChange = e => {
    setDeleteField(e.target.value)
    if (deleteField === url) {
      setTypedCommunitySuccessfully(true)
    }
  }

  if (submitted) {
    return (
      <Redirect
        push
        to={{
          pathname: `/communities`
        }}
      />
    )
  }

  if (!commentData.queryComment || !discussionData.queryDiscussion || !eventData.queryEvent) {
    return null
  }

  discussionIds = discussionData.queryDiscussion.map(discussion => discussion.id)
  eventIds = eventData.queryEvent.map(event => event.id)
  commentIds = commentData.queryComment.map(comment => comment.id)

  return (
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
            disabled={!typedCommunitySuccessfully || submitted}
            className='form-submit btn btn-danger'
          >
            Submit
          </button>
        </form>
      </>
    )
}

export default DeleteCommunityForm
