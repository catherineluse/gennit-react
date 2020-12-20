import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Modal } from 'react-bootstrap'
import { UPDATE_DISCUSSION } from '../../../graphQLData/discussions'

const EditDiscussionForm = ({ currentDiscussion, handleClose }) => {
    const { title, body } = currentDiscussion;
  
    let [titleField, setTitleField] = useState(title)
    let [bodyField, setBodyField] = useState(body)
  
    const [updateDiscussion, { error }] = useMutation(UPDATE_DISCUSSION, {
      variables: {
        title: titleField,
        description: bodyField
      }
    })

    if (error){ 
        alert("Could not update discussion.")
    };
  
    const handleSubmit = async e => {
      e.preventDefault()
      await updateDiscussion()
      handleClose()
    }
  
    return (
        <>
        <Modal.Body>
            <form>
              <div className='form-group'>
                <label htmlFor='name'>Title</label>
                <input
                  title='title'
                  className='form-control'
                  onChange={e => setTitleField(e.target.value)}
                />
              </div>
      
              <div className='form-group'>
                <label htmlFor='discussionDescription'>Body</label>
                <input
                  component='textarea'
                  rows='3'
                  name='body'
                  className='form-control'
                  onChange={e => setBodyField(e.target.value)}
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

export default EditDiscussionForm
