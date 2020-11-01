import gql from 'graphql-tag'

// Auth restrictions:
// - Comments can only be deleted by their author
//   or by an admin
// - Comments can only be updated by their author
//   or by an admin

export const CREATE_ROOT_COMMENT = gql`
  mutation createRootComment(
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
        Author {
          username
        }
        isRootComment
        Discussion {
          title
        }
        text
        Community {
          url
        }
      }
    }
  }
`

export const CREATE_CHILD_COMMENT = gql`
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
          Author {
            username
          }
          text
        }
        Discussion {
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
  mutation deleteComment($id: ID) {
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

// Get all discussion IDs in community
// Gets IDs of discussions just so they can be
// deleted when a community is deleted. This query
// is needed because you can't cascade delete communities.
export const GET_COMMENT_IDS_IN_COMMUNITY = gql`
  query getCommentIdsInCommunity($url: String!) {
    queryComment @cascade {
      id
      Community(filter: { url: { eq: $url } }) {
        url
      }
    }
  }
`
