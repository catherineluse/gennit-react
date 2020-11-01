import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/react-hooks'
import { UPDATE_COMMUNITY } from '../../graphQLData/communities'
import DeleteCommunityForm from './DeleteCommunityForm'

const CommunitySettingsForm = ({ currentCommunity }) => {
  const { url } = currentCommunity
  const dispatch = useDispatch()
  const [name, setName] = useState(currentCommunity.name)
  const [description, setDescription] = useState(currentCommunity.description)
  const [updatedSuccessfully, setUpdatedSuccessfully] = useState(false)

  const [updateCommunity, { error }] = useMutation(UPDATE_COMMUNITY, {
    variables: {
      url,
      name,
      description
    }
  })

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await updateCommunity()

      dispatch({
        type: 'UPDATE_COMMUNITY',
        payload: {
          ...currentCommunity,
          name,
          description
        }
      })

      dispatch({
        type: 'SET_CURRENT_COMMUNITY',
        payload: {
          ...currentCommunity,
          name,
          description
        }
      })
    } catch (e) {
      alert('error is ', e)
      alert(error)
    }

    setUpdatedSuccessfully(true)
  }

  const handleNameChange = e => {
    setName(e.target.value)
    setUpdatedSuccessfully(false)
  }

  const handleDescriptionChange = e => {
    setDescription(e.target.value)
    setUpdatedSuccessfully(false)
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
            type='text'
            placeholder={name}
            className='form-control'
            onChange={handleNameChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='communityDescription'>Description</label>
          <input
            component='textarea'
            rows='3'
            type='description'
            name='description'
            placeholder={description}
            className='form-control'
            onChange={handleDescriptionChange}
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
