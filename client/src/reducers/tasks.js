const initialState = {
    loading: true,
    tasks: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_TASKS":
            return {
                ...state,
                tasks: action.payload
            };

        case "LOADING_TASKS":
            return {
                ...state,
                loading: action.payload,
            };

        default:
            return state;
    }
}