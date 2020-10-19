
const initialState = {
    communities: []
}
export default function community(state = initialState, action) {
    switch (action.type) {
        case "GET_COMMUNITIES":
            return {
                ...state,
                communities: action.payload
            };
        case "ADD_COMMUNITY":
            const withAdded = [...state.communities, action.payload];

            return {
                ...state,
                communities: withAdded
            };
        case "SET_CURRENT_COMMUNITY":
            return {
                ...state,
                currentCommunity: action.payload
            };
        case "SET_COMMUNITY_TO_EDIT":
            return {
                ...state,
                communityToEdit: action.payload
            };
        case "UPDATE_COMMUNITY":
            const updatedCommunity = { ...action.payload };
            const updatedCommunityIndex = state.communities.findIndex(
                c => c.url === state.communityToEdit.url
            )
            const updatedCommunities = [
                ...state.communities.slice(0, updatedCommunityIndex),
                updatedCommunity,
                ...state.todos.slice(updatedCommunityIndex + 1)
            ]
            return {
                ...state,
                currentCommunity: {},
                communities: updatedCommunities
            }
        case "DELETE_COMMUNITY":
            const filteredCommunities = state.communities.filter(c => c.url !== action.payload.url)
            return {
                ...state,
                currentCommunity: {},
                communities: filteredCommunities
            }
        default:
            return state
    }
}