import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Button, Modal } from 'react-bootstrap'
import { ADD_COMMUNITY } from '../../../graphQLData/communities'
import { Redirect } from 'react-router'

const CreateCommunityForm = () => {
  const [show, setShow] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [organizer, setOrganizer] = useState("")
  const [url, setUrl] = useState("")

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [addCommunity, { error }] = useMutation(ADD_COMMUNITY, {
    variables: {
      url,
      name,
      description,
      organizer
    },
    update(
      cache,
      {
        data: { addCommunity }
      }
    ) {
      const newCommunity = addCommunity.community[0];
      console.log('new community is ', addCommunity.community[0])
      cache.modify({
        fields: {
          queryCommunity(existingCommunityRefs = [], { readField }) {
            const newCommunityRef = cache.writeFragment({
              data: newCommunity,
              fragment: gql`
                fragment NewCommunity on Community {
                  url
                }
              `
            })

            // Quick safety check - if the new community is already
            // present in the cache, we don't need to add it again.
            if (existingCommunityRefs.some(
              ref => readField('url', ref) === addCommunity.url
            )) {
              return existingCommunityRefs;
            }
            return [newCommunityRef, ...existingCommunityRefs];
          }
        }
      })
    }
  })

  const handleSubmit = async e => {
    e.preventDefault()
    const { data } = await addCommunity()
    
    if (error) {
      alert(error + "Could not add the community: " + JSON.stringify({...data.addCommunity.community[0]}))
    }
    
    handleClose()
    setSubmitted(true)
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
                onChange={e => setUrl(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Community Name</label>
              <input
                name='name'
                type='text'
                className='form-control'
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='communityDescription'>Description</label>
              <input
                component='textarea'
                rows='3'
                name='description'
                className='form-control'
                onChange={e => setDescription(e.target.value)}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='name'>Organizer</label>
              <input
                name='organizer'
                type='text'
                className='form-control'
                onChange={e => setOrganizer(e.target.value)}
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
