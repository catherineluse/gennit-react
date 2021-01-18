import React, { useState } from 'react';
import { REPLY_TO_EVENT_COMMENT } from '../../../../graphQLData/comments'
import { GET_EVENT } from '../../../../graphQLData/events'
import { useMutation, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

const ReplyToEventComment = ({ 
  authorUsername,
  text,
  handleClose,
  parentCommentId
 }) => {
  const { url, eventId } = useParams()
  const [reply, setReply] = useState("")

  const [addComment, { error }] = useMutation(REPLY_TO_EVENT_COMMENT, {
    variables: {
      authorUsername: "alice",
      eventId,
      text: reply,
      communityUrl: url,
      parentCommentId
    },
    errorPolicy: 'all',
    update(
      cache,
      {
        data: { addComment }
      }
    ) {
        const existingEvent = cache.readQuery({ 
          query: GET_EVENT,
          variables: {
            id: eventId
          } 
         });

        const newComment = addComment.comment[0]
        const existingComments = existingEvent.getEvent.Comments;
        const updatedComments = [newComment, ...existingComments]
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
  })

  const handleSubmit = async e => {
    e.preventDefault()

    const data = await addComment()
    
    if (error) {
      alert(error + "Could not add the comment: " + JSON.stringify({...data}))
    }
    handleClose()
  }

  return (
    <>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
            The comment you are replying to is:
            <p className="quoted-comment">
              {text}
            </p>
          <div className='form-group'>
            <input
              className='form-control'
              value={reply}
              placeholder='Reply here'
              onChange={e => setReply(e.target.value)}
            />
          </div>
         </form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button type='submit' variant='primary' onClick={handleSubmit}>
            Submit
          </Button>
      </Modal.Footer>
    </>
  )
}

export default ReplyToEventComment;