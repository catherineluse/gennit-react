import React, { useState } from 'react';
import { CREATE_CHILD_COMMENT } from '../../../graphQLData/comments'
import { GET_DISCUSSION } from '../../../graphQLData/discussions'
import { useMutation, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'

const ReplyToCommentForm = ({ 
  authorUsername,
  text,
  handleClose,
  parentCommentId
 }) => {
  const { url, discussionId } = useParams()
  const [reply, setReply] = useState("")

  const [addComment, { error }] = useMutation(CREATE_CHILD_COMMENT, {
    variables: {
      authorUsername: "alice",
      discussionId,
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
        const existingDiscussion = cache.readQuery({ 
          query: GET_DISCUSSION,
          variables: {
            id: discussionId
          } 
         });

        const newComment = addComment.comment[0]
        const existingComments = existingDiscussion.getDiscussion.Comments;
        const updatedComments = [newComment, ...existingComments]
        cache.writeFragment({
          id: 'Discussion:' + discussionId,
          fragment: gql`
            fragment updatedComments on Discussion {
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

export default ReplyToCommentForm;