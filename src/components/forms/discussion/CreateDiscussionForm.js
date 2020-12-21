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

  let [author, setAuthor] = useState("")
  let [body, setBody] = useState("")
  let [title, setTitle] = useState("")
  let [newDiscussionId, setNewDiscussionId] = useState("")
  let [submitted, setSubmitted] = useState(false)

  const [addDiscussion] = useMutation(ADD_DISCUSSION, {
    variables: {
      url,
      author,
      title,
      body
    },
    onCompleted({ addDiscussion }){
      const newDiscussionId = addDiscussion.discussion[0].id
      setNewDiscussionId(newDiscussionId)
      setSubmitted(true)
    },
    update(cache, { data: { addDiscussion }}) {
      cache.modify({
        fields: {
          discussions(existingDiscussionRefs = [], { readField }) {
            const newDiscussionRef = cache.writeFragment({
              data: addDiscussion,
              fragment: gql`
                fragment NewDiscussion on Discussion {
                  id
                  type
                }
              `
            })

            // Quick safety check - if the new community is already
            // present in the cache, we don't need to add it again.
            if (existingDiscussionRefs.some(
              ref => readField('id', ref) === addDiscussion.id
            )) {
              return existingDiscussionRefs;
            }

            return [...existingDiscussionRefs, newDiscussionRef];
          }
        }
      })
    }
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
                placeholder='Questions often start good discussions.'
                className='form-control'
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Discussion Body</label>
              <input
                name='name'
                type='text'
                placeholder='Optionally expand on what is in the prompt.'
                className='form-control'
                onChange={e => setBody(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Author</label>
              <input
                name='organizer'
                type='text'
                className='form-control'
                onChange={ e => setAuthor(e.target.value) }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={ () => {setShow(false)} }>
            Close
          </Button>
          <button
            type='button'
            onClick={handleSubmit}
            className='form-submit btn btn-dark'
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateDiscussionForm
