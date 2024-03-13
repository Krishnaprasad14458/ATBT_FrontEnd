import * as actionTypes from './teamsActionTypes'

export const setLoading = (context) => ({
    type: actionTypes.SET_LOADING,
    payload: { context: context }
});

export const setPaginatedTeams = (context, data) => ({
    type: actionTypes.SET_PAGINATED_TEAMS,
    payload: { context: context, data: data }
});

export const setTeams = (data) => ({
    type: actionTypes.SET_TEAMS,
    payload: data
});


export const setFilters = (data, context) => ({
    type: actionTypes.SET_FILTERS,
    payload: { context: context, data: data }
})