import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'
import { Button, Modal } from 'react-bootstrap'
import { ADD_EVENT } from '../../../graphQLData/events'
import { GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS } from '../../../graphQLData/communities'
import { Redirect } from 'react-router'

const CreateEventForm = ({ 
  currentCommunity
}) => {
  const { url } = currentCommunity;
  const [show, setShow] = useState(false)
  const [newEventId, setNewEventId] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startDay, setStartDay] = useState("")
  const [startTime, setStartTime] = useState("")
  const [durationInMinutes, setDurationInMinutes] = useState(0)
  const [location, setLocation] = useState("")
  const [isVirtual, setIsVirtual] = useState(false)

  const [addEvent] = useMutation(ADD_EVENT, {
    variables: {
      title,
      description,
      startDay,
      startTime,
      durationInMinutes,
      communityUrl: url,
      location,
      isVirtual: false,
      organizer: "alice"
    },
    onCompleted({ addEvent }){
      const newEventId = addEvent.event[0].id
      setNewEventId(newEventId)
      setSubmitted(true)
    },
    update(
      cache,
      {
        data: { addEvent }
      }
    ) {
        const existingCommunity = cache.readQuery({ 
          query: GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS,
          variables: {
            url
          } 
         });

        const newEvent = addEvent.event[0]
        const existingCommunityData = existingCommunity.getCommunity
        const existingEvents = existingCommunityData.Events;
        const updatedEvents = [newEvent, ...existingEvents]
        
        cache.writeFragment({
          id: cache.identify(existingCommunityData),
          fragment: gql`
            fragment updatedEvents on Community {
              Events
            }
          `,
          data: {
            Events: updatedEvents
          }
        })
    }
  })

  const handleSubmit = async e => {
    e.preventDefault()
    addEvent()
    setShow(false)
  }

  return submitted && newEventId ? (
    <Redirect
      push
      to={{
        pathname: `/c/${url}/event/${newEventId}`
      }}
    />
  ) : (
    <>
      <Button 
        className='communityActionButton'
        variant='primary' 
        onClick={() => setShow(true)}
      >
        + Create Event
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create an Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor='name'>Event Name</label>
              <input
                name='title'
                type='text'
                value={title}
                className='form-control'
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Description</label>
              <input
                name='description'
                type='text'
                value={description}
                className='form-control'
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Day</label>
              <input
                name='startDay'
                type='text'
                value={startDay}
                className='form-control'
                onChange={e => setStartDay(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Time</label>
              <input
                name='startDay'
                type='text'
                value={startTime}
                className='form-control'
                onChange={e => setStartTime(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Duration in Minutes</label>
              <input
                name='durationInMinutes'
                type='text'
                value={durationInMinutes}
                className='form-control'
                onChange={e => setDurationInMinutes(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Location</label>
              <input
                name='location'
                type='text'
                value={location}
                className='form-control'
                onChange={e => setLocation(e.target.value)}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='name'>Is Virtual</label>
              <input
                name='durationInMinutes'
                type='text'
                value={isVirtual}
                disabled
                className='form-control'
                onChange={e => setIsVirtual(e.target.value)}
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

export default CreateEventForm
