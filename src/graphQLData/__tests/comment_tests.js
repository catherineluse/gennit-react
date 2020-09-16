// Create root comment

mutation {
    addComment(input: [
        {
            Author: {
                username: "catherine.luse@gmail.com"
            },
            isRootComment: true,
            Discussion: {
                id: "0x12"
            },
            text: "Tennis balls are awesome"
        }
    ]) {
        comment {
            id
            Author {
                username
            }
            isRootComment
            Discussion {
                title
            }
            text
        }
    }
}


// Create child comment

mutation {
    addComment(input: [
        {
            Author: {
                username: "catherine.luse@gmail.com"
            },
            isRootComment: false,
            ParentComment: {
                id: "0x15"
            }
      Discussion: {
                id: "0x12"
            },
            text: "Tennis balls are awesome"
        }
    ]) {
        comment {
            id
            Author {
                username
            }
            isRootComment
            ParentComment {
                Author {
                    username
                }
                text
            }
            Discussion {
                title
            }
            text
        }
    }
}

// Update comment

mutation {
    updateComment(
        input: {
        filter: {
            id: ["0x16"]
        },
        set: {
            text: "Yes they are cool"
        }
    }) {
        comment {
            Author { username }
            text
            Discussion {
                title
            }
        }
    }
}
// Get comments in discussion
query {
    getDiscussion(id: "0x12") {
        title
        body
        Author {
            username
        }
        Community {
            url
        }
        Comment(
            filter: {
            isRootComment: true
        }
        ) {
            id
            Author {
                username
            }
            text
            ChildComment {
                id
                Author {
                    username
                }
                text
            }
        }
    }
}

// Get child comments of parent

query {
    getComment(id: "0x15") {
        Author {
            username
        }
        Discussion {
            title
        }
        text
        ChildComment {
            Author {
                username
            }
            text
        }
    }
}

// Get comments by user

query {
    queryComment {
        id
        Author(
            filter: {
            username: {
                eq: "catherine.luse@gmail.com"
            }
        }
        ){
            username
        }
        text
        isRootComment
    }
}

// Delete comment

mutation {
    deleteComment(filter: {
        id: ["0x14"]
    }) {
        comment {
            id
            Author {
                username
            }
            text
        }
    }
}