import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default Comment = ({ text, username, idx }) => {
    const [ showButtons, setShowButtons ] = useState(false)
    const [ locked, setLocked ] = useState(false)

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
            <div className='commentAuthor'>
              <Link to={`/u/${username}`}>{username}</Link>
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
                  Reply {showButtons && (
                      <div 
                        className="toggled-comment-buttons"
                      >Edit Delete
                      </div>
                  )}
            </div>
        </div>
    )
}