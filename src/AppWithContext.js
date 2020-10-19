import React, { useContext, useReducer } from 'react';
import Context from './context';
import UserList from './components/UserList';
import CommunityList from './components/CommunityList';
import Community from './components/Community';
import TopNav from './components/TopNav';
import SideNav from './components/SideNav';
import PrivateRoute from './PrivateRoute';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile'
import { Switch } from 'react-router-dom';
import reducer from "./reducers/index";

const AppWithContext = () => {

    const initialState = useContext(Context)
    const [state, dispatch] = useReducer(reducer, initialState)


    return (<Context.Provider value={{ state, dispatch }}>
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
    </Context.Provider>)
}

export default AppWithContext;