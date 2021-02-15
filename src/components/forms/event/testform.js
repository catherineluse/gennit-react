import React, { useState } from 'react'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { useMutation, gql } from '@apollo/client'
import { Button, Modal, Form as BootstrapForm } from 'react-bootstrap'
import { ADD_EVENT } from '../../../graphQLData/events'
import { GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS } from '../../../graphQLData/communities'
import { Redirect } from 'react-router'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Form as FinalForm, Field } from 'react-final-form'
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { 
  formatAsTwoDigits,
  getTodaysDate,
  titleFieldAdapter,
  nonValidatedTextFieldAdapter,
  startDatePickerAdapter,
  endDatePickerAdapter,
  isVirtualFieldAdapter,
  virtualEventUrlFieldAdapter,
  required,
  isValidStartDate,
  isValidEndDate,
  isValidUrl
} from './eventFormUtils'

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const onSubmit = async values => {
  await sleep(300)
  window.alert(JSON.stringify(values, 0, 2))
}

const TestForm = () => {
    const url = "cats"
    const [show, setShow] = useState(false)
    const [newEventId, setNewEventId] = useState("")
    const [submitted, setSubmitted] = useState(false)


    const isVirtualFieldAdapter = ({ 
      input, 
      ...rest 
    }) => (
        <Checkbox
            {...input}
            {...rest}
            name='isVirtual'
            type="checkbox" 
            onChange={input.onChange}
         />
    );

    return (
      <>
        <h1>Create Event Form Example</h1>
        <FinalForm
          onSubmit={onSubmit}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <Paper style={{ padding: 16 }}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                      <Field
                        name="title"
                        component={titleFieldAdapter}
                        validate={required}
                        label="Title"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="description"
                        component={nonValidatedTextFieldAdapter}
                        label="Description"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="startTime"
                        validate={isValidStartDate}
                        component={startDatePickerAdapter}
                        label="Start Date and Time"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="endTime"
                        validate={(selectedDate) => isValidEndDate(selectedDate, values.startTime)}
                        component={endDatePickerAdapter}
                        label="End Date and Time"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormLabel>This event is virtual </FormLabel>
                      <Field
                        name="isVirtual"
                        type="checkbox"
                        initialValue={false}
                        component={isVirtualFieldAdapter}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="location"
                        component={nonValidatedTextFieldAdapter}
                        label="Location"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="howToFindLocation"
                        component={nonValidatedTextFieldAdapter}
                        label="How to find us"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="virtualEventUrl"
                        validate={
                          (virtualEventUrl) => isValidUrl(virtualEventUrl)
                        }
                        component={virtualEventUrlFieldAdapter}
                        label="Virtual Event URL"
                      />
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        type="button"
                        variant="contained"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </Button>
                    </Grid>
                    <Grid item style={{ marginTop: 16 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={submitting}
                      >
                        Submit
                      </Button>
                    </Grid>
                    <pre>{JSON.stringify(values, 0, 2)}</pre>  
                  </Grid>
                </Paper>
              </form>
          )}
        />
      </>
)}

export default TestForm