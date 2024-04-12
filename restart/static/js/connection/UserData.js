// import axios from 'axios';
const axios = require('axios');


class UserData {     
    fetchData() {         //works
        const url = `http://localhost:8000/users/`;
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
    fetchUserData(usernameId) {
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
    createUser(data) {      //works
        const url = `http://localhost:8000/users/`;
        axios.post(url, data)
            .then(response => {
                console.log('User created successfully:', response.data);
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }
    deleteUser(usernameId) {    //works
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
    fetchUserDecorations(usernameId){   //works
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
    addUserDecoration(data) {   //works
        const url = 'http://localhost:8000/user-decorations/';
        axios.post(url, data)
            .then(response => {
                console.log('Decoration added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding decoration for user:', error);
            });
    }
    fetchUserFurniture(usernameId){   //works
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
    addUserFurniture(data) {   //works
        const url = 'http://localhost:8000/user-furniture/';
        axios.post(url, data)
            .then(response => {
                console.log('Decoration added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding decoration for user:', error);
            });
    }
    fetchUserCrops(usernameId){    //works
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
    addUserCrop(data) {     //works
        const url = 'http://localhost:8000/user-crops/';
        axios.post(url, data)
            .then(response => {
                console.log('Crop added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding decoration for user:', error);
            });
    }
    deleteUserCrop(usernameId) {    //works
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
    fetchUserSettings(usernameId){    //works
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
    addUserSettings(data) {     //works
        const url = 'http://localhost:8000/user-settings/';
        axios.post(url, data)
            .then(response => {
                console.log('Crop added successfully:', response.data);
            })
            .catch(error => {
                console.error('Error adding decoration for user:', error);
            });
    }
    deleteUserSettings(usernameId) {    //works
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
    updateUserMoney(usernameId, coins) {      //works
        const url = `http://localhost:8000/users/change-money/`;
    
        const requestData = {
            usernameId: usernameId,
            coins: coins
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
            console.log('Money updated successfully');
        })
        .catch(error => {
            console.error('Error updating money:', error);
        });
    }
    updateHouse(usernameId, houseStatus) {      //works
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
    updatePlots(usernameId, plots) {      //works
        const url = `http://localhost:8000/users/change-plots/`;
    
        const requestData = {
            usernameId: usernameId,
            plots: plots
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
            console.log('Plots updated successfully');
        })
        .catch(error => {
            console.error('Error updating money:', error);
        });
    }
    getuserDates(usernameId) {
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
    addUserDate(data) {
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
const newUser = {
    usernameId: 'johndoe',
    email: 'johndoe@example.com',
};
const newUserDec = {
    usernameId: 'johndoe',
    decoration: 'gnome',
    x: 0,
    y: 0,
    placed: false
};
const newUserCrop = {
    usernameId: 'johndoe',
    tomato: 0,
    sunflower: 0,
    carrot: 0,
    pumpkin: 0,
    tulip: 0
};
const newUserfurn = {
    usernameId: 'johndoe',
    furniture: 'table',
    x: 0,
    y: 0,
    placed: false
};
const newUserSettings = {
    usernameId: 'johndoe',
    pomtimer: 25,
    shortBreak: 5,
    longBreak: 25,
    longBreakInterval: 5,
    autoStartPom: false,
    autoStartBreak: false,
    autoHideTime: false,
    fontStyle: 'comic sans',
    fontSize: 10
};
const userData = new UserData();
userData.fetchUserData('johndoe')
//userData.addUserDecoration(newUserDec)
userData.fetchUserDecorations('johndoe')
//userData.addUserFurniture(newUserfurn)
userData.fetchUserFurniture(newUserfurn)
//userData.addUserSettings(newUserSettings)
userData.fetchUserSettings('johndoe')
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
//         userData.fetchData()
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