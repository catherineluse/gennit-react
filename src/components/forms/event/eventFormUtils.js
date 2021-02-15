import React from 'react'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

const formatAsTwoDigits = value => {
    if (value < 10) {
        return "0" + value
    }
    return "" + value
}

const getTodaysDate = () => {
    let today = new Date()
    let year = today.getFullYear()
    let month = formatAsTwoDigits(today.getMonth() + 1)
    let day = formatAsTwoDigits(today.getDate())
    let hours = formatAsTwoDigits(today.getHours())
    let minutes = formatAsTwoDigits(today.getMinutes())
    let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`
    return formattedDate
}

const titleFieldAdapter = ({ 
    input, 
    meta, 
    ...rest 
 }) => (
  <TextField
    {...input}
    {...rest}
    id="title"
    label="Title"
    type="text"
    error={meta.touched && meta.error ? true : false}
    onChange={input.onChange}
    helperText={meta.touched ? meta.error : ""}
  />
);

const nonValidatedTextFieldAdapter = ({ 
    input, 
    meta, 
    ...rest 
   }) => (
        <TextField
          {...input}
          {...rest}
          type="text"
          onChange={input.onChange}
        />
   );

const startDatePickerAdapter = ({ 
    input,
    meta,
    ...rest 
}) => (
      <TextField
          {...input}
          {...rest}
          error={meta.touched && meta.error ? true : false}
          id="startTime"
          label="Start Date and Time"
          type="datetime-local"
          onChange={input.onChange}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={meta.touched ? meta.error : ""}
        />
);

const endDatePickerAdapter = ({ 
  input,
  meta,
  ...rest 
}) => {
    return (
        <TextField
            {...input}
            {...rest}
            error={meta.touched && meta.error ? true : false}
            id="endTime"
            label="End Date and Time"
            type="datetime-local"
            onChange={input.onChange}
            InputLabelProps={{
              shrink: true,
            }}
            helperText={meta.touched ? meta.error : ""}
        />
    )
 };



const virtualEventUrlFieldAdapter = ({ 
  input, 
  meta, 
  ...rest 
}) => (
  <TextField
    {...input}
    {...rest}
    id="virtualEventUrl"
    label="Virtual Event URL"
    type="text"
    error={meta.touched && meta.error ? true : false}
    onChange={input.onChange}
    helperText={meta.touched ? meta.error : ""}
  />
);

const required = value => (value ? undefined : "Required");

const isValidStartDate = (selectedDate) => {
  if (!selectedDate) {
      return "Required"
  }
  if (selectedDate < getTodaysDate()) {
      return "The scheduled date must be in the future."
  }
  return ""
}

const isValidEndDate = (selectedDate, startDate) => {
    if (!selectedDate) {
        return "Required"
    }
    console.log('selected date is ', selectedDate)
    console.log("start date is ", startDate)
    if (selectedDate <= startDate) {
        return "The end date must be after the start date."
    }
    return ""
}

const isValidUrl = (url, eventIsVirtual) => {
  if (!url) {
    return ""
  }
  let isValid = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url)
  if (!isValid) {
    return "Must be a valid URL starting with HTTP or HTTPS"
  }
}

export {
    formatAsTwoDigits,
    getTodaysDate,
    titleFieldAdapter,
    nonValidatedTextFieldAdapter,
    startDatePickerAdapter,
    endDatePickerAdapter,
    virtualEventUrlFieldAdapter,
    required,
    isValidStartDate,
    isValidEndDate,
    isValidUrl
}