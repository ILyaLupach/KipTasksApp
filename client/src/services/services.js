export default class ServerKip {

    getResource = async (url) => {
        const res = await fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response;
        }).then(response => response.json())
        return await res;
    };


    getAllTasks = async () => {
        const tasks = this.getResource("/tasks")
            .then((res) => {
                return  res
            })
        return await tasks;
    };
}
