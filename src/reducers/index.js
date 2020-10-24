import { combineReducers } from 'redux';
import communities from './communities';
import comments from './comments';
import currentCommunity from './currentCommunity';
import communityToEdit from './communityToEdit';
import discussionToEdit from './discussionToEdit';
import currentDiscussion from './currentDiscussion';
import showSideNav from './showSideNav';
import loggedInUserProfileDetails from './loggedInUserProfileDetails';
import feeds from './feeds';
import messages from './messages';
import userProfileDetails from './userProfileDetails';
import events from './events';

const rootReducer = combineReducers({
    communities,
    comments,
    currentCommunity,
    communityToEdit,
    feeds,
    events,
    discussionToEdit,
    currentDiscussion,
    showSideNav,
    messages,
    userProfileDetails,
    loggedInUserProfileDetails
})



export default rootReducer;