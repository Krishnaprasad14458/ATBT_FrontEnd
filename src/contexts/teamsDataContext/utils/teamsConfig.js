export const initialState = {
    teams: {},
    dashboardTeams: {
        paginatedTeams: [],
        currentPage: 1,
        totalPages: null,
        totalTeams: null,
        perPage: 5,
        loading: false,
        search: "",
        sortBy: "createdAt",
        startTeam: null,
        endTeam: null,
        filters: {
        }
    },
    teamsList: {
        paginatedTeams: [],
        currentPage: 1,
        totalPages: null,
        totalTeams: null,
        perPage: 10,
        loading: false,
        search: "",
        sortBy: "createdAt",
        startTeam: null,
        endTeam: null,
        filters: {
        }
    }
};