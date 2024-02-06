export const initialState = {
    users: [],
    pagination: {
        paginatedUsers: [],
        search: "",
        sortBy: "userName",
        loading: false,
        totalUsers: null,
        totalPages: null,
        currentPage: 1,
        pageSize: 5,
        startUser: null,
        endUser: null,
    },
    settings: {
        paginatedUsers: [],
        search: "",
        sortBy: "userName",
        loading: false,
        totalUsers: null,
        totalPages: null,
        currentPage: 1,
        pageSize: 10,
        startUser: null,
        endUser: null,
    }
};