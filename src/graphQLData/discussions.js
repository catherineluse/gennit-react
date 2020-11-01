import gql from 'graphql-tag'

// Auth restrictions:
// - Discussion can only be updated by their author
//   or an admin
// - Discussions can only be deleted by their author
//   or an admin

// Add discussion
export const ADD_DISCUSSION = gql`
  mutation addDiscussion(
    $title: String!
    $body: String
    $communityUrl: String!
    $authorUsername: String!
  ) {
    addDiscussion(
      input: [
        {
          title: $title
          body: $body
          Community: { url: $communityUrl }
          Author: { username: $authorUsername }
        }
      ]
    ) {
      discussion {
        id
        title
        body
        Community {
          url
        }
        Author {
          username
        }
      }
    }
  }
`

// Update discussion
export const UPDATE_DISCUSSION = gql`
  mutation udpatedDiscussion($id: ID!, $title: String, $body: String) {
    updateDiscussion(
      input: { filter: { id: [$id] }, set: { title: $title, body: $body } }
    ) {
      discussion {
        Author {
          username
        }
        title
        body
        Community {
          url
        }
      }
    }
  }
`

// get discussion by ID
export const GET_DISCUSSION = gql`
  query getDiscussion($id: ID!) {
    getDiscussion(id: $id) {
      title
      body
      Author {
        username
      }
      Community {
        url
      }
      Comments {
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
export const GET_DISCUSSION_IDS_IN_COMMUNITY = gql`
  query getDiscussionIdsInCommunity($url: String!) {
    queryDiscussion @cascade {
      id
      Community(filter: { url: { eq: $url } }) {
        url
      }
    }
  }
`

// Get all discussions in a community
export const GET_DISCUSSIONS_IN_COMMUNITY = gql`
  query getDiscussionsInCommunity($url: String!) {
    queryDiscussion @cascade {
      id
      title
      body
      Community(filter: { url: { eq: $url } }) {
        url
      }
      Author {
        username
      }
    }
  }
`

export const DELETE_DISCUSSIONS = gql`
  mutation deleteDiscussion($id: [ID!]) {
    deleteDiscussion(filter: { id: $id }) {
      discussion {
        id
        title
        body
        Author {
          username
        }
      }
    }
  }
`
