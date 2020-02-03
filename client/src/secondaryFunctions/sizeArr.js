const sizeArr = (tasks, length) => {
    if(tasks && tasks.length > length) {
        tasks.splice(0, tasks.length - length)
        return tasks
    }
    else return tasks
}

export default sizeArr;