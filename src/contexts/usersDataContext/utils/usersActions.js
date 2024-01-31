import * as actionTypes from './usersActionTypes'
export const setUsersData = (data) => ({
    type: actionTypes.SET_USERS_DATA,
    payload: {
        data,
    },
});
export const setPaginatedUsers = (data) => ({
    type: actionTypes.SET_PAGINATED_USERS,
    payload: {
        data,
    },
});
export const setLoading = () => ({
    type: actionTypes.SET_LOADING,
});