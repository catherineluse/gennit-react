import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Modal, Form } from 'react-bootstrap'
import { UPDATE_EVENT } from '../../../graphQLData/events'

const EditEventForm = ({ 
    eventId, 
    currentEvent, 
    handleClose 
}) => {
    const { 
        title, 
        description,
        startTime,
        endTime,
        location,
        howToFindLocation,
        virtualEventUrl,
        isVirtual 
    } = currentEvent;
  
    const [titleField, setTitleField] = useState(title)
    const [descriptionField, setDescriptionField] = useState(description)
    const [startTimeField, setStartTimeField] = useState(startTime)
    const [endTimeField, setEndTimeField] = useState(endTime)
    const [locationField, setLocationField] = useState(location)
    const [howToFindLocationField, setHowToFindLocationField] = useState(howToFindLocation)
    const [virtualEventUrlField, setVirtualEventUrlField] = useState(virtualEventUrl)
    const [isVirtualField, setIsVirtualField] = useState(isVirtual)
  
    const [updateEvent, { error }] = useMutation(UPDATE_EVENT, {
      variables: {
        id: eventId,
        title: titleField,
        description: descriptionField,
        startTime: startTimeField,
        endTime: endTimeField,
        location: locationField,
        howToFindLocation: howToFindLocationField,
        virtualEventUrl: virtualEventUrlField,
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
            <Form>
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
                <label htmlFor='day'>Start Time</label>
                <input
                  title='startTime'
                  className='form-control'
                  value={startTimeField}
                  onChange={e => setStartTimeField(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='time'>End Time</label>
                <input
                  title='startTime'
                  className='form-control'
                  value={endTimeField}
                  onChange={e => setEndTimeField(e.target.value)}
                />
              </div>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check 
                  name='isVirtual'
                  type="checkbox" 
                  label="This event is virtual" 
                  checked={isVirtualField}
                  onChange={e => setIsVirtualField(Boolean(e.target.value))}
                />
              </Form.Group>
            </Form>
            { isVirtualField ? (
              <div className='form-group'>
                <label htmlFor='virtualEventUrl'>Virtual Event URL</label>
                <input
                  title='Virtual Event URL'
                  className='form-control'
                  value={virtualEventUrlField}
                  onChange={e => setVirtualEventUrlField(e.target.value)}
                />
              </div>
            ) : (
              <>
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
                  <label htmlFor='how-to-find-location'>How to Find Us</label>
                  <input
                    title='How To Find Us'
                    className='form-control'
                    value={howToFindLocationField}
                    onChange={e => setHowToFindLocationField(e.target.value)}
                  />
                </div>
              </>
            )}
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
