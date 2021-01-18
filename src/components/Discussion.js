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
import CreateRootCommentInDiscussion from './forms/comment/discussion_comments/CreateRootCommentInDiscussion'
import { Modal } from 'react-bootstrap'
import { Redirect } from 'react-router'
import { useHistory } from "react-router-dom";
import CommentList from './CommentList'

const EditDiscussionModal = ({ 
  discussionData,
  discussionId,
  showEditDiscussionModal,
  setShowEditDiscussionModal
 }) => {
  const handleClose = () => setShowEditDiscussionModal(false);
    return (
      <Modal 
        show={showEditDiscussionModal} 
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Discussion</Modal.Title>
        </Modal.Header>
        <EditDiscussionForm 
          discussionId={discussionId}
          currentDiscussion={discussionData}
          handleClose={handleClose}
        />
      </Modal>
    )
}

const DeleteDiscussionModal = ({ 
  url,
  discussionId,
  showDeleteDiscussionModal,
  setShowDeleteDiscussionModal,
  setDiscussionWasDeleted
 }) => {
  const handleClose = () => setShowDeleteDiscussionModal(false);
  return (
    <Modal 
      show={showDeleteDiscussionModal} 
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Discussion</Modal.Title>
      </Modal.Header>
      <DeleteDiscussionForm 
        url={url}
        discussionId={discussionId}
        handleClose={handleClose}
        setDiscussionWasDeleted={setDiscussionWasDeleted}
      />
    </Modal>
  )
}


const Discussion = () => {
  const { url, discussionId } = useParams()
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEditDiscussionModal, setShowEditDiscussionModal] = useState(false)
  const [showDeleteDiscussionModal, setShowDeleteDiscussionModal] = useState(false)
  const [discussionWasDeleted, setDiscussionWasDeleted] = useState(false)

  let history = useHistory();

  const handleClickEllipsis = (discussion) => {
    setAnchorEl(discussion.currentTarget);
  };

  const handleCloseEllipsisMenu = () => {
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
    return <p>Loading...</p> 
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
            <p>
              <i className="fas fa-arrow-left"></i> Go back to {`c/${url}`}
            </p>
          </Link>
        </div>
    </div>)
  }
  
  
  if (data.getDiscussion) {
    const discussionData = data.getDiscussion;
    const { title, body, Author, Comments } = discussionData;
    const { username } = Author;

    return discussionWasDeleted ? (
      <Redirect
        push
        to={{
          pathname: `/c/${url}`
        }}
      />
    ) : (
      <div className='container'>
        <div className='discussionPage'>

          <div className='pageTitle'>
            <span className="backButton"
              onClick={() => history.goBack()}
            >
              <i className="fas fa-arrow-left"></i> Back
            </span> | Discussion in <Link
              className='understatedLink'
              to={`/c/${url}`}
            >{`c/${url}`}</Link>{}
          </div>

          <div className='discussionBody'>

            <div className='options-button'>
                <IconButton 
                  aria-label="edit-or-delete-button"
                  aria-controls="simple-menu" 
                  aria-haspopup="true" 
                  onClick={handleClickEllipsis}
                >
                  <MoreVertIcon />
                </IconButton>
            </div>
            
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleCloseEllipsisMenu}
            >
              <MenuItem onClick={() => {
                handleCloseEllipsisMenu()
                setShowEditDiscussionModal(true)
              }}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit"><div>Edit</div></Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                handleCloseEllipsisMenu()
                setShowDeleteDiscussionModal(true)
              }}>
                <ListItemIcon>
                  <DeleteIcon/>
                </ListItemIcon>
                <Typography variant="inherit"><div>Delete</div></Typography>
              </MenuItem>
            </Menu>

            <EditDiscussionModal
              discussionId={discussionId}
              discussionData={discussionData}
              showEditDiscussionModal={showEditDiscussionModal}
              setShowEditDiscussionModal={setShowEditDiscussionModal}
            />
            <DeleteDiscussionModal
              url={url}
              discussionId={discussionId}
              showDeleteDiscussionModal={showDeleteDiscussionModal}
              setShowDeleteDiscussionModal={setShowDeleteDiscussionModal}
              setDiscussionWasDeleted={setDiscussionWasDeleted}
            />
            
            <h2>{title}</h2>
            
            {body}
            
            <div className='discussionAuthor'>
                Posted by{' '}
                <Link to={`/u/${username ? username : '[deleted]'}`}>{`/u/${
                  username ? username : '[deleted]'
                }`}
                </Link>
            </div>
          </div>

          <CreateRootCommentInDiscussion
            discussionId={discussionId}
            communityUrl={url}
          />
          
          <div className='pageTitle'>Comments</div>
          <hr/>
          <CommentList Comments={Comments}/>
        </div>
    </div>)
  }  
}

export default Discussion