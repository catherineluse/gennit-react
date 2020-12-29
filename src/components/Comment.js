import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'
import { Redirect } from 'react-router'
import { useHistory } from "react-router-dom";
import EditCommentForm from './forms/comment/EditCommentForm';
import DeleteCommentForm from './forms/comment/DeleteCommentForm';


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
        <EditCommentForm 
          commentId={commentId}
          text={text}
          handleClose={handleClose}
        />
      </Modal>
    )
}

const Comment = ({ text, commentId, username, idx }) => {
    const [ showButtons, setShowButtons ] = useState(false)
    const [ locked, setLocked ] = useState(false)
    const [ showEditCommentModal, setShowEditCommentModal ] = useState(false)
    const [ showDeleteCommentModal, setShowDeleteCommentModal ] = useState(false)

    return (
        <div 
          className='comment' 
          key={idx}
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
                    <div className="comment-button">
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
        </div>
    )
}

export default Comment;