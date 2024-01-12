const userDataReducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS_DATA":
            return {
                ...state,
                users: action.payload,
            };

        case "SET_PAGINATED_USERS":
            const reducerData = action.payload;
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    paginatedUsers: reducerData.data,
                    currentPage: reducerData.currentPage,
                    totalPages: reducerData.totalPages
                },
            };

        case "SET_SEARCH":
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    search: action.payload
                },
            };

        case "SET_CUSTOM_PAGE":
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload
                }
            }

        default:
            return state;
    }
};

export default userDataReducer;