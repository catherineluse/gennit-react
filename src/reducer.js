export default function reducer(state, action) {
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
        case "SET_CURRENT_DISCUSSION":
            return {
                ...state,
                currentDiscussion: action.payload
            };
        case "SET_DISCUSSION_TO_EDIT":
            return {
                ...state,
                discussionToEdit:
            }
        case "UPDATE_COMMUNITY":
            return {
                const updatedCommunity = { ...action.payload };
                const updatedCommunityIndex = state.communities.findIndex(
                    c => c.url === state.communityToEdit.url
                )
                const updatedCommunities = [
                    ...state.communities.slice(-, updatedCommunityIndex),
                    updatedCommunity,
                    ...state.todos.slice(updatedTodoIndex + 1)
                ]
                return {
                    ...state,
                    currentCommunity: {},
                    communi
                }
            }
        case "DELETE_COMMUNITY":
            return {
                const filteredCommunities = state.communities.filter(c => c.url !== action.payload.url)
                return {
                    ...state,
                    currentCommunity: {},
                    communities: filteredCommunities
                }
            }
        case "TOGGLE_SIDE_NAV":
            return {
                ...state,
                showSideNav: !state.showSideNav
            }
        default:
            return state;
    }
}