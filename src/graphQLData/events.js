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
    $startDay: String!
    $startTime: String!
    $durationInMinutes: Int
    $communityUrl: String!
    $location: String!
    $isVirtual: Boolean!
    $organizer: String!
  ) {
    addEvent(
      input: [
        {
          title: $title
          description: $description
          startDay: $startDay
          startTime: $startTime
          durationInMinutes: $durationInMinutes
          Community: { url: $communityUrl }
          location: $location
          isVirtual: $isVirtual
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
        startDay
        startTime
        durationInMinutes
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
      $startDay: String
      $startTime: String
      $durationInMinutes: Int
      $location: String!
      $isVirtual: Boolean!
    ) {
    updateEvent(
      input: { 
        filter: { 
          id: [$id] 
        },
        set: { 
            title: $title
            description: $description
            startDay: $startDay
            startTime: $startTime
            durationInMinutes: $durationInMinutes
            location: $location
            isVirtual: $isVirtual
        } 
      }
    ) {
      event {
        id
        title
        description
        startDay
        startTime
        durationInMinutes
        location
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
      startDay
      startTime
      durationInMinutes
      location
      isVirtual
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