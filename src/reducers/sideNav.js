
const initialState = {
    sideNav: true
}
export default function sideNav(state = initialState, action) {
    switch (action.type) {
        case "TOGGLE_SIDE_NAV":
            return {
                ...state,
                showSideNav: !state.showSideNav
            }
        default:
            return state
    }
}