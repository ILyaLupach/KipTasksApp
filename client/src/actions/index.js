export const getAllTasks = (tasks) => ({
    type: "GET_ALL_TASKS",
    payload: tasks
})
export const loadingTasks = (bool) => ({
    type: "LOADING_TASKS",
    payload: bool
})

export const getAllWorkshops = (workshops) => ({
    type: "GET_ALL_WORKSHOPS",
    payload: workshops
})

export const getAllPersons = (persons) => ({
    type: "GET_ALL_PERSONS",
    payload: persons
})

export const setFilter = (activeItem) => ({
    type: "SET_FILTER",
    payload: activeItem
})
export const setSearchQuery = (value) => ({
    type: "SET_QUERY",
    payload: value
})
