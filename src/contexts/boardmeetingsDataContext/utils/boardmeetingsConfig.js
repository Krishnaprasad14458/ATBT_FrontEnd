export const initialState = {
    boardmeetings: {},
    dashboardBoardMeetings: {
        paginatedBoardMeetings: [],
        currentPage: 1,
        totalPages: null,
        totalBoardMeetings: null,
        perPage: 5,
        loading: false,
        search: "",
        sortBy: "createdAt",
        startBoardMeeting: null,
        endBoardMeeting: null,
        filters: {
        }
    },
    boardmeetingsList: {
        paginatedBoardMeetings: [],
        currentPage: 1,
        totalPages: null,
        totalBoardMeetings: null,
        perPage: 10,
        loading: false,
        search: "",
        sortBy: "createdAt",
        startBoardMeeting: null,
        endBoardMeeting: null,
        filters: {
        }
    }
};