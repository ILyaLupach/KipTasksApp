const sortBy = (tasks, filterBy, searchQuery) => {
    if(tasks) {tasks = tasks && tasks.filter(
        (item) => 
        item.name.join('').indexOf(searchQuery) >=0 ||
        item.object.toLowerCase().indexOf(searchQuery.toLowerCase()) >=0 ||
        item.failure.toLowerCase().indexOf(searchQuery.toLowerCase()) >=0 ||
        item.fix.toLowerCase().indexOf(searchQuery.toLowerCase()) >=0 
      ) 
      if(filterBy === "Все")   return tasks;
      else return tasks.filter(item => item.position === filterBy)}
    }

export default sortBy;