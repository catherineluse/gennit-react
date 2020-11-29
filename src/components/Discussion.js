import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { GET_DISCUSSION } from '../graphQLData/discussions'
import EditDiscussionForm from './forms/discussion/EditDiscussionForm'
import DeleteDiscussionForm from './forms/discussion/DeleteDiscussionForm'
import RootCommentForm from './forms/comment/RootCommentForm'

const renderComments = Comments => {
  return Comments.map((commentData, idx) => {
    const { text } = commentData
    const { username } = commentData.Author

    return (
      <div className='comment' key={idx}>
        <div className='commentAuthor'>
          <Link to={`/u/${username}`}>{username}</Link>
        </div>
        <div className='commentText'>{text}</div>
      </div>
    )
  })
}
const EditDiscussionForm = ({
  discussionData, 
  showDiscussionForm, 
  setShowDiscussionForm
}) => {
  const { id, title, body} = discussionData;

  let titleField = title || "";
  let bodyField = body || "";

  const [updateDiscussion, { error }] = useMutation(UPDATE_DISCUSSION, {
    variables: {
      id,
      title: titleField,
      body: bodyField
    }
  })

  const handleSubmit = async e => {
    e.preventDefault()
    await updateDiscussion()

    if (error){
      alert(error)
    }
    setShowDiscussionForm(false)
  }

  const required = value => (value ? undefined : 'Required')

  return (
    <>

      <Modal show={showDiscussionForm} onHide={() => {
        setShowDiscussionForm=(false)
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Edit this Discussion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          

        <Form
          onSubmit={handleSubmit}
          validate={values => {
            const errors = {};
            if (values.titleField && values.titleField.length < 2) {
              errors.title = "Must have at least two characters.";
            }
            if (values.bodyField && values.bodyField.length < 2) {
              errors.title = "Must have at least two characters.";
            }
            return errors;
          }}
          render={({ 
            handleSubmit, 
            form, 
            submitting, 
            pristine, 
            values 
          }) => (
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="titleField">Title</Label>
                <Field 
                name="titleField" 
                validate={required}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Title</label>
                    <input 
                      {...input}
                      type="text"
                      ref={node => {
                        titleField = node;
                      }}
                      invalid={toString(meta.error && meta.touched)}
                     />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </FormGroup>
            <FormGroup>
              <Label for="bodyField">Body</Label>
              <Field 
                name="bodyField" 
                validate={required}
              >
                {({ input, meta }) => (
                  <div>
                    <label>Body</label>
                    <input 
                      {...input}
                      type="text" 
                      ref={node => {
                        bodyField = node;
                      }}
                     />
                    {meta.error && meta.touched && <span>{meta.error}</span>}
                  </div>
                )}
              </Field>
            </FormGroup>
            
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
          <Button variant='secondary' onClick={() => {
            setShowDiscussionForm(false)
          }}>
            Close
          </Button>
          <Button 
            type='submit' 
            variant='primary' 
            onClick={handleSubmit}
           >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}


const Discussion = () => {
  const { url, discussionId } = useParams()
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDiscussionForm, setShowDiscussionForm] = useState(false)
  const [showDeleteDiscussionForm, setShowDeleteDiscussionForm] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const { loading: discussionIsLoading, error, data } = useQuery(
    GET_DISCUSSION,
    {
      variables: {
        id: discussionId
      }
    }
  )
  
  if (discussionIsLoading) {
    return <div>Loading...</div> 
  }

  if (error) {
    alert(`GET_DISCUSSION error: ${error}`)
    return null
  }

  // If the discussion is not found,
  // provide a link back to the community.
  if (!data.getDiscussion) {
    return (
      <div className='container'>
        <div className='discussionPage'>

          <p>Could not find the discussion.</p>
          <Link to={`/c/${url}`}>
            <i className="fas fa-arrow-left"></i> Go back to {`c/${url}`}
          </Link>
        </div>
    </div>)
  }
  
  if (data.getDiscussion) {
    const discussionData = data.getDiscussion;
    const { title, body, Author, Comments } = discussionData;
    const { username } = Author;

    return (
      <div className='container'>
        <div className='discussionPage'>

          <div className='communitySectionTitle'>DISCUSSION IN {`c/${url}`}</div>

          <div className='discussionBody'>

            <div className='options-button'>
                <IconButton 
                  aria-label="edit-or-delete-button"
                  aria-controls="simple-menu" 
                  aria-haspopup="true" 
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
            </div>
            
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => {
                handleClose()
                setShowDiscussionForm(true)
              }}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit"><div>Edit</div></Typography>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <DeleteIcon/>
                </ListItemIcon>
                <Typography variant="inherit"><div>Delete</div></Typography>
              </MenuItem>
            </Menu>
            
            <h2 className='discussionPageTitle'>{title}</h2>
            
            {body}
            
            <div className='discussionAuthor'>
                Posted by{' '}
                <Link to={`/u/${username ? username : '[deleted]'}`}>{`/u/${
                  username ? username : '[deleted]'
                }`}
                </Link>
            </div>
            <EditDiscussionForm 
              discussionData={discussionData}
              showDiscussionForm={showDiscussionForm}
              setShowDiscussionForm={setShowDiscussionForm}
            />
            <DeleteDiscussionForm discussionData={discussionData} />
          </div>
          
          <div className='communitySectionTitle'>COMMENTS</div>
          <RootCommentForm/>
          {renderComments(Comments)}
        </div>
    </div>)
  }  
}

export default Discussion
