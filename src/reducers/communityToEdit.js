const initialState = {
    communityToEdit: {}
}

const communityToEdit = (state = initialState, action) => {
    switch (action.type) {
        case "SET_COMMUNITY_TO_EDIT":
            return {
                ...state,
                communityToEdit: action.payload
            };
        default:
            return state
    }
}

export default communityToEdit