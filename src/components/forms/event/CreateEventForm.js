import React, { useState } from 'react'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { useMutation, gql } from '@apollo/client'
import { Button, Modal, Form as BootstrapForm } from 'react-bootstrap'
import { ADD_EVENT } from '../../../graphQLData/events'
import { GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS } from '../../../graphQLData/communities'
import { Redirect } from 'react-router'
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Form as FinalForm, Field } from 'react-final-form'

const required = value => (value ? undefined : 'Required')

const composeValidators = (...validators) => value =>
  validators.reduce((error, validator) => error || validator(value), undefined)

const CreateEventForm = ({ 
  currentCommunity
}) => {
  const { url } = currentCommunity;
  const [show, setShow] = useState(false)
  const [newEventId, setNewEventId] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [startTime, setStartTime] = useState(new Date())
  const [endTime, setEndTime] = useState(new Date())
  const [isVirtual, setIsVirtual] = useState(false)
  const [location, setLocation] = useState("")
  const [howToFindLocation, setHowToFindLocation] = useState("")
  const [virtualEventUrl, setVirtualEventUrl] = useState("")
  
  const handleStartTimeChange = (date) => {
    setStartTime(date);
  };
  const handleEndTimeChange = (date) => {
    setEndTime(date);
  };

  const toggleIsVirtual = () => {
    setIsVirtual(!isVirtual)
  }

  const [addEvent] = useMutation(ADD_EVENT, {
    variables: {
      title,
      description,
      startTime,
      endTime,
      communityUrl: url,
      location,
      virtualEventUrl,
      isVirtual,
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

  const onSubmit = async e => {
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
          <FinalForm 
            onSubmit={onSubmit}
            render={({
              handleSubmit,
              form,
              submitting,
              pristine,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <Field 
                    name="title"
                    validate={required}
                  >
                  {({
                    input,
                    meta
                  }) => (
                    <div>
                      <label htmlFor='name'>Event Name</label>
                      <input
                        {...input}
                        name='title'
                        type='text'
                        value={title}
                        className='form-control'
                        onChange={e => setTitle(e.target.value)}
                      />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                  </Field>
                </div>
                <div className='form-group'>
                  <label htmlFor='description'>Description</label>
                  <input
                    name='description'
                    type='text'
                    value={description}
                    className='form-control'
                    onChange={e => setDescription(e.target.value)}
                  />
                </div>
                <div className='form-group'>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        id="start-date-picker-dialog"
                        label="Start Date"
                        format="MM/dd/yyyy"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      <KeyboardTimePicker
                        margin="normal"
                        id="start-time-picker"
                        label="Start Time"
                        value={startTime}
                        onChange={handleStartTimeChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </div>
                <div className='form-group'>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        margin="normal"
                        id="end-date-picker-dialog"
                        label="End Date"
                        format="MM/dd/yyyy"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change date',
                        }}
                      />
                      <KeyboardTimePicker
                        margin="normal"
                        id="end-time-picker"
                        label="End Time"
                        value={endTime}
                        onChange={handleEndTimeChange}
                        KeyboardButtonProps={{
                          'aria-label': 'change time',
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </div>
                <BootstrapForm.Group controlId="formBasicCheckbox">
                  <BootstrapForm.Check 
                    name='isVirtual'
                    type="checkbox" 
                    label="This event is virtual" 
                    checked={isVirtual}
                    onChange={toggleIsVirtual}
                  />
                </BootstrapForm.Group>
                { isVirtual ? (
                  <div className='form-group'>
                    <label htmlFor='name'>Virtual Event URL</label>
                    <input
                      name='location'
                      type='text'
                      value={virtualEventUrl}
                      className='form-control'
                      onChange={e => setVirtualEventUrl(e.target.value)}
                    />
                  </div>
                ) : (
                  <>
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
                      <label htmlFor='name'>How To Find Us</label>
                      <input
                        name='how-to-find-us'
                        type='text'
                        value={howToFindLocation}
                        className='form-control'
                        onChange={e => setHowToFindLocation(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </form>
            )}
          >
          </FinalForm>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={ () => {setShow(false)} }>
            Close
          </Button>
          <button
            className="btn btn-primary"
            type="submit"
            onClick={onSubmit}
          >
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CreateEventForm
