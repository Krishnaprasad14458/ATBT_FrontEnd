const userDataReducer = (state, action) => {
    switch (action.type) {
        case "SET_USERS_DATA":
            return { ...state, users: [...action.payload] };
        default:
            return state;
    }
};

export default userDataReducer;