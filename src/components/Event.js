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
import { GET_EVENT } from '../graphQLData/events'
import EditEventForm from './forms/event/EditEventForm'
import DeleteEventForm from './forms/event/DeleteEventForm'
import CreateRootCommentOnEvent from './forms/comment/event_comments/CreateRootCommentOnEvent'
import { Modal } from 'react-bootstrap'
import { Redirect } from 'react-router'
import { useHistory } from "react-router-dom";
import CommentList from './CommentList'
import { Table } from 'reactstrap';

const EditEventModal = ({ 
  eventData,
  eventId,
  showEditEventModal,
  setShowEditEventModal
 }) => {
  const handleClose = () => setShowEditEventModal(false);
    return (
      <Modal 
        show={showEditEventModal} 
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Event</Modal.Title>
        </Modal.Header>
        <EditEventForm 
          eventId={eventId}
          currentEvent={eventData}
          handleClose={handleClose}
        />
      </Modal>
    )
}

const DeleteEventModal = ({ 
  url,
  eventId,
  showDeleteEventModal,
  setShowDeleteEventModal,
  setEventWasDeleted
 }) => {
  const handleClose = () => setShowDeleteEventModal(false);
  return (
    <Modal 
      show={showDeleteEventModal} 
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete Event</Modal.Title>
      </Modal.Header>
      <DeleteEventForm 
        url={url}
        eventId={eventId}
        handleClose={handleClose}
        setEventWasDeleted={setEventWasDeleted}
      />
    </Modal>
  )
}


const Event = () => {
  const { url, eventId } = useParams()
  const [anchorEl, setAnchorEl] = useState(null);
  const [showEditEventModal, setShowEditEventModal] = useState(false)
  const [showDeleteEventModal, setShowDeleteEventModal] = useState(false)
  const [eventWasDeleted, setEventWasDeleted] = useState(false)

  let history = useHistory();

  const handleClickEllipsis = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseEllipsisMenu = () => {
    setAnchorEl(null);
  };

  const { loading: eventIsLoading, error, data } = useQuery(
    GET_EVENT,
    {
      variables: {
        id: eventId
      }
    }
  )
  
  if (eventIsLoading) {
    return <p>Loading...</p> 
  }

  if (error) {
    alert(`GET_EVENT error: ${error}`)
    return null
  }

  // If the event is not found,
  // provide a link back to the community.
  if (!data.getEvent) {
    return (
      <div className='container'>
        <div className='eventPage'>

          <p>Could not find the event.</p>
          <Link to={`/c/${url}/events`}>
            <p>
              <i className="fas fa-arrow-left"></i> Go back to {`c/${url}/events`}
            </p>
          </Link>
        </div>
    </div>)
  }
  
  
  if (data.getEvent) {
    const eventData = data.getEvent;
    const { 
      title, 
      description,
      startTime,
      endTime,
      location,
      howToFindLocation,
      virtualEventUrl,
      isVirtual,
      Organizer: {
        username
      },
      Comments
    } = eventData

    return eventWasDeleted ? (
      <Redirect
        push
        to={{
          pathname: `/c/${url}/events`
        }}
      />
    ) : (
      <div className='container'>
        <div className='eventPage'>

          <div className='pageTitle'>
            <span className="backButton"
              onClick={() => history.goBack()}
            >
              <i className="fas fa-arrow-left"></i> Back
            </span> | Event in <Link
              className='understatedLink'
              to={`/c/${url}`}
            >{`c/${url}`}</Link>
          </div>

          <div className='eventBody'>

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
                setShowEditEventModal(true)
              }}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <Typography variant="inherit"><div>Edit</div></Typography>
              </MenuItem>
              <MenuItem onClick={() => {
                handleCloseEllipsisMenu()
                setShowDeleteEventModal(true)
              }}>
                <ListItemIcon>
                  <DeleteIcon/>
                </ListItemIcon>
                <Typography variant="inherit"><div>Delete</div></Typography>
              </MenuItem>
            </Menu>

            <EditEventModal
              eventId={eventId}
              eventData={eventData}
              showEditEventModal={showEditEventModal}
              setShowEditEventModal={setShowEditEventModal}
            />
            <DeleteEventModal
              url={url}
              eventId={eventId}
              showDeleteEventModal={showDeleteEventModal}
              setShowDeleteEventModal={setShowDeleteEventModal}
              setEventWasDeleted={setEventWasDeleted}
            />
            
            <h2>{title}</h2>
            <div className="details">
              <Table size="sm" borderless>
                <tbody>
                  <tr>
                    <td>
                      <i className="far fa-clock"></i>{startTime} to {endTime}
                    </td>
                  </tr>
                  {isVirtual ? (
                    <tr>
                      <td><i className="fas fa-globe"></i>This is a virtual event. {virtualEventUrl}</td>
                    </tr>
                  ) : (
                    <tr>
                      <td><i className="fas fa-map-marker-alt"></i>{location}</td>
                      {howToFindLocation}
                    </tr>
                  ) }
                </tbody>
              </Table>
            </div>
            {description}
            
            <div className='organizer'>
                Hosted by{' '}
                <Link to={`/u/${username ? username : '[deleted]'}`}>{`/u/${
                  username ? username : '[deleted]'
                }`}
                </Link>
            </div>
          </div>

          <CreateRootCommentOnEvent
            eventId={eventId}
            communityUrl={url}
          />
          
          <div className='pageTitle'>Comments</div>
          <hr/>
          <CommentList Comments={Comments}/>
        </div>
    </div>)
  }  
}

export default Event