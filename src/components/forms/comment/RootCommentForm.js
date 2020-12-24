import React, { useState } from 'react';
import { CREATE_ROOT_COMMENT } from '../../../graphQLData/comments'
import { GET_DISCUSSION } from '../../../graphQLData/discussions'
import { useMutation, gql } from '@apollo/client'
import { Form, FormGroup, Input } from 'reactstrap'
import cache from '../../../cache'


const RootCommentForm = ({ 
  discussionId, 
  communityUrl
 }) => {

  const [text, setText] = useState("")

  const [addComment, { error }] = useMutation(CREATE_ROOT_COMMENT, {
    variables: {
      authorUsername: "alice",
      discussionId,
      text,
      communityUrl
    },
    update(
      cache,
      {
        data: { addComment }
      }
    ) {
      cache.modify({
        fields: {
          comments(existingComments = []) {
            const newCommentRef = cache.writeFragment({
              data: addComment,
              fragment: gql`
                fragment NewComment on Comment {
                  id
                  text
                }
              `
            });
            return existingComments.concat(newCommentRef);
          }
        }
      })
    }
  })


  const handleSubmit = async e => {
    e.preventDefault()

    const data = await addComment()
    
    if (error) {
      alert(error + "Could not add the community: " + JSON.stringify({...data.addComment.community[0]}))
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
          placeholder="Reply here"
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

export default RootCommentForm;