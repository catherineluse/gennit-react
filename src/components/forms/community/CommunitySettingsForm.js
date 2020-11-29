import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_COMMUNITY } from '../../../graphQLData/communities'
import DeleteCommunityForm from './DeleteCommunityForm'

const CommunitySettingsForm = ({ url, currentCommunity }) => {
  // The url is in the currentCommunity prop, but we
  // prefer to use the one passed in as the first argument
  // because it comes from the match params, therefore
  // it loads faster.
  
  const { name, description } = currentCommunity;

  const [updatedSuccessfully, setUpdatedSuccessfully] = useState(false);

  let [nameField, setNameField] = useState(name)
  let [descriptionField, setDescriptionField] = useState(description)

  const [updateCommunity, { error }] = useMutation(UPDATE_COMMUNITY, {
    variables: {
      url,
      name: nameField,
      description: descriptionField
    }
  })

  const handleSubmit = async e => {
    e.preventDefault()
    await updateCommunity()

    if (error){ 
      alert("Could not update community.")
    };
    
    setUpdatedSuccessfully(true)
  }

  const renderSubmitButton = updatedSuccessfully => {
    if (!updatedSuccessfully) {
      return (
        <button
          type='button'
          onClick={handleSubmit}
          className='form-submit btn btn-dark'
        >
          Submit
        </button>
      )
    }
    return (
      <button type='button' className='form-submit btn btn-success'>
        <i className='far fa-check-circle'></i> Saved!
      </button>
    )
  }

  return (
    <div className='container'>
      <form>
        <h3 className='formTitle'>Edit Community Settings</h3>

        <div className='form-group'>
          <label htmlFor='name'>Community Name</label>
          <input
            name='name'
            className='form-control'
            onChange={e => setNameField(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='communityDescription'>Description</label>
          <input
            component='textarea'
            rows='3'
            type='description'
            name='description'
            className='form-control'
            onChange={e => setDescriptionField(e.target.value)}
          />
        </div>
        <span>{renderSubmitButton(updatedSuccessfully)}</span>
      </form>
      <hr className='solid' />
      <DeleteCommunityForm url={url} />
    </div>
  )
}

export default CommunitySettingsForm
