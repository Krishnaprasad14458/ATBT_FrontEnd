export const initialState = {
    entities: [],
    dashboardEntities: {
        paginatedEntities: [],
        currentPage: 1,
        totalPages: null,
        totalEntities: null,
        perPage: 5,
        loading: false,
        search: "",
        sortBy: "Entite_Name",
        startEntity: null,
        endEntity: null,
    },
    entitiesList: {
        paginatedEntities: [],
        currentPage: 1,
        totalPages: null,
        totalEntities: null,
        perPage: 10,
        loading: false,
        search: "",
        sortBy: "Entite_Name",
        startEntity: null,
        endEntity: null,
    }
};