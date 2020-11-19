import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Button, Modal } from 'react-bootstrap'
import { UPDATE_DISCUSSION } from '../../../graphQLData/discussions'
import { useDispatch } from 'react-redux'
import { Form, Field } from 'react-final-form'

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

const EditDiscussionForm = ({discussionData}) => {
  const { id, title, body} = discussionData;
  
  const [show, setShow] = useState(false)

  const [bodyField, setBodyField] = useState('')
  const [titleField, setTitleField] = useState('')

  setTitleField(title)
  setBodyField(body)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [updateDiscussion, { error }] = useMutation(UPDATE_DISCUSSION, {
    variables: {
      id,
      title,
      body
    }
  })

  const dispatch = useDispatch()

  const handleSubmit = async e => {
    e.preventDefault()
    try {
        console.log('data to submit is ', {
            id,
            titleField,
            bodyField
          })
      const { data } = await updateDiscussion()
      
      const updatedDiscussion = data.updateDiscussion.discussion[0]
      console.log('updated discussion is ', data)

      dispatch({
        type: 'SET_CURRENT_DISCUSSION',
        payload: {
          ...updatedDiscussion
        }
      })

      handleClose()
    } catch (e) {
      console.log('Update discussion error: ', e) 
      alert('The update discussion mutation returned: ', e)
      alert(error)
    }
  }

  const handleTitleChange = e => {
    setTitleField(e.target.value)
  }

  const handleBodyChange = e => {
    setBodyField(e.target.value)
  }

  const required = value => (value ? undefined : 'Required')

  return (
    <>
      <Button className='discussionListButton' variant='primary' onClick={handleShow}>
        + Start Discussion
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Start a Discussion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          

        <Form
          onSubmit={handleSubmit}
          initialValues={{
            titleField,
            bodyField
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field 
              name="titleField" 
              validate={required}
              onChange={handleTitleChange}
            >
              {({ input, meta }) => (
                <div>
                  <label>Title</label>
                  <input {...input} type="text" value={titleField} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field 
              name="bodyField" 
              validate={required}
              onChange={handleBodyChange}
            >
              {({ input, meta }) => (
                <div>
                  <label>Body</label>
                  <input {...input} type="text" value={bodyField} />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, 0, 2)}</pre>
          </form>
        )}
      />
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

export default EditDiscussionForm
