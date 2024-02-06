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

        case actionTypes.SET_PER_PAGE:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    pageSize: action.payload.data
                },
            }

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

// import * as actionTypes from './utils/usersActionTypes'
// const userEntitiesReducer = (state, action) => {
//     switch (action.type) {
//         case actionTypes.SET_USERS_DATA:
//             console.log(action.payload.data)
//             return {
//                 ...state,
//                 entities: { ...action?.payload } // Keep this if necessary
//             };

//         case actionTypes.SET_PAGINATED_USERS:
//             const reducerData = action.payload.data;
//             console.log(reducerData, "user context")
//             return action.payload.context === 'DASHBOARD' ? {
//                 ...state,
//                 pagination: {
//                     ...state.pagination,
//                     paginatedUsers: reducerData.users,
//                     totalUsers: reducerData.totalUsers,
//                     totalPages: reducerData.totalPages,
//                     currentPage: reducerData.currentPage,
//                     startUser: reducerData.startUser,
//                     endUser: reducerData.endUser,
//                     pageSize: reducerData.pageSize
//                 },
//             } : {
//                 ...state,
//                 userEntities: {
//                     ...state.userEntities,
//                     paginatedUsers: reducerData.users,
//                     totalUsers: reducerData.totalUsers,
//                     totalPages: reducerData.totalPages,
//                     currentPage: reducerData.currentPage,
//                     startUser: reducerData.startUser,
//                     endUser: reducerData.endUser,
//                     pageSize: reducerData.pageSize
//                 },
//             };

//         case actionTypes.SET_SEARCH:
//             return action.payload.context === 'USER_LIST' ? {
//                 ...state,
//                 userList: {
//                     ...state.userList,
//                     search: action.payload.data,
//                     currentPage: 1,
//                 },
//             } : {
//                 ...state,
//                 userEntities: {
//                     ...state.userEntities,
//                     search: action.payload.data,
//                     currentPage: 1,
//                 },
//             };

//         case actionTypes.SET_PER_PAGE:
//             return action.payload.context === 'USER_LIST' ? {
//                 ...state,
//                 userList: {
//                     ...state.userList,
//                     perPage: action.payload.data
//                 },
//             } : {
//                 ...state,
//                 userEntities: {
//                     ...state.userEntities,
//                     perPage: action.payload.data
//                 },
//             };

//         case actionTypes.SET_CUSTOM_PAGE:
//             return action.payload.context === 'USER_LIST' ? {
//                 ...state,
//                 userList: {
//                     ...state.userList,
//                     currentPage: action.payload.data
//                 }
//             } : {
//                 ...state,
//                 userEntities: {
//                     ...state.userEntities,
//                     currentPage: action.payload.data
//                 }
//             };

//         case actionTypes.SET_LOADING:
//             return action.payload.context === 'USER_LIST' ? {
//                 ...state,
//                 userList: {
//                     ...state.userList,
//                     loading: !state.userList.loading
//                 }
//             } : {
//                 ...state,
//                 userEntities: {
//                     ...state.userEntities,
//                     loading: !state.userEntities.loading
//                 }
//             };

//         default:
//             return state;
//     }
// };

// export default userEntitiesReducer;