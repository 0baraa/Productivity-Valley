import Utility from "./Utility.js";
import UserData from './connection/UserData.js';
export default class ChartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ChartScene' });
        this.userData = new UserData();
    }

    create() {
        Utility.toggleMenu(this, 'window');

        const chartCanvas = document.getElementById('Chart');

        // using Chart.js to generate a line chart
        this.myChart = new Chart(chartCanvas.getContext('2d'), {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: "Weekly Time Spent",
                    backgroundColor: 'rgba(255,193,99,0.66)',
                    borderColor: 'rgba(255,193,99,1)',
                    data: [],
                    fill: false
                }]

            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const exitButton = document.getElementById('chart-exit-button');
        this.exitButtonListener = () => {
            this.closeChart();
        };
        exitButton.addEventListener('click', this.exitButtonListener);

        this.updateChart();
    }

    updateChart() {
        this.userData.getuserDates(currentUsername)
            .then(data => {
                const labels = data.map(entry => entry.date);
                const dataPoints = data.map(entry => entry.timeSpent);


                this.myChart.data.labels = labels;
                this.myChart.data.datasets[0].data = dataPoints;
                this.myChart.update();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    closeChart() {
        if (this.myChart) {
            this.myChart.destroy();
        }
        const exitButton = document.getElementById('chart-exit-button');
        exitButton.removeEventListener('click', this.exitButtonListener); // 移除监听器
        Utility.toggleMenu(this, 'window');
    }
}
