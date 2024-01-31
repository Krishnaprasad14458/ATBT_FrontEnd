import * as actionTypes from './utils/usersActionTypes'
const userDataReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USERS_DATA:
            console.log(action.payload.data)
            return {
                ...state,
                users: action.payload.data,
            };

        case actionTypes.SET_PAGINATED_USERS:
            const { users, totalUsers, totalPages, currentPage, pageSize, startUser, endUser } = action.payload.data;
            console.log(users, totalUsers, totalPages, currentPage, pageSize, startUser, endUser)
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    paginatedUsers: users,
                    totalUsers,
                    totalPages,
                    currentPage,
                    pageSize,
                    startUser,
                    endUser,

                    // currentPage: reducerData.currentPage,
                    // totalPages: reducerData.totalPages || null
                },
            };

        case actionTypes.SET_SEARCH:
            console.log(action.payload)
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    search: action.payload,
                    currentPage: 1
                },
            };

        case actionTypes.SET_CUSTOM_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload
                }
            }

        case actionTypes.SET_LOADING:
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