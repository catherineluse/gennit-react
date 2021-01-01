import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Modal } from 'react-bootstrap'
import { UPDATE_EVENT } from '../../../graphQLData/events'

const EditEventForm = ({ 
    eventId, 
    currentEvent, 
    handleClose 
}) => {
    const { 
        title, 
        description,
        startDay,
        startTime,
        durationInMinutes,
        location,
        isVirtual 
    } = currentEvent;
  
    const [titleField, setTitleField] = useState(title)
    const [descriptionField, setDescriptionField] = useState(description)
    const [startDayField, setStartDayField] = useState(startDay)
    const [startTimeField, setStartTimeField] = useState(startTime)
    const [durationInMinutesField, setDurationInMinutesField] = useState(durationInMinutes)
    const [locationField, setLocationField] = useState(location)
    const [isVirtualField, setIsVirtualField] = useState(isVirtual)
  
    const [updateEvent, { error }] = useMutation(UPDATE_EVENT, {
      variables: {
        id: eventId,
        title: titleField,
        description: descriptionField,
        startDay: startDayField,
        startTime: startTimeField,
        durationInMinutes: durationInMinutesField,
        location: locationField,
        isVirtual: isVirtualField
      },
      errorPolicy: 'all'
    })

    if (error){ 
        alert(error)
    };
  
    const handleSubmit = async e => {
      e.preventDefault()
      updateEvent()
      handleClose()
    }
  
    return (
        <>
        <Modal.Body>
            <form>
              <div className='form-group'>
                <label htmlFor='name'>Event Name</label>
                <input
                  title='title'
                  className='form-control'
                  value={titleField}
                  onChange={e => setTitleField(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='eventDescription'>Description</label>
                <input
                  component='textarea'
                  rows='3'
                  name='description'
                  className='form-control'
                  value={descriptionField}
                  onChange={e => setDescriptionField(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='day'>Day</label>
                <input
                  title='startDay'
                  className='form-control'
                  value={startDayField}
                  onChange={e => setStartDayField(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='time'>Time</label>
                <input
                  title='startTime'
                  className='form-control'
                  value={startTimeField}
                  onChange={e => setStartTimeField(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='duration'>Duration in Minutes</label>
                <input
                  title='durationInMinutes'
                  className='form-control'
                  value={durationInMinutesField}
                  onChange={e => setDurationInMinutesField(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='location'>Location</label>
                <input
                  title='Location'
                  className='form-control'
                  value={locationField}
                  onChange={e => setLocationField(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='isVirtual'>Is Virtual</label>
                <input
                  title='isVirtual'
                  className='form-control'
                  value={isVirtual}
                  disabled
                  onChange={e => setIsVirtualField(e.target.value)}
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

export default EditEventForm
