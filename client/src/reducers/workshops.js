const initialState = {
    workshop: null,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_WORKSHOPS":
            return {
                ...state,
                workshop: action.payload
            };

        default:
            return state;
    }
}