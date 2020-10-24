const initialState = {
    discussionToEdit: {}
}

const discussionToEdit = (state = initialState, action) => {
    switch (action.type) {
        case "SET_DISCUSSION_TO_EDIT":
            return {
                ...state,
                discussionToEdit: action.payload
            };
        default:
            return state
    }
}

export default discussionToEdit