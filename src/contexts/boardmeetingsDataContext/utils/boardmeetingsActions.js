import * as actionTypes from './boardmeetingsActionTypes'

export const setLoading = (context) => ({
    type: actionTypes.SET_LOADING,
    payload: { context: context }
});

export const setPaginatedBoardMeetings = (context, data) => ({
    type: actionTypes.SET_PAGINATED_BOARDMEETINGS,
    payload: { context: context, data: data }
});

export const setBoardMeetings = (data) => ({
    type: actionTypes.SET_BOARDMEETINGS,
    payload: data
});


export const setFilters = (data, context) => ({
    type: actionTypes.SET_FILTERS,
    payload: { context: context, data: data }
})