import React, { useState } from 'react';
import { CREATE_EVENT_ROOT_COMMENT } from '../../../../graphQLData/comments'
import { GET_EVENT } from '../../../../graphQLData/events'
import { useMutation, gql } from '@apollo/client'
import { Form, FormGroup, Input } from 'reactstrap'

const EventRootCommentForm = ({ 
  eventId, 
  communityUrl
 }) => {

  const [text, setText] = useState("")

  const [addComment, { error }] = useMutation(CREATE_EVENT_ROOT_COMMENT, {
    variables: {
      authorUsername: "alice",
      eventId,
      text,
      communityUrl
    },
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
      alert(error + "Could not add the commemt: " + JSON.stringify({...data.addComment}))
    }
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          name='commentText'
          type='textarea'
          className='form-control'
          value={text}
          placeholder="Add a comment here"
          onChange={e => setText(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </FormGroup>
    </Form>
    </>
  )
}

export default EventRootCommentForm;