import * as actionTypes from './usersActionTypes'
export const setUsersData = (data, context) => ({
    type: actionTypes.SET_USERS_DATA,
    payload: {
        data,
    },
});
export const setPaginatedUsers = (data, context) => ({
    type: actionTypes.SET_PAGINATED_USERS,
    payload: {
        data,
    },
});
export const setLoading = () => ({
    type: actionTypes.SET_LOADING,
});

export const setPerPage = (data, context) => ({
    type: actionTypes.SET_PER_PAGE,
    payload: {
        data
    }
});