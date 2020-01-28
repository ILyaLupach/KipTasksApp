const initialState = {
    loading: false,
    tasks: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_TASKS":
            return {
                ...state,
                tasks: action.payload
            };

        default:
            return state;
    }
}