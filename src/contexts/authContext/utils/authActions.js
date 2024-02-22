import * as actionTypes from './authActionTypes'

export const setLoading = (context) => ({
    type: actionTypes.SET_LOADING,
    payload: { context: context }
});

export const setPaginatedEntities = (context, data) => ({
    type: actionTypes.SET_PAGINATED_ENTITIES,
    payload: { context: context, data: data }
});

export const setEntities = (data) => ({
    type: actionTypes.SET_ENTITIES,
    payload: data
});