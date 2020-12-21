import React, { useState } from 'react';
import { CREATE_ROOT_COMMENT } from '../../../graphQLData/comments'
import { useMutation } from '@apollo/client'
import { Form, FormGroup, Input } from 'reactstrap'

// type Comment {
//   id:              ID!
//   Author:          User!         @hasInverse(field: Comments)
//   Discussion:      Discussion!   @hasInverse(field: Comments)
//   ParentComment:   Comment       @hasInverse(field: ChildComments)
//   text:            String
//   isRootComment:   Boolean!      @search
//   ChildComments:   [Comment]     @hasInverse(field: ParentComment)
//   Community:       Community!
//  }

// export const CREATE_ROOT_COMMENT = gql`
// mutation createRootComment(
//     $authorUsername: String!
//     $discussionId: ID!
//     $text: String!
//     $communityUrl: String!
//   ) {
//     addComment(input: [
//       {
//         Author: {
//           username: "alice"
//         },
//         isRootComment: true,
//         Discussion: {
//           id: "0x10"
//         },
//         text: "root"
//         Community: {
//           url: "music"
//         }
//       }
//     ]) {
//       comment {
//         id
//         Author {
//           username
//         }
//         isRootComment
//         Discussion {
//           title
//         }
//         text
//         Community {
//           url
//         }
//       }
//     }
//   }`



const RootCommentForm = ({ 
  discussionId, 
  communityUrl
 }) => {

  const [text, setText] = useState("")

  const [addComment, { error }] = useMutation(CREATE_ROOT_COMMENT, {
    variables: {
      authorUsername: "alice",
      discussionId,
      text,
      communityUrl
    },
    // onCompleted({ addComment }){
    //   const newComment = addComment.comment[0]
    //   setCommentList([newComment, ...commentList])
    // }
  })


  const handleSubmit = async e => {
    e.preventDefault()

    const data = await addComment()
    
    if (error) {
      alert(error + "Could not add the community: " + JSON.stringify({...data.addComment.community[0]}))
    }
  }

  return (
    <>
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          name='commentText'
          type='textarea'
          className='form-control'
          value={text}
          placeholder="Reply here"
          onChange={e => setText(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
          Submit
        </button>
      </FormGroup>
    </Form>
    </>
  )
}

export default RootCommentForm;