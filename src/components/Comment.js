import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import commentTypes from './forms/commentTypes'
import EditComment from './forms/comment/EditComment';
import DeleteCommentOnEvent from './forms/comment/event_comments/DeleteCommentOnEvent';
import DeleteCommentOnDiscussion from './forms/comment/discussion_comments/DeleteCommentInDiscussion';
import CreateReplyToCommentOnEvent from './forms/comment/event_comments/CreateReplyToCommentOnEvent';
import CreateReplyToCommentInDiscussion from './forms/comment/discussion_comments/CreateReplyToCommentInDiscussion';

const EditCommentModal = ({ 
  text,
  commentId,
  showEditCommentModal,
  setShowEditCommentModal
 }) => {
    const handleClose = () => setShowEditCommentModal(false);

    return (
      <Modal 
        show={showEditCommentModal} 
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Comment</Modal.Title>
        </Modal.Header>
        <EditComment 
          commentId={commentId}
          text={text}
          handleClose={handleClose}
        />
      </Modal>
    )
}

const DeleteCommentModal = ({
  commentId,
  showDeleteCommentModal,
  setShowDeleteCommentModal,
  commentType
 }) => {
    const handleClose = () => setShowDeleteCommentModal(false);

    const renderDeleteCommentForm = () => {
      switch ( commentType ) {
        case commentTypes.DISCUSSION:
          return (
            <DeleteCommentOnDiscussion
              commentId={commentId}
              handleClose={handleClose}
            />
          )
        case commentTypes.EVENT:
          return (
            <DeleteCommentOnEvent
              commentId={commentId}
              handleClose={handleClose}
            />
          )
        default:
          return null;
      }
    }

    return (
      <Modal 
        show={showDeleteCommentModal} 
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Comment</Modal.Title>
        </Modal.Header>
        {renderDeleteCommentForm()}
      </Modal>
    )
}

const ReplyToCommentModal = ({
  parentCommentId,
  text,
  authorUsername,
  showReplyToCommentModal,
  setShowReplyToCommentModal,
  commentType
 }) => {
    
    const handleClose = () => setShowReplyToCommentModal(false);

    const renderReplyToCommentForm = () => {
      switch ( commentType ) {
        case commentTypes.DISCUSSION:
          return (
            <CreateReplyToCommentInDiscussion 
              authorUsername={authorUsername}
              parentCommentId={parentCommentId}
              text={text}
              handleClose={handleClose}
            />
          )
        case commentTypes.EVENT:
          return (
            <CreateReplyToCommentOnEvent 
              authorUsername={authorUsername}
              parentCommentId={parentCommentId}
              text={text}
              handleClose={handleClose}
            />
          )
        default:
          return null;
      }
    }

    return (
      <Modal 
        show={showReplyToCommentModal} 
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Reply to Comment</Modal.Title>
        </Modal.Header>
        { renderReplyToCommentForm() }
      </Modal>
    )
}

const Comment = ({ 
  text, 
  commentId, 
  username 
}) => {
    const { eventId, discussionId } = useParams()
    let commentType = ""

    if (eventId) {
      commentType = commentTypes.EVENT;
    }
    if (discussionId) {
      commentType = commentTypes.DISCUSSION;
    }

    const [ showButtons, setShowButtons ] = useState(false)
    const [ locked, setLocked ] = useState(false)
    const [ showEditCommentModal, setShowEditCommentModal ] = useState(false)
    const [ showDeleteCommentModal, setShowDeleteCommentModal ] = useState(false)
    const [ showReplyToCommentModal, setShowReplyToCommentModal ] = useState(false)

    return (
        <div 
          className='comment' 
          onMouseEnter={() => {
            setShowButtons(true)
          }}
          onMouseLeave={() => {
              if (!locked){
                setShowButtons(false)
              }
          }}
        >
            <div >
              <Link className='commentAuthor' to={`/u/${username}`}>{username}</Link>
            </div>
            <div 
              className='commentText'
              onClick={() => {
                  if (!locked){
                    setShowButtons(true)
                    setLocked(true)
                  } else {
                    setShowButtons(false)
                    setLocked(false)
                  }
              }}
            >
              {text}
            </div>
            <div className="comment-buttons">
                  <div 
                    className="comment-button"
                    onClick={() => {setShowReplyToCommentModal(true)}}
                  >
                    <i className="fas fa-reply"></i>Reply
                  </div> 
                  {showButtons && (
                  <div 
                    className="toggled-comment-buttons"
                  >
                    <div 
                      className="comment-button"
                      onClick={() => {setShowEditCommentModal(true)}}
                    >
                      <i className="fas fa-edit"></i>Edit
                    </div>
                    <div 
                      className="comment-button"
                      onClick={() => {setShowDeleteCommentModal(true)}}
                    >
                      <i className="fas fa-trash-alt"></i>Delete
                    </div>
                  </div>
                  )}
            </div>
            <EditCommentModal 
              text={text}
              commentId={commentId}
              showEditCommentModal={showEditCommentModal}
              setShowEditCommentModal={setShowEditCommentModal}
            />
            <DeleteCommentModal 
              commentId={commentId}
              showDeleteCommentModal={showDeleteCommentModal}
              setShowDeleteCommentModal={setShowDeleteCommentModal}
              commentType={commentType}
            />
            <ReplyToCommentModal
              parentCommentId={commentId}
              authorUsername={username}
              text={text}
              showReplyToCommentModal={showReplyToCommentModal}
              setShowReplyToCommentModal={setShowReplyToCommentModal}
              commentType={commentType}
            />
        </div>
    )
}

export default Comment;