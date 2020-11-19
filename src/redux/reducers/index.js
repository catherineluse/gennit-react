import { combineReducers } from 'redux'
import communities from './communities'
import comments from './comments'
import currentCommunity from './currentCommunity'
import currentDiscussion from './currentDiscussion'
import showSideNav from './showSideNav'

const rootReducer = combineReducers({
  communities,
  comments,
  currentCommunity,
  currentDiscussion,
  showSideNav,
})

export default rootReducer
