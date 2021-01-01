import React from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import CommunityList from './CommunityList'
import Community from './Community'
import Profile from './Profile'
import UserProfile from './UserProfile'
import UserList from './UserList'
import Discussion from './Discussion'
import Event from './Event'

export const communityBodyContentTypes = {
  EVENT_LIST: 'EVENT_LIST',
  DISCUSSION_LIST: 'DISCUSSION_LIST',
  SETTINGS: 'SETTINGS'
}

const Main = ({ showSideNav }) => {

  return (
    <div className={`mainContent ${showSideNav ? 'movedToTheRight' : ''}`}>

      <Switch>
        <Route path='/' component={CommunityList} exact />
        <Route path='/communities' component={CommunityList} exact />
        <Route path='/users' component={UserList} exact />
        <Route path='/profile' component={Profile} exact />
        <Route path='/u/:username' component={UserProfile} exact />
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
          path={`/c/:url/events`}
          render={props => (
            <Community
              {...props}
              communityBodyContent={communityBodyContentTypes.EVENT_LIST}
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
        <Route 
          path={`/c/:url/discussion/:discussionId`} 
          exact
        >
          <Discussion />
        </Route>
        <Route 
          path={`/c/:url/event/:eventId`} 
          exact
        >
          <Event />
        </Route>
      </Switch>
    </div>
  )
}

export default Main
