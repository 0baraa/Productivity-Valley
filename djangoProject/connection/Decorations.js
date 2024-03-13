const axios = require('axios');

const apiUrl = 'http://localhost:8000/decorations';

class DecorationsData {     //works
    fetchData(url) {
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
    createDecoration(url, data) {      //works
        axios.post(url, data)
            .then(response => {
                console.log('User created successfully:', response.data);
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    }
    deleteDec(url, name) {     //works
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name })
        };
        return fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                console.log('Decoration deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }
}
const newDec = {
    name: 'Table',
    price: 30,
};
const decData = new DecorationsData();
decData.createDecoration(apiUrl, newDec)
// decData.deleteDec(apiUrl, 'Table')
//     .then(() => {
//         console.log('Decoration deleted successfully');
//         // Fetch data after successful deletion
//         decData.fetchData(apiUrl)
//             .then(data => {
//                 console.log('Data fetched successfully:', data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     })
//     .catch(error => {
//         console.error('Error deleting Decoration:', error);
//     });