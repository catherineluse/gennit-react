import gql from 'graphql-tag';


export const ADD_USER = gql`
  mutation addUser($user: AddUserInput!) {
    addUser(input: [$user]) {
      user {
        username
      }
    }
  }
`;

export const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      username
      name
    }
  }
`;


export const GET_USERS = gql`
  query {
    queryUser {
        name
        username
    }
  }
`;

// export const SUBSCRIBE_USER_TO_COMMUNITY = gql``;
// export const UNSUBSCRIBE_USER_FROM_COMMUNITY = gql``;
// export const GET_USERS_SUBSCRIBED_TO_COMMUNITY = gql``;
// export const UPDATE_USER_DETAILS = gql``;
// export const ADD_USER_AS_COMMUNITY_ORGANIZER = gql``;
// export const REMOVE_USER_AS_COMMUNITY_ORGANIZER = gql``;


// Auth restrictions:
// - User can only be updated by themselves or an admin.
// - User can only become an organizer of a community if:
//   - They created the community
//   - An existing organizer added them to the community
//   - An admin added them to the community as an organizer