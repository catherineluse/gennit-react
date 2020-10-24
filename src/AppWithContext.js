import React, { useReducer } from 'react';
import CommunityList from './components/CommunityList';
import Community from './components/Community';
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import PrivateRoute from './PrivateRoute';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import UserList from './components/UserList';
import { Switch } from 'react-router-dom';
import reducer from './reducers/index';

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
                <SideNav />
                <div className="main">
                    <TopNav />
                    <Switch>
                        <PrivateRoute path='/' component={CommunityList} exact />
                        <PrivateRoute
                            path='/communities'
                            component={CommunityList}
                            exact
                        />
                        <PrivateRoute path='/users' component={UserList} exact />
                        <PrivateRoute path='/profile' component={Profile} exact />
                        <PrivateRoute path='/u/:username' component={UserProfile} exact />
                        <PrivateRoute path='/c/:url' component={Community} exact />
                    </Switch>
                </div>
            </div>
        </GennitContext.Provider>)
}

