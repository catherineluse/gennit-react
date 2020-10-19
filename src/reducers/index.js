import { combineReducers } from 'redux'
import community from './community'
import discussion from './discussion'
import sideNav from './sideNav'

const reducer = combineReducers({
    community,
    discussion,
    sideNav
})

export default reducer;