import gql from 'graphql-tag';

// create discussion
// get all discussions in a community
// update discussion (create revision history)
// delete discussion

// Auth restrictions:
// - Discussion can only be updated by their author
//   or an admin
// - Discussions can only be deleted by their author
//   or an admin

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
}`;