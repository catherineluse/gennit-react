import { gql } from '@apollo/client'

// Auth restrictions:
// - Event can only be updated by their author
//   or an admin
// - Events can only be deleted by their author
//   or an admin

// Add event
export const ADD_EVENT = gql`
  mutation addEvent(
    $title: String!
    $description: String
    $startTime: String!
    $endTime: String!
    $communityUrl: String!
    $location: String
    $howToFindLocation: String
    $isVirtual: Boolean!
    $virtualEventUrl: String
    $organizer: String!
  ) {
    addEvent(
      input: [
        {
          title: $title
          description: $description
          startTime: $startTime
          endTime: $endTime
          Community: { url: $communityUrl }
          location: $location
          howToFindLocation: $howToFindLocation
          isVirtual: $isVirtual
          virtualEventUrl: $virtualEventUrl
          Organizer: { username: $organizer }
        }
      ]
    ) {
      event {
        id
        title
        description
        Community {
            url
        }
        Organizer {
          username
        }
        location
        howToFindLocation
        startTime
        endTime
        virtualEventUrl
        isVirtual
      }
    }
  }
`

// Update event
export const UPDATE_EVENT = gql`
  mutation updateEvent(
      $id: ID!
      $title: String
      $description: String
      $startTime: String
      $endTime: String
      $location: String!
      $howToFindLocation: String
      $isVirtual: Boolean!
      $virtualEventUrl: String
    ) {
    updateEvent(
      input: { 
        filter: { 
          id: [$id] 
        },
        set: { 
            title: $title
            description: $description
            startTime: $startTime
            endTime: $endTime
            location: $location
            howToFindLocation: $howToFindLocation
            isVirtual: $isVirtual
            virtualEventUrl: $virtualEventUrl
        } 
      }
    ) {
      event {
        id
        title
        description
        startTime
        endTime
        location
        howToFindLocation
        virtualEventUrl
        isVirtual
      }
    }
  }
`

// get event by ID
export const GET_EVENT = gql`
  query getEvent($id: ID!) {
    getEvent(id: $id) {
      id
      title
      description
      startTime
      endTime
      location
      howToFindLocation
      isVirtual
      virtualEventUrl
      Community {
          url
      }
      Organizer {
          username
      }
      Comments {
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
// Get all event IDs in community
// Gets IDs of events just so they can be
// deleted when a community is deleted. This query
// is needed because you can't cascade delete communities.
export const GET_EVENT_IDS_IN_COMMUNITY = gql`
  query getEventIdsInCommunity($url: String!) {
    queryEvent @cascade {
      id
      Community(filter: { url: { eq: $url } }) {
        url
      }
    }
  }
`

// Get all events in a community
export const GET_EVENTS_IN_COMMUNITY = gql`
  query getEventsInCommunity($url: String!) {
    queryEvent @cascade {
      id
      title
      Community(filter: { url: { eq: $url } }) {
        url
      }
      Organizer {
        username
      }
    }
  }
`

export const DELETE_EVENTS = gql`
  mutation deleteEvent($id: [ID!]) {
    deleteEvent(filter: { id: $id }) {
      event {
        id
      }
    }
  }
`

export const DELETE_EVENT = gql`
  mutation deleteEvent($id: ID!) {
    deleteEvent(filter: { id: [$id] }) {
      event {
        id
      }
    }
  }
`