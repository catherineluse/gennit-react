
const initialState = {
    discussions: []
}
export default function discussion(state = initialState, action) {
    switch (action.type) {
        case "SET_CURRENT_DISCUSSION":
            return {
                ...state,
                currentDiscussion: action.payload
            };
        case "SET_DISCUSSION_TO_EDIT":
            return {
                ...state,
                discussionToEdit: action.payload
            };
        default:
            return state
    }
}