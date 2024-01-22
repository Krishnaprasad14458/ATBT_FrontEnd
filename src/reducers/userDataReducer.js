const userDataReducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS_DATA":
            return {
                ...state,
                users: action.payload,
            };

        case "SET_PAGINATED_USERS":
            const reducerData = action.payload;
            console.log(reducerData)
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    paginatedUsers: reducerData.data,
                    currentPage: reducerData.currentPage,
                    totalPages: reducerData.totalPages || null
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

        case "SET_LOADING":
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    loading: !state.pagination.loading
                },
            };

        default:
            return state;
    }
};

export default userDataReducer;