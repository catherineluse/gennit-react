// create user

mutation {
    addUser(
        input: [
        {
            username: "catherine.luse@gmail.com",
            email: "catherine.luse@gmail.com"
            name: "Catherine"
        }]) {
        user {
            username
            name
            tasks {
                id
                title
            }
        }
    }
}


// get all users

query {
    queryUser {
        name
        username
        tasks {
            title
        }
    }
}


// get user by username

query {
    queryUser(filter: {
        username: {
            eq: "catherine.luse@gmail.com"
        }
    }) {
        name
        username
        email
    }
}

// subscribe user to a community

// get communities that a user is subscribed to

// unsubscribe a user from a community