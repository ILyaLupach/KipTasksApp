export default class ServerKip {

    getResource = async (url) => {
        const res = await fetch(url)
        .then(response => {
            if(!response.ok) {
                throw new Error(response.statusText);
            }
            return response;
        }).then(response => response.json())
        .catch(err => console.log( "----------" ," ",err))
        return await res;
    };


    getAllTasks = async () => {
        const tasks = await this.getResource("/tasks")
            .then((res) => {
                return  res
            })
        return await tasks;
    };

    getAllWorkshops = async () => {
        const workshops = this.getResource("/workshops")
            .then((res) => {
                return  res
            })
        return await workshops;
    };

    getAllPersons = async () => {
        const persons = await this.getResource("/persons")
            .then((res) => {
                return  res
            }).catch(err => console.log( "----------" ," ",err))
        return await persons;
    };


    taskPushTasks = async (data) => {
        const push = await fetch("/tasks", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
            })
        return await push
    }

    
    addNewPerson = async (data) => {
        const person = await fetch("/persons", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
            })

        return await person
    }

    
    deleteItem = (id, url) => {
        fetch(`/${url}/${id}`, {
            method: "DELETE"
        })
    }


    updateData = ( url, id, data) => {
        fetch(`/${url}/${id}`, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

}
