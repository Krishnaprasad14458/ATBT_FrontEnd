const authReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return { ...state, user: action.payload };
        case "SET_TOKEN":
            return { ...state, token: action.payload };
        case "SET_ROLE":
            return { ...state, role: action.payload };
        default:
            return state;
    }
};

export default authReducer;