import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useSelector } from 'react-redux'
import { Button, Modal } from 'react-bootstrap'
import { ADD_DISCUSSION } from '../../../graphQLData/discussions'
import { Redirect } from 'react-router'
import { useDispatch } from 'react-redux'

// dispatch({
//     type: "SET_CURRENT_DISCUSSION",
//     payload: {
//         ...currentDiscussion
//     }
// })

// type Discussion {
//     id:           ID!
//     Author:       User!
//     body:         String
//     Community:    Community!   @hasInverse(field: Discussions)
//     title:        String!
//     Comments:     [Comment]   @hasInverse(field: Discussion)
//    }

const CreateDiscussionForm = () => {
  const currentCommunity = useSelector(state => state.currentCommunity)
  const { url } = currentCommunity;
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [newDiscussionId, setNewDiscussionId] = useState("")

  const [author, setAuthor] = useState('')
  const [body, setBody] = useState('')
  const [title, setTitle] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [addDiscussion, { error }] = useMutation(ADD_DISCUSSION, {
    variables: {
      url,
      author,
      title,
      body
    }
  })

  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
        console.log('data to submit is ', {
            url,
            author,
            title,
            body
          })
      const { data } = await addDiscussion()
      
      const newDiscussion = data.addDiscussion.discussion[0]
      console.log('new discussion is ', data)
      setNewDiscussionId(newDiscussion.id)

      dispatch({
        type: 'ADD_DISCUSSION',
        payload: {
          ...newDiscussion
        }
      })

      dispatch({
        type: 'SET_CURRENT_DISCUSSION',
        payload: {
          ...newDiscussion
        }
      })

      dispatch({
          type: 'SET_CURRENT_COMMUNITY',
          payload: {
              ...currentCommunity,
              Discussions: [newDiscussion, ...currentCommunity.Discussions]
          }
      })
      handleClose()
      setSubmitted(true)
    } catch (e) {
      console.log('Add discussion error: ', e) 
      alert('The add discussion mutation returned: ', e)
      alert(error)
    }
    // need to add dispatch to update communities
    // need to redirect to new community
  }

  const handleTitleChange = e => {
    setTitle(e.target.value)
  }

  const handleBodyChange = e => {
    setBody(e.target.value)
  }

  const handleAuthorChange = e => {
    setAuthor(e.target.value)
  }

  return submitted ? (
    <Redirect
      push
      to={{
        pathname: `/c/${url}/discussion/${newDiscussionId}`
      }}
    />
  ) : (
    <>
      <Button className='discussionListButton' variant='primary' onClick={handleShow}>
        + Start Discussion
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start a Discussion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Discussion Prompt</label>
              <input
                name='url'
                type='text'
                placeholder='Questions often start good discussions.'
                className='form-control'
                onChange={handleTitleChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Discussion Body</label>
              <input
                name='name'
                type='text'
                placeholder='Optionally expand on what is in the prompt.'
                className='form-control'
                onChange={handleBodyChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Author</label>
              <input
                name='organizer'
                type='text'
                className='form-control'
                onChange={handleAuthorChange}
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
      </Modal>
    </>
  )
}

export default CreateDiscussionForm
