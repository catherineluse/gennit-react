import React from 'react'
import Comment from './Comment'

const CommentList = ({ Comments }) => {

    if (Comments.length === 0) {
      return (
        <p>
        There are no comments yet.
        </p>
      )
    }
  
    // The code below builds two data structures,
    // rootComments and parentChildMap,
    // which will be used to render the nested
    // comments.
    
    let rootComments = [];
    let parentChildMap = {};
  
    const buildDataStructures = () => {
      for (let i = 0; i < Comments.length; i++) {
        const commentData = Comments[i];
    
        const { isRootComment } = commentData
    
        // First, we create a list of root comments to be
        // rendered at the far left of the discussion page.
        if (isRootComment) {
          rootComments.push(commentData)
          continue;
        }
    
        // Below, for each child comment, we
        // save the comment ID and the parent comment ID
        // in parentChildMap, in which the parent ID is
        // the key and the comment ID is the value.
        // This will allow easy lookups to find all
        // children of each parent comment without looping
        // over the whole list of comments many times.
    
        const { ParentComment } = commentData
        
        // Every comment that is not a root comment
        // should have a parent comment ID, but that 
        // rule is not enforced on the back end. Therefore
        // we do an error check here to make sure all
        // comments that are not root comments do have
        // a parent comment ID.
        if (ParentComment === null || ParentComment === undefined) {
          alert("Could not render the child comment because it has no parent comment ID.")
          console.log('could not render the comment ', commentData)
          continue;
        }
        const { id: parentCommentId } = ParentComment;
    
        // If the parent comment already has at least
        // one child in the parentChildMap data structure,
        // add the child to the list of existing children.
        if (parentCommentId in parentChildMap) {
           const existingChildren = parentChildMap[parentCommentId]
           parentChildMap[parentCommentId] = [commentData, ...existingChildren];
           continue;
        }
        
        // If the parent comment is not listed in
        // parentChildMap, create a new entry in ParentChildMap.
        parentChildMap[parentCommentId] = [ commentData ]
      }
    } // end of buildDataStructures
    
    buildDataStructures()
  
    // This function renders replies, 
    // and the replies to those replies, and so 
    // on, until there are no more replies.
    // It uses the parentChildMap to get the children
    // for each parent.
    const renderChildrenRecursively = comments => {
      return comments.map((comment) => {
        const { 
          id: commentId, 
          text,
          Author: {
            username
          }
         }= comment;
        const replies = parentChildMap[commentId]
  
        return (
          <div 
            key={commentId}
            className="child-comment-list"
          >
            <Comment 
              commentId={commentId}
              text={text}
              username={username}
              key={commentId}
            />
            {replies ? renderChildrenRecursively(replies) : null}
          </div>
        )
      })
    }
    
  
    // For each root comment, render its children beneath it
    // using renderChildrenRecursively.
    return rootComments.map((commentData) => {
      const { text, id } = commentData
      const { username } = commentData.Author
      const childComments = parentChildMap[id]
  
      return (
        <div 
          className="thread"
          key={id}
        >
          <Comment 
            commentId={id}
            text={text}
            username={username}
          />
          { 
            childComments ? renderChildrenRecursively(childComments) : null
          }
        </div>
      )
    })
}

export default CommentList;