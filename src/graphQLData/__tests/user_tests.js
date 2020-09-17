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

mutation {
    updateUser(input: {
        filter: {
            username: {
                eq: "catherine.luse@gmail.com"
            }
        },
        set: {
            SubscriberOfCommunities: [{ url: "cats" }]
        }
    }) {
        user {
            username
            SubscriberOfCommunities {
                url
            }
        }
    }
}

// get communities that a user is subscribed to
query {
    getUser(
        username : "catherine.luse@gmail.com"
    ) {
        username
        SubscriberOfCommunities {
            url
        }
    }
}

// unsubscribe a user from a community

mutation {
    updateUser(input: {
        filter: {
            username: {
                eq: "catherine.luse@gmail.com"
            }
        },
        remove: {
            SubscriberOfCommunities: [{
                url: "dogs"
            }]
        }
    }) {
        user {
            username
            SubscriberOfCommunities {
                url
            }
        }
    }
}