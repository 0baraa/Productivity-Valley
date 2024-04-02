const axios = require('axios');

const apiUrl = 'http://localhost:8000/crops';

class CropData {     //works
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
    createCrop(url, data) {      //works
        axios.post(url, data)
            .then(response => {
                console.log('User created successfully:', response.data);
            })
            .catch(error => {
                console.error('Error creating crop:', error);
            });
    }
    deleteCrop(url, name) {     //works
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
                console.log('Crop deleted successfully');
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }
}
const newCrop = {
    name: 'Corn',
    price: 30,
    worth: 50,
};
const cropData = new CropData();
cropData.createCrop(apiUrl, newCrop)
// cropData.deleteCrop(apiUrl, 'Corn')
//     .then(() => {
//         console.log('Crop deleted successfully');
//         // Fetch data after successful deletion
//         cropData.fetchData(apiUrl)
//             .then(data => {
//                 console.log('Data fetched successfully:', data);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     })
//     .catch(error => {
//         console.error('Error deleting crops:', error);
//     });