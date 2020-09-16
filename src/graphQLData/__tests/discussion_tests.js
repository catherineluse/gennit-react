// Add discussion

mutation {
    addDiscussion(input: [
        {
            title: "all about dogs",
            body: "dogs"
      Community: {
                url: "dogs"
            }
      Author: {
                username: "catherine.luse@gmail.com"
            }
        }
    ]) {
        discussion {
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


// Get discussion by ID


query {
    getDiscussion(id: "0x2718") {
        title
        body
        Author {
            username
        }
        Community {
            url
        }
    }
}

// Get all discussions in a community

query {
    queryDiscussion {
        id
        title
        body
        Community(
            filter: {
            url: {
                eq: "dogs"
            }
        }
        ){
            url
        }
        Author {
            username
        }
    }
}


// Update a discussion


mutation {
    updateDiscussion(
        input: {
        filter: {
            id: ["0x12"]
        },
        set: {
            title: "We are dogs",
            body: "We are using computers with our paws"
        }
    }) {
        discussion {
            Author { username }
            title
            body
            Community {
                url
            }
        }
    }
}

// Delete a discussion

mutation {
    deleteDiscussion(
        filter: {
        id: ["0x13"]
    }
    ) {
        discussion {
            Author { username }
            title
            body
            Community {
                url
            }
        }
    }
}