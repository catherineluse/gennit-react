import { gql } from '@apollo/client'

export const ADD_COMMUNITY = gql`
  mutation addCommunity(
    $url: String!
    $name: String!
    $description: String
    $organizer: String!
  ) {
    addCommunity(
      input: [
        {
          description: $description
          name: $name
          url: $url
          Organizer: { username: $organizer }
        }
      ]
    ) {
      community {
        description
        name
        url
        Organizer {
          username
        }
      }
    }
  }
`

export const GET_COMMUNITY = gql`
  query getCommunity($url: String!) {
    getCommunity(url: $url) {
      name
      url
      description
      Organizer {
        username
      }
    }
  }
`
export const GET_COMMUNITY_WITH_DISCUSSIONS_AND_EVENTS = gql`
  query getCommunityWithDiscussions($url: String!) {
    getCommunity(url: $url) {
      name
      url
      description
      Organizer {
        username
      }
      RelatedCommunities {
        url
      }
      Discussions {
        id
        title
        Author {
          username
        }
      }
      Events {
        id
        title
        startDay
        location
        Organizer {
          username
        }
        isVirtual
      }
    }
  }
`
export const GET_DISCUSSIONS = gql`
  query {
    queryDiscussion {
      id
      title
      body
      Community(filter: { url: { eq: "dogs" } }) {
        url
      }
      Author {
        username
      }
    }
  }
`
export const GET_COMMUNITIES = gql`
  query queryCommunity {
    queryCommunity {
      name
      url
      description
      Organizer {
        username
      }
    }
  }
`

export const DELETE_COMMUNITY = gql`
  mutation deleteCommunity($url: String!) {
    deleteCommunity(filter: { url: { eq: $url } }) {
      community {
        url
      }
    }
  }
`
export const UPDATE_COMMUNITY = gql`
  mutation updateCommunity($url: String!, $name: String, $description: String) {
    updateCommunity(
      input: {
        filter: { url: { eq: $url } }
        set: { name: $name, description: $description }
      }
    ) {
      community {
        url
        name
        description
      }
    }
  }
`

// Auth restrictions:
// - Communities can only be updated by their organizer(s)
//   or an admin
// - Communities can only be deleted by their organizer(s)
//   or an admin
