import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Button, Modal } from 'react-bootstrap'
import { ADD_DISCUSSION } from '../../../graphQLData/discussions'
import { Redirect } from 'react-router'

// type Discussion {
//     id:           ID!
//     Author:       User!
//     body:         String
//     Community:    Community!   @hasInverse(field: Discussions)
//     title:        String!
//     Comments:     [Comment]   @hasInverse(field: Discussion)
//    }

const CreateDiscussionForm = ({ 
  currentCommunity
}) => {
  const { url } = currentCommunity;
  const [show, setShow] = useState(false)

  let [body, setBody] = useState("")
  let [title, setTitle] = useState("")
  let [newDiscussionId, setNewDiscussionId] = useState("")
  let [submitted, setSubmitted] = useState(false)

  const [addDiscussion] = useMutation(ADD_DISCUSSION, {
    variables: {
      url,
      author: "alice",
      title,
      body
    },
    onCompleted({ addDiscussion }){
      const newDiscussionId = addDiscussion.discussion[0].id
      setNewDiscussionId(newDiscussionId)
      setSubmitted(true)
    },
    // update(
    //   cache,
    //   {
    //     data: { addComment }
    //   }
    // ) {
    //     const existingDiscussion = cache.readQuery({ 
    //       query: GET_DISCUSSION,
    //       variables: {
    //         id: discussionId
    //       } 
    //      });

    //     const newComment = addComment.comment[0]
    //     const existingComments = existingDiscussion.getDiscussion.Comments;
    //     const updatedComments = [newComment, ...existingComments]
    //     cache.writeFragment({
    //       id: 'Discussion:' + discussionId,
    //       fragment: gql`
    //         fragment updatedComments on Discussion {
    //           Comments
    //         }
    //       `,
    //       data: {
    //         Comments: updatedComments
    //       }
    //     })
      
    // }
  })

  const handleSubmit = async e => {
    e.preventDefault()
    addDiscussion()
    setShow(false)
  }

  return submitted && newDiscussionId ? (
    <Redirect
      push
      to={{
        pathname: `/c/${url}/discussion/${newDiscussionId}`
      }}
    />
  ) : (
    <>
      <Button 
        className='discussionListButton'
        variant='primary' 
        onClick={() => setShow(true)}
      >
        + Start Discussion
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Start a Discussion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Discussion Prompt</label>
              <input
                name='title'
                type='text'
                className='form-control'
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Discussion Body</label>
              <input
                name='name'
                type='text'
                className='form-control'
                onChange={e => setBody(e.target.value)}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={ () => {setShow(false)} }>
            Close
          </Button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateDiscussionForm
