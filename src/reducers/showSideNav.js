

const showSideNav = (state = true, action) => {
    switch (action.type) {
        case "TOGGLE_SIDE_NAV":
            return !state;
        default:
            return state
    }
}

export default showSideNav;