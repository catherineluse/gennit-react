import { gql } from '@apollo/client'

// Auth restrictions:
// - Comments can only be deleted by their author
//   or by an admin
// - Comments can only be updated by their author
//   or by an admin

// Creates a comment in a discussion,
// without a parent comment
export const CREATE_DISCUSSION_ROOT_COMMENT = gql`
  mutation createDiscussionRootComment(
    $authorUsername: String!
    $discussionId: ID!
    $text: String!
    $communityUrl: String!
  ) {
    addComment(
      input: [
        {
          Author: { username: $authorUsername }
          isRootComment: true
          Discussion: { id: $discussionId }
          text: $text
          Community: { url: $communityUrl }
        }
      ]
    ) {
      comment {
        id
        isRootComment
        ParentComment {
          id
        }
        Author {
          username
        }
        text
      }
    }
  }
`
// Creates a comment on an event,
// without a parent comment
export const CREATE_EVENT_ROOT_COMMENT = gql`
  mutation createEventRootComment(
    $authorUsername: String!
    $eventId: ID!
    $text: String!
    $communityUrl: String!
  ) {
    addComment(
      input: [
        {
          Author: { username: $authorUsername }
          isRootComment: true
          Event: { id: $eventId }
          text: $text
          Community: { url: $communityUrl }
        }
      ]
    ) {
      comment {
        id
        isRootComment
        Author {
          username
        }
        text
      }
    }
  }
`

export const REPLY_TO_DISCUSSION_COMMENT = gql`
  mutation createChildComment(
    $authorUsername: String!
    $parentCommentId: ID!
    $discussionId: ID!
    $text: String!
    $communityUrl: String!
  ) {
    addComment(
      input: [
        {
          Author: { username: $authorUsername }
          isRootComment: false
          ParentComment: { id: $parentCommentId }
          Discussion: { id: $discussionId }
          text: $text
          Community: { url: $communityUrl }
        }
      ]
    ) {
      comment {
        id
        Author {
          username
        }
        isRootComment
        ParentComment {
          id
          Author {
            username
          }
          text
        }
        Discussion {
          id
          title
        }
        text
      }
    }
  }
`

export const REPLY_TO_EVENT_COMMENT = gql`
  mutation createChildComment(
    $authorUsername: String!
    $parentCommentId: ID!
    $eventId: ID!
    $text: String!
    $communityUrl: String!
  ) {
    addComment(
      input: [
        {
          Author: { username: $authorUsername }
          isRootComment: false
          ParentComment: { id: $parentCommentId }
          Event: { id: $eventId }
          text: $text
          Community: { url: $communityUrl }
        }
      ]
    ) {
      comment {
        id
        Author {
          username
        }
        isRootComment
        ParentComment {
          id
          Author {
            username
          }
          text
        }
        Event {
          id
          title
        }
        text
      }
    }
  }
`

export const GET_COMMENT_BY_ID_WITH_REPLIES = gql`
  query getCommentByIdWithReplies($id: ID!) {
    getComment(id: $id) {
      Author {
        username
      }
      Discussion {
        title
      }
      text
      ChildComments {
        Author {
          username
        }
        text
      }
    }
  }
`

export const UPDATE_COMMENT = gql`
  mutation updateComment($id: ID!, $text: String!) {
    updateComment(input: { filter: { id: [$id] }, set: { text: $text } }) {
      comment {
        id
        Author {
          username
        }
        text
        Discussion {
          title
        }
      }
    }
  }
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: ID!) {
    deleteComment(filter: { id: [$id] }) {
      comment {
        id
        Author {
          username
        }
        text
      }
    }
  }
`

export const DELETE_COMMENTS = gql`
  mutation deleteComment($id: [ID!]) {
    deleteComment(filter: { id: $id }) {
      comment {
        id
        Author {
          username
        }
        text
      }
    }
  }
`

// Get all comment IDs in community
// Gets IDs of comments just so they can be
// deleted when a community or discussion is deleted. This query
// is needed because you can't cascade delete communities.
export const GET_COMMENT_IDS_IN_COMMUNITY = gql`
  query queryCommentIds($url: String!) {
      queryComment @cascade {
          id
          Community(filter: { url: { eq: $url } }) {
            url
          }
        }
  }
`
// Get all comment IDs in event
// so that the comments can be deleted 
// when the event is deleted. This query
// is needed because you can't cascade
// delete.
export const GET_COMMENT_IDS_IN_EVENT = gql`
  query queryCommentIds($eventId: [ID!]) {
      queryComment @cascade {
          id
          Event(
            filter: { 
              id: $eventId 
            }
          ) {
            id
          }
        }
  }
`

// Get all comment IDs in discussion
// so that the comments can be deleted 
// when the discussion is deleted. This query
// is needed because you can't cascade
// delete.
export const GET_COMMENT_IDS_IN_DISCUSSION = gql`
  query queryComment($discussionId: [ID!]) {
      queryComment @cascade {
          id
          Discussion(
            filter: { 
              id: $discussionId
            }
          ) {
            id
          }
       }
  }
`

// this works in Insomnia:

// query {
//   queryComment @cascade {
//       id
//       Discussion(
//         filter: {
//           id: ["0x4"] 
//       }) {
//         id
//       }
//       text
//     }
// }
