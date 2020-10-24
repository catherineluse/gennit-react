

const communities = (state = [], action) => {
    switch (action.type) {
        case "GET_COMMUNITIES":
            return action.payload;
        case "ADD_COMMUNITY":
            const withAdded = [...state.communities, action.payload];

            return withAdded
        case "UPDATE_COMMUNITY":
            const updatedCommunity = { ...action.payload };
            const updatedCommunityIndex = state.findIndex(
                c => c.url === updatedCommunity.url
            )
            const updatedCommunities = [
                ...state.slice(0, updatedCommunityIndex),
                updatedCommunity,
                ...state.slice(updatedCommunityIndex + 1)
            ]
            return updatedCommunities
        case "DELETE_COMMUNITY":
            const filteredCommunities = state.filter(c => c.url !== action.payload.url)
            return filteredCommunities
        default:
            return state
    }
}

export default communities