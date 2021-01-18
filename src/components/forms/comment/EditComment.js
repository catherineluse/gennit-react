import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Button, Modal } from 'react-bootstrap'
import { UPDATE_COMMENT } from '../../../graphQLData/comments'

const EditCommentInDiscussion = ({ 
    commentId, 
    text, 
    handleClose 
}) => {
  
    let [textField, setTextField] = useState(text)
  
    const [updateComment, { error }] = useMutation(UPDATE_COMMENT, {
      variables: {
        id: commentId,
        text: textField,
      },
      errorPolicy: 'all'
    })

    if (error){ 
        alert(error)
    };
  
    const handleSubmit = async e => {
      e.preventDefault()
      updateComment()
      handleClose()
    }
  
    return (
        <>
        <Modal.Body>
            <form>
              <div className='form-group'>
                <label htmlFor='name'>Comment Text</label>
                <input
                  className='form-control'
                  value={textField}
                  onChange={e => setTextField(e.target.value)}
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

export default EditCommentInDiscussion
