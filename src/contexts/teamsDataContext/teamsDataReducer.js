import * as actionTypes from './utils/teamsActionTypes'
const teamsDataReducer = (state, action) => {
    console.log("teamsstatee", state)
    switch (action.type) {
        case actionTypes.SET_TEAMS:
            return {
                ...state,
                teams: { ...action?.payload }
            }
        case actionTypes.SET_PAGINATED_TEAMS:
            const reducerData = action.payload.data;
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardTeams: {
                    ...state.dashboardTeams,
                    paginatedTeams: reducerData.Teams,
                    totalPages: reducerData.totalPages,
                    totalTeams: reducerData.totalTeams,
                    startTeam: reducerData.startTeam,
                    endTeam: reducerData.endTeam,
                    currentPage: reducerData.currentPage
                },
            } : {
                ...state,
                teamsList: {
                    ...state.teamsList,
                    paginatedTeams: reducerData.Teams,
                    totalPages: reducerData.totalPages,
                    totalTeams: reducerData.totalTeams,
                    startTeam: reducerData.startTeam,
                    endTeam: reducerData.endTeam,
                    currentPage: reducerData.currentPage

                },
            }

        case actionTypes.SET_SEARCH:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardTeams: {
                    ...state.dashboardTeams,
                    search: action.payload.data,
                    currentPage: 1,
                },
            } : {
                ...state,
                teamsList: {
                    ...state.teamsList,
                    search: action.payload.data,
                    currentPage: 1,
                },
            }

        case actionTypes.SET_PER_PAGE:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardTeams: {
                    ...state.dashboardTeams,
                    perPage: action.payload.data
                },
            } : {
                ...state,
                teamsList: {
                    ...state.teamsList,
                    perPage: action.payload.data
                },
            }

        case actionTypes.SET_CUSTOM_PAGE:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardTeams: {
                    ...state.dashboardTeams,
                    currentPage: action.payload.data
                }
            } : {
                ...state,
                teamsList: {
                    ...state.teamsList,
                    currentPage: action.payload.data
                }
            }

        case actionTypes.SET_LOADING:
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardTeams: {
                    ...state.dashboardTeams,
                    loading: !state.dashboardTeams.loading
                }
            } : {
                ...state,
                teamsList: {
                    ...state.teamsList,
                    loading: !state.teamsList.loading
                }
            }

        case actionTypes.SET_FILTERS:
            console.log(action.payload, "filterss")
            return action.payload.context === 'DASHBOARD' ? {
                ...state,
                dashboardTeams: {
                    ...state.dashboardTeams,
                    filters: { ...action.payload.data }
                }
            } : {
                ...state,
                teamsList: {
                    ...state.teamsList,
                    filters: { ...action.payload.data }
                }
            }



        default:
            return state;
    }
}

export default teamsDataReducer;
