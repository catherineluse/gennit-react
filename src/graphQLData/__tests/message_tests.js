// create message

mutation {
    addMessage(input: [
        {
            Author: {
                username: "catherine.luse@gmail.com"
            },
            Recipient: {
                username: "Alice_Tester"
            },
            text: "Tennis balls are awesome"
        }
    ]) {
        message {
            id
            text
        }
    }
}


// delete message

mutation {
  deleteMessage(
    filter: {
      id: ["0x1e"]
  }){
    message {
      id
      text
      Author {
        username
      }
      Recipient {
        username
      }
   }
  }
}


// get conversation between two users
query {
  queryMessage {
    id
    Author (filter: {username: {eq: "cluse"}}){
      username
    }
    text
    Recipient (filter: {username: {eq: "Alice_Tester"}}){
      username
    }
  }
}

query {
  queryMessage {
    id
    Author (filter: {username: {eq: "Alice_Tester"}}){
      username
    }
    text
    Recipient (filter: {username: {eq: "cluse"}}){
      username
    }
  }
}


// get all messages to and from a user

query {
  queryMessage {
    id
    Author (filter: {username: {eq: "cluse"}}){
      username
    }
    text
    Recipient {
      username
    }
  }
}

query {
  queryMessage {
    id
    Author {
      username
    }
    text
    Recipient (filter: {username: {eq: "cluse"}}){
      username
    }
  }
}
