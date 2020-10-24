const initialState = {
    currentDiscussion: {},
}
const currentDiscussion = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CURRENT_DISCUSSION":
            return {
                ...state,
                currentDiscussion: action.payload
            };
        default:
            return state
    }
}

export default currentDiscussion