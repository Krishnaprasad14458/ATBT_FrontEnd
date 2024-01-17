const entitesDataReducer = (state, action) => {
    switch (action.type) {
        case "SET_ENTITIES_DATA":
            return {
                ...state,
                entities: action.payload,
            };

        case "SET_PAGINATED_ENTITIES":
            const reducerData = action.payload;
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    paginatedEntities: reducerData.data,
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
}

export default entitesDataReducer;