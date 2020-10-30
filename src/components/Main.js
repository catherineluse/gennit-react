import React from 'react'
import TopNav from './TopNav'
import CommunityList from './CommunityList'
import Community from './Community'
import PrivateRoute from './PrivateRoute'
import { Route } from 'react-router-dom'
import Profile from './Profile'
import UserProfile from './UserProfile'
import UserList from './UserList'
import { Switch } from 'react-router-dom'
import Discussion from './Discussion'
import { useSelector } from 'react-redux'

export const communityBodyContentTypes = {
  DISCUSSION_LIST: 'DISCUSSION_LIST',
  SETTINGS: 'SETTINGS'
}

const Main = () => {
  const showSideNav = useSelector(state => state.showSideNav)
  return (
    <div className={`main ${showSideNav ? 'movedToTheRight' : ''}`}>
      <TopNav />
      <Switch>
        <PrivateRoute path='/' component={CommunityList} exact />
        <PrivateRoute path='/communities' component={CommunityList} exact />
        <PrivateRoute path='/users' component={UserList} exact />
        <PrivateRoute path='/profile' component={Profile} exact />
        <PrivateRoute path='/u/:username' component={UserProfile} exact />
        <Route
          path={`/c/:url`}
          render={props => (
            <Community
              {...props}
              communityBodyContent={communityBodyContentTypes.DISCUSSION_LIST}
            />
          )}
          exact
        />
        <Route
          path={`/c/:url/settings`}
          render={props => (
            <Community
              {...props}
              communityBodyContent={communityBodyContentTypes.SETTINGS}
            />
          )}
          exact
        ></Route>
        <Route path={`/c/:url/discussion/:discussionId`} exact>
          <Discussion />
        </Route>
      </Switch>
    </div>
  )
}

export default Main
