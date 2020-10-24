const initialState = {
    currentCommunity: {}
}
const currentCommunity = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CURRENT_COMMUNITY":
            return {
                ...state,
                currentCommunity: action.payload
            };
        default:
            return state
    }
}

export default currentCommunity