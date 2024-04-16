// import axios from 'axios';
// const axios = require('axios');
axios.defaults.withCredentials = true;


const apiUrl = 'http://localhost:8000/users/';
const apiUrlalt = 'http://localhost:8000/user-decorations/';
const apiUrlalt1 = 'http://localhost:8000/user-crops/';

const urlStarter = "http://localhost:8000";
const userFarmTable = "/user-farm/";
const userDecTable = "/user-decorations/";
const userFurnTable = "/user-furniture/";
const userSeedTable = "/user-seeds/";
const userTaskTable = "/tasks/";
const userPlotTable = "/user-plots/";
const userSettTable = "/user-settings/";
const userDatesTable = "/user-dates/";
const csrftoken = document.getElementsByName("_token")[0].value

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
    static async fetchUserFarm(userId) {
        data = await axios.get(userFarmTable, {
            params: {
                usernameId: userId
            }
        }).then(response => {
            console.log("successful access od data UsersFarm")
            return response.data;
        }).catch(error => {
            console.error('Error fetching user data');
            return null;
            throw error;
        });
        console.log(data);
        return data;

        // return axios.get(url)
        //     .then(response => {
        //         console.log(response.data)
        //         return response.data;
        //     })
        //     .catch(error => {
        //         console.error('Error fetching user decorations:', error);
        //         return null;
        //         throw error;
        //     });
    }
    static async createUser(data) {      //works
        console.log("user data:", data);
        
        return axios.post(userFarmTable, data, {
            headers: {'X-CSRFToken': csrftoken},
        })
            .then(response => {
                console.log('User created successfully:', response.data);
                return true
            })
            .catch(error => {
                console.error('Error creating user:', error);
                return false;
            });
    }
    static deleteUser(usernameId) {    //works
        axios.delete(userFarmTable, {
            headers: {'X-CSRFToken': csrftoken},
            data: {usernameId: usernameId}
            //usernameId: usernameId
            //headers: {'X-CSRFToken': csrftoken}
        })
            .then(response => {
                if (!response.status != 200) {
                    throw new Error('Network response was not ok');
                }
                console.log('User deleted successfully');
        })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }



    static async fetchUserDecorations(usernameId){   //works

        data = await axios.get(userDecTable, {
            params: {
                usernameId: usernameId
            }
        }).then(response => {
            console.log("successful access od data decorations")
            return response.data;
        }).catch(error => {
            console.error('Error fetching user decorations');
            return null;
            throw error;
        })
        return data;
    }
    static addUserDecoration(data) {   //works
        axios.post(userDecTable, data, {
            headers: {'X-CSRFToken': csrftoken},
        })
            .then(response => {
                console.log('Decoration added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding decoration for user:', error);
            });
    }
    static deleteUserDecoration(usernameId, type) {    //works
        axios.delete(userDecTable, {
            headers: {'X-CSRFToken': csrftoken},
            data: {usernameId: usernameId,
                   type: type}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User decoration deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user decoration:', error);
            });
    }



    static async fetchUserFurniture(usernameId){   //works

        data = await axios.get(userFurnTable, {
            params: {
                usernameId: usernameId
            }
        }).then(response => {
            console.log("successful access od data furniture")
            return response.data;
        }).catch(error => {
            console.error('Error fetching user furniture');
            return null;
            throw error;
        })
        return data;
    }
    static addUserFurniture(data) {   //works
        axios.post(userFurnTable, data, {
            headers: {'X-CSRFToken': csrftoken},
        })
            .then(response => {
                console.log('Decoration added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding decoration for user:', error);
            });
    }
    static deleteUserFurniture(usernameId, type) {    //works
        axios.delete(userFurnTable, {
            headers: {'X-CSRFToken': csrftoken},
            data: {usernameId: usernameId,
                   type: type}
        })
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



    static async fetchUserSeeds(usernameId){    //works
        data = await axios.get(userSeedTable, {
            params: {
                usernameId: usernameId
            }
        }).then(response => {
            console.log("successful access od data user seeds : ", usernameId)
            return response.data;
        }).catch(error => {
            console.error('Error fetching user seeds');
            return null;
            throw error;
        })
        return data;
    }
    static addUserSeeds(data) {     //works
        console.log(data)
        axios.post(userSeedTable, data, {
            headers: {'X-CSRFToken': csrftoken},
        })
            .then(response => {
                console.log('Crop added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding crop for user:', error);
            });
    }
    static deleteUserSeeds(usernameId) {    //works
        axios.delete(userSeedTable, {
            headers: {'X-CSRFToken': csrftoken},
            data: {usernameId: usernameId,}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User crop deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user crop:', error);
            });
    }



    static async fetchUserTasks(usernameId){    //works

        return axios.get(userTaskTable, {
            params: {
                usernameId: usernameId
            }
        }).then(response => {
            console.log("successful access od data tasks")
            return response.data;
        }).catch(error => {
            console.error('Error fetching user tasks');
            return null;
            throw error;
        })
    }
    static addUserTask(data) {     //works
        axios.post(userTaskTable, data, {
            headers: {'X-CSRFToken': csrftoken},
        })
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
        axios.delete(userTaskTable, {
            headers: {'X-CSRFToken': csrftoken},
            data: {usernameId: usernameId,
                   plotId: plotId}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User crop deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user task:', error);
            });
    }



    static async fetchUserPlots(usernameId){    //works

        return await axios.get(userPlotTable, {
            params: {
                usernameId: usernameId
            }
        }).then(response => {
            console.log("successful access od data plots")
            return response.data;
        }).catch(error => {
            console.error('Error fetching user plots');
            return null;
            throw error;
        })
    }
    static addUserPlot(data) {     //works
        axios.post(userPlotTable, data, {
            headers: {'X-CSRFToken': csrftoken},
        })
        .then(response => {
            console.log('Plot added successfully:', response.data);
        })
        .catch(error => {
            if (error.response && error.response.data) {
                console.error('Validation error:', error.response.data);
            } else {
                console.error('Error adding plot :', error);
            }
        });
    }
    static deleteUserPlot(usernameId, plotId) {    //works
        axios.delete(userPlotTable, {
            headers: {'X-CSRFToken': csrftoken},
            data: {usernameId: usernameId,
                   plotId: plotId}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User plot  deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }



    static async fetchUserSettings(usernameId){    //works

        return await axios.get(userSettTable, {
            params: {
                usernameId_id: usernameId
            }
        }).then(response => {
            console.log("successful access od data Users settings")
            return response.data;
        }).catch(error => {
            console.error('Error fetching user settings');
            return null;
            throw error;
        })
    }
    static addUserSettings(data) {     //works

        axios.post(userSettTable, data, {
            headers: {'X-CSRFToken': csrftoken},
        })
            .then(response => {
                console.log('Crop added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding settings for user:', error);
            });
    }
    static deleteUserSettings(usernameId) {    //works
        axios.delete(userSettTable, {usernameId: usernameId}, {
            headers: {'X-CSRFToken': csrftoken}
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('User crop deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user settings:', error);
            });
    }



    static updateUserMoney(usernameId, coins) {      //works
        const url = `${userFarmTable}change-money/`;
    
        const requestData = {
            usernameId: usernameId,
            coins: coins
        };

        axios.post(userFarmTable, requestData, {
            headers: {'X-CSRFToken': csrftoken}
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

    static updateHouse(usernameId, farmHouseLevel, xIn, yIn) {      //works
        const url = `${userFarmTable}change-house/`;
    
        const requestData = {
            usernameId: usernameId,
            farmHouseLevel:farmHouseLevel,
            x: xIn,
            y: yIn
        };
        console.log(requestData)
        axios.post(userFarmTable, requestData, {
            headers: {'X-CSRFToken': csrftoken}
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



    static async getuserDates(usernameId) {

        return await axios.get(userDatesTable, {
            params: {
                usernameId: usernameId
            }
        }).then(response => {
            console.log("successful access od data Users")
            return response.data;
        }).catch(error => {
            console.error('Error fetching user data');
            return null;
            throw error;
        })
    }
    static addUserDate(data) {
        const url = `/user-dates/`
        axios.post(userDatesTable, data)
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
        {"usernameId": currentUsername, "coins": 0, "farmHouseLevel": 1, "x": 70, "y": 570},
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