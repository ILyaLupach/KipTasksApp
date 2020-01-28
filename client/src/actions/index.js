export const getAllTasks = (tasks) => ({
    type: "GET_ALL_TASKS",
    payload: tasks
})

export const getAllWorkshops = (workshops) => ({
    type: "GET_ALL_WORKSHOPS",
    payload: workshops
})

export const getAllPersons = (persons) => ({
    type: "GET_ALL_PERSONS",
    payload: persons
})