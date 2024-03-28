const axios = require('axios');

const apiUrl = 'http://localhost:8000/tasks/';

class TasksData {     //works
    fetchUserTasks(username) {
        const url = `http://localhost:8000/tasks/?username=${username}`;
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data fetched successfully:', data);
                return data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
        }
    createTask(url, data) {      //works
        axios.post(url, data)
            .then(response => {
                console.log('User Task created successfully:', response.data);
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }
    deleteUserTask(url, username, taskName) {     //works
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ taskName: taskName, username: username})
        };
        return fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Task deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }
}
const newUserTask = {
    taskName: 'Code',
    projectName: 'Team Project',
    username: 'johndoe',
    plotNumber: 4,
    pomodorros: 5
};

const tasks = new TasksData();
//tasks.createTask(apiUrl, newUserTask)
// tasks.fetchUserTasks(newUserTask.username)
//     .then(data => {
//         console.log("Tasks:", data); // Add logging here to check the fetched data
//     })
//     .catch(error => {
//         console.error("Error fetching tasks:", error); // Handle any errors
//     });
tasks.deleteUserTask(apiUrl, newUserTask.username, newUserTask.taskName)
    .then(() => {
        console.log('User deleted successfully');
        // Fetch data after successful deletion
        tasks.fetchUserTasks(apiUrl)
            .then(data => {
                console.log('Data fetched successfully:', data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    })
    .catch(error => {
        console.error('Error deleting user:', error);
    });
