const initialState = {
    workshops: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_WORKSHOPS":
            return {
                ...state,
                workshops: action.payload
            };

        default:
            return state;
    }
}