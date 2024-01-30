const entitiesDataReducer = (state, action) => {
    switch (action.type) {
        case "SET_PAGINATED_ENTITIES":
            const reducerData = action.payload;
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    paginatedEntities: reducerData.data,
                    totalPages: reducerData.totalPages,
                    totalEntries: reducerData.totalEntries,
                },
            } : {
                ...state,
                pagination: {
                    ...state.pagination,
                    paginatedEntities: reducerData.data,
                    totalPages: reducerData.totalPages,
                    totalEntries: reducerData.totalEntries,
                },
            }

        case "SET_SEARCH":
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    search: action.payload.data,
                    currentPage: 1,
                },
            } : {
                ...state,
                pagination: {
                    ...state.pagination,
                    search: action.payload.data,
                    currentPage: 1,
                },
            }

        case "SET_PER_PAGE":
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    perPage: action.payload.data
                },
            } : {
                ...state,
                pagination: {
                    ...state.pagination,
                    perPage: action.payload.data
                },
            }

        case "SET_CUSTOM_PAGE":
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    currentPage: action.payload.data
                }
            } : {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload.data
                }
            }

        case "SET_LOADING":
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboard: {
                    ...state.dashboard,
                    loading: !state.dashboard.loading
                }
            } : {
                ...state,
                pagination: {
                    ...state.pagination,
                    loading: !state.pagination.loading
                }
            }


        default:
            return state;
    }
}

export default entitiesDataReducer;
