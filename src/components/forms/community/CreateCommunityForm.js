import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Modal } from 'react-bootstrap'
import { ADD_COMMUNITY } from '../../../graphQLData/communities'
import { Redirect } from 'react-router'
import { useDispatch } from 'react-redux'

// dispatch({
//     type: "SET_CURRENT_COMMUNITY",
//     payload: {
//         ...currentCommunity,
//         name,
//         description
//     }
// })

const CreateCommunityForm = () => {
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [organizer, setOrganizer] = useState('')
  const [url, setUrl] = useState('')

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [addCommunity, { error }] = useMutation(ADD_COMMUNITY, {
    variables: {
      url,
      name,
      description,
      organizer
    }
  })

  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await addCommunity()
      handleClose()
      setSubmitted(true)

      dispatch({
        type: 'ADD_COMMUNITY',
        payload: {
          ...data.addCommunity.community[0]
        }
      })
    } catch (e) {
      alert('add community returned', e)
      alert(error)
    }
    // need to add dispatch to update communities
    // need to redirect to new community
  }

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handleDescriptionChange = e => {
    setDescription(e.target.value)
  }

  const handleUrlChange = e => {
    setUrl(e.target.value)
  }

  const handleOrganizerChange = e => {
    setOrganizer(e.target.value)
  }

  return submitted ? (
    <Redirect
      push
      to={{
        pathname: `/c/${url}`
      }}
    />
  ) : (
    <>
      <Button variant='primary' onClick={handleShow}>
        + Create Community
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Community</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Community URL</label>
              <input
                name='url'
                type='text'
                className='form-control'
                onChange={handleUrlChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Community Name</label>
              <input
                name='name'
                type='text'
                className='form-control'
                onChange={handleNameChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='communityDescription'>Description</label>
              <input
                component='textarea'
                rows='3'
                name='description'
                className='form-control'
                onChange={handleDescriptionChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Organizer</label>
              <input
                name='organizer'
                type='text'
                className='form-control'
                onChange={handleOrganizerChange}
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

export default CreateCommunityForm
