import React, { useReducer } from 'react';
import SideNav from './components/SideNav';
import reducer from './reducers/index';
import Main from './components/Main'

const initialState = {
    communities: [],
    currentCommunity: {},
    communityToEdit: {},
    currentDiscussion: {},
    discussionToEdit: {},
    showSideNav: true,
    events: [],
    feeds: [],
    messages: [],
    userProfileDetails: {},
    loggedInUserProfileDetails: {}
}

// sample data for community: [{
//  "name":"goats",
//  "url":"goats",
//  "description":"all about goats",
//  "Organizer":{
//    "username":"cluse",
//    "__typename":"User"
//  },
// "__typename":"Community"}

export const GennitContext = React.createContext(initialState);

export const AppWithContext = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <GennitContext.Provider value={{ state, dispatch }}>
            <div>
                {state.showSideNav ? (
                    <div>
                        <SideNav />
                        <Main movedToTheRight={true} navItemsMovedToTheLeft={true} />
                    </div>
                ) : (
                        <div>
                            <Main movedToTheRight={false} />
                        </div>
                    )}

            </div>
        </GennitContext.Provider>)
}

