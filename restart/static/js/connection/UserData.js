// import axios from 'axios';
// const axios = require('axios');
axios.defaults.withCredentials = true;


const apiUrl = 'http://localhost:8000/users/';
const apiUrlalt = 'http://localhost:8000/user-decorations/';
const apiUrlalt1 = 'http://localhost:8000/user-crops/';


export default class UserData {     //works
    static fetchData(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                //console.log('Data fetched successfully:', data);
                return data;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                throw error;
            });
        }
    static fetchUserData(usernameId) {
        const url = `http://localhost:8000/users/?usernameId=${usernameId}`;

        return axios.get(url)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching user decorations:', error);
                throw error;
            });
    }
    static createUser(data) {      //works
        const url = `http://localhost:8000/users/`;
        axios.post(url, data)
            .then(response => {
                console.log('User created successfully:', response.data);
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }
    static deleteUser(usernameId) {    //works
        const url = `http://localhost:8000/users/`;     
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameId: usernameId })
        };
        return fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }
    static fetchUserDecorations(usernameId){   //works
        const url = `http://localhost:8000/user-decorations/?usernameId=${usernameId}`;

        return axios.get(url)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching user decorations:', error);
                throw error;
            });
    }
    static addUserDecoration(data) {   //works
        const url = 'http://localhost:8000/user-decorations/';
        axios.post(url, data)
            .then(response => {
                console.log('Decoration added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding decoration for user:', error);
            });
    }
    static deleteUserDecoration(usernameId, type) {    //works
        const url = `http://localhost:8000/user-decorations/`;      
        const requestData = {
            usernameId: usernameId,
            type: type
        };
        console.log(requestData)  
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };
        return fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User crop deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }
    static fetchUserFurniture(usernameId){   //works
        const url = `http://localhost:8000/user-furniture/?usernameId=${usernameId}`;

        return axios.get(url)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching user decorations:', error);
                throw error;
            });
    }
    static addUserFurniture(data) {   //works
        const url = 'http://localhost:8000/user-furniture/';
        axios.post(url, data)
            .then(response => {
                console.log('Decoration added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding decoration for user:', error);
            });
    }
    static deleteUserFurniture(usernameId, type) {    //works
        const url = `http://localhost:8000/user-furniture/`
        const requestData = {
            usernameId: usernameId,
            type: type
        };
        console.log(requestData)  
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };
        return fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User crop deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }
    static fetchUserCrops(usernameId){    //works
        const url = `http://localhost:8000/user-crops/?usernameId=${usernameId}`;

        return axios.get(url)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching user crops:', error);
                throw error;
            });
    }
    static addUserCrop(url, data) {     //works
        axios.post(url, data)
            .then(response => {
                console.log('Crop added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding decoration for user:', error);
            });
    }
    static deleteUserCrop(usernameId) {    //works
        const url = `http://localhost:8000/user-crops/`;     
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameId: usernameId })
        };
        return fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User crop deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }
    static fetchUserTasks(usernameId){    //works
        const url = `http://localhost:8000/tasks/?usernameId=${usernameId}`;

        return axios.get(url)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching user crops:', error);
                throw error;
            });
    }
    static addUserTask(data) {     //works
        const url = 'http://localhost:8000/tasks/';
        axios.post(url, data)
        .then(response => {
            console.log('Task added successfully:', response.data);
        })
        .catch(error => {
            if (error.response && error.response.data) {
                console.error('Validation error:', error.response.data);
            } else {
                console.error('Error adding task:', error);
            }
        });
    }
    static deleteUserTask(usernameId, plotId) {    //works
        const url = `http://localhost:8000/tasks/`;   
        const requestData = {
            usernameId: usernameId,
            plotId: plotId
        };
        console.log(requestData)  
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };
        return fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User crop deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }
    static fetchUserPlots(usernameId){    //works
        const url = `http://localhost:8000/user-plots/?usernameId=${usernameId}`;

        return axios.get(url)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching user crops:', error);
                throw error;
            });
    }
    static addUserPlot(data) {     //works
        const url = 'http://localhost:8000/user-plots/';
        axios.post(url, data)
        .then(response => {
            console.log('Task added successfully:', response.data);
        })
        .catch(error => {
            if (error.response && error.response.data) {
                console.error('Validation error:', error.response.data);
            } else {
                console.error('Error adding task:', error);
            }
        });
    }
    static deleteUserPlots(usernameId, plotId) {    //works
        const url = `http://localhost:8000/user-plots/`;   
        const requestData = {
            usernameId: usernameId,
            plotId: plotId
        };
        console.log(requestData)  
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        };
        return fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User crop deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }
    static fetchUserSettings(usernameId){    //works
        const url = `http://localhost:8000/user-settings/?usernameId=${usernameId}`;

        return axios.get(url)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching user crops:', error);
                throw error;
            });
    }
    static addUserSettings(data) {     //works
        const url = 'http://localhost:8000/user-settings/';
        axios.post(url, data)
            .then(response => {
                console.log('Crop added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding decoration for user:', error);
            });
    }
    static deleteUserSettings(usernameId) {    //works
        const url = `http://localhost:8000/user-settings/`;     
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usernameId: usernameId })
        };
        return fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User crop deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }
    static updateUserMoney(usernameId, coins) {      //works
        const url = `http://localhost:8000/users/change-money/`;
    
        const requestData = {
            usernameId: usernameId,
            coins: coins
        };
    
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('Money updated successfully');
        })
        .catch(error => {
            console.error('Error updating money:', error);
        });
    }
    static updateHouse(usernameId, farmHouseLevel) {      //works
        const url = `http://localhost:8000/users/change-house/`;
    
        const requestData = {
            usernameId: usernameId,
            farmHouseLevel:farmHouseLevel
        };
        console.log(requestData)
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log('House status updated successfully');
        })
        .catch(error => {
            console.error('Error updating money:', error);
        });
    }
    static getuserDates(usernameId) {
        const url = `http://localhost:8000/user-dates/?usernameId=${usernameId}`;

        return axios.get(url)
            .then(response => {
                console.log(response.data)
                return response.data;
            })
            .catch(error => {
                console.error('Error fetching user dates:', error);
                throw error;
            });
    }
    static addUserDate(data) {
        const url = 'http://localhost:8000/user-dates/'
        axios.post(url, data)
        .then(response => {
            console.log('Date added successfully:', response.data);
        })
        .catch(error => {
            console.error('Error adding decoration for user:', error);
        });
    }
}


let data = {
    "userData": 
        {"usernameId": currentUsername, "coins": 0, "farmhouseLevel": 1, "x": 70, "y": 570},
    "seedsOwned": {
        tomato: -1,
        sunflower: -1,
        carrot: -1,
        pumpkin: -1,
        tulip: -1
    },

    "plots": [
        {"plotId": 0, "crop": "sunflower", "growthStage": 9, "growthStep": 24, "x": 176, "y": 616, "placed": true}
    ],
    "tasks": [
       ],
    "furniture": [
    ],
    "decorations": [
    ]
}
// const today = new Date();
// const year = today.getFullYear();
// const month = today.getMonth() + 1;
// const day = today.getDate();
// const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
// console.log(formattedDate)
// const newUserDate = {
//     usernameId: 'johndoe',
//     date: formattedDate
// };
// const newUser = {
//     usernameId: 'johndoe',
//     email: 'johndoe@example.com',
// };
// const newUserDec = {
//     usernameId: 'johndoe',
//     decoration: 'gnome',
//     x: 0,
//     y: 0,
//     placed: false
// };
// const newUserPlot = {
//     usernameId: 'johndoe',
//     plotId: 0,
//     crop: 0,
//     growthStage: 0,
//     growthStep: 0,
//     x: 0,
//     y: 0,
//     placed: false
// };
// const newUserCrop = {
//     usernameId: 'johndoe',
//     tomato: 0,
//     sunflower: 0,
//     carrot: 0,
//     pumpkin: 0,
//     tulip: 0
// };
// const newUserfurn = {
//     usernameId: 'johndoe',
//     furniture: 'table',
//     x: 0,
//     y: 0,
//     placed: false
// };
// const newUserSettings = {
//     usernameId: 'johndoe',
//     pomtimer: 25,
//     shortBreak: 5,
//     longBreak: 25,
//     longBreakInterval: 5,
//     autoStartPom: false,
//     autoStartBreak: false,
//     autoHideTime: false,
//     fontStyle: 'comic sans',
//     fontSize: 10
// };
// const newUserTask = {
//     taskName: 'maths',
//     usernameId: 'johndoe',
//     completed: false,
//     plotId: 5,
//     pomodoros: 5,
//     pomodorosCompleted: 2,
//     elapsedTime: 1.5,
//     subTask1: 'hmwk',
//     subTaskCompleted1: false,
//     subTask1: null,
//     subTaskCompleted1: null,
//     subTask1: null,
//     subTaskCompleted1: null,
//     subTask1: null,
//     subTaskCompleted1: null,
//     subTask1: null,
//     subTaskCompleted1: null,
//     subTask1: null,
//     subTaskCompleted1: null,
//     subTask1: null,
//     subTaskCompleted1: null,
//     subTask1: null,
//     subTaskCompleted1: null,
//     subTask1: null,
//     subTaskCompleted1: null,
//     subTask1: null,
//     subTaskCompleted1: null,
// };
//const userData = new UserData();
//userData.addUserPlot(newUserPlot)
//userData.fetchUserPlots('johnDoe')
//userData.deleteUserPlots('johndoe', 0)
//userData.addUserTask(newUserTask)
//userData.fetchUserTasks('johndoe')
//userData.deleteUserTask('johndoe', '5')
//userData.fetchUserData('johndoe')
//userData.addUserDecoration(newUserDec)
//userData.fetchUserDecorations('johndoe')
//userData.deleteUserDecoration('johndoe', 'gnome')
//userData.deleteUserFurniture('johndoe', 'table')
//userData.addUserFurniture(newUserfurn)
//userData.fetchUserFurniture(newUserfurn)
//userData.addUserSettings(newUserSettings)
//userData.fetchUserSettings('johndoe')
//userData.fetchData()
//userData.updateHouse('johndoe', 2)
//userData.addUserDate(newUserDate)
//userData.changeUserMoney('johndoe', 50)
//userData.updatePlots('johndoe', 4)
//userData.addUserCrop(newUserCrop)
//userData.fetchUserCrops(newUserCrop.usernameId)
//userData.deleteUserCrop('johndoe')
//userData.createUser(newUser)
// userData.deleteUser('johndoe')
//     .then(() => {
//         console.log('User deleted successfully');
//         // Fetch data after successful deletion
//         userData.fetchData(apiUrl)
//             .then(data => {
//                 console.log('Data fetched successfully:', data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     })
//     .catch(error => {
//         console.error('Error deleting user:', error);
//     });