import React from 'react'
import TopNav from './TopNav';
import CommunityList from './CommunityList';
import Community from './Community';
import PrivateRoute from './PrivateRoute';
import Profile from './Profile';
import UserProfile from './UserProfile';
import UserList from './UserList';
import { Switch } from 'react-router-dom';

const Main = ({ movedToTheRight, navItemsMovedToTheLeft }) => {

    return (
        <div className={`main ${movedToTheRight ? "movedToTheRight" : ""}`}>
            <TopNav movedToTheLeft={navItemsMovedToTheLeft} />
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
        </div >
    )
}

export default Main