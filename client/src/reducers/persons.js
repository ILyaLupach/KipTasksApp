const initialState = {
    persons: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_PERSONS":
            return {
                ...state,
                persons: action.payload
            };

        default:
            return state;
    }
}