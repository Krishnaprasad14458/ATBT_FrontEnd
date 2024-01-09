const authReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, users: action.payload };
        case "SET_TOKEN":
            return { ...state, token: action.payload };
        default:
            return state;
    }
};

export default authReducer;