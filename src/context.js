import React from "react";

const Context = React.createContext({
    communities: [
        // sample data: [{
        //  "name":"goats",
        //  "url":"goats",
        //  "description":"all about goats",
        //  "Organizer":{
        //    "username":"cluse",
        //    "__typename":"User"
        //  },
        // "__typename":"Community"}
    ],
    currentCommunity: {},
    communityToEdit: {},
    currentDiscussion: {

    },
    discussionToEdit: {},
    showSideNav: true,
    feeds: [],
    favorites: [],
    messages: [],
    userProfileDetails: {}
});

export default Context;
