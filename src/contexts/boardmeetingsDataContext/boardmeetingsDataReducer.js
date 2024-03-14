import * as actionTypes from './utils/boardmeetingsActionTypes'
const BoardMeetingsDataReducer = (state, action) => {
    console.log("boardmeetingstatee", state)
    switch (action.type) {
        case actionTypes.SET_BOARDMEETINGS:
            return {
                ...state,
                boardmeetings: { ...action?.payload }
            }
        case actionTypes.SET_PAGINATED_BOARDMEETINGS:
            const reducerData = action.payload.data;
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardBoardMeetings: {
                    ...state.dashboardBoardMeetings,
                    paginatedBoardMeetings: reducerData.Meetings,
                    totalPages: reducerData.totalPages,
                    totalBoardMeetings: reducerData.totalmeetings,
                    startBoardMeeting: reducerData.startmeeting,
                    endBoardMeeting: reducerData.endmeeting,
                    currentPage: reducerData.currentPage
                },
            } : {
                ...state,
                boardmeetingsList: {
                    ...state.boardmeetingsList,
                    paginatedBoardMeetings: reducerData.Meetings,
                    totalPages: reducerData.totalPages,
                    totalBoardMeetings: reducerData.totalmeetings,
                    startBoardMeeting: reducerData.startmeeting,
                    endBoardMeeting: reducerData.endmeeting,
                    currentPage: reducerData.currentPage

                },
            }

        case actionTypes.SET_SEARCH:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardBoardMeetings: {
                    ...state.dashboardBoardMeetings,
                    search: action.payload.data,
                    currentPage: 1,
                },
            } : {
                ...state,
                boardmeetingsList: {
                    ...state.boardmeetingsList,
                    search: action.payload.data,
                    currentPage: 1,
                },
            }

        case actionTypes.SET_PER_PAGE:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardBoardMeetings: {
                    ...state.dashboardBoardMeetings,
                    perPage: action.payload.data
                },
            } : {
                ...state,
                boardmeetingsList: {
                    ...state.boardmeetingsList,
                    perPage: action.payload.data
                },
            }

        case actionTypes.SET_CUSTOM_PAGE:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardBoardMeetings: {
                    ...state.dashboardBoardMeetings,
                    currentPage: action.payload.data
                }
            } : {
                ...state,
                boardmeetingsList: {
                    ...state.boardmeetingsList,
                    currentPage: action.payload.data
                }
            }

        case actionTypes.SET_LOADING:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardBoardMeetings: {
                    ...state.dashboardBoardMeetings,
                    loading: !state.dashboardBoardMeetings.loading
                }
            } : {
                ...state,
                boardmeetingsList: {
                    ...state.boardmeetingsList,
                    loading: !state.boardmeetingsList.loading
                }
            }

        case actionTypes.SET_FILTERS:
            console.log(action.payload, "filterss")
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardBoardMeetings: {
                    ...state.dashboardBoardMeetings,
                    filters: { ...action.payload.data }
                }
            } : {
                ...state,
                boardmeetingsList: {
                    ...state.boardmeetingsList,
                    filters: { ...action.payload.data }
                }
            }



        default:
            return state;
    }
}

export default BoardMeetingsDataReducer;
