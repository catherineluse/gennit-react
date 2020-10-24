
const initialState = {
    showSideNav: true
}
const showSideNav = (state = initialState, action) => {
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

export default showSideNav;