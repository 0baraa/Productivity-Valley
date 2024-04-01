import Utility from "./Utility.js";

export default class ChartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ChartScene' });
    }

    create() {
        Utility.toggleMenu(this, 'window');

        const chartCanvas = document.getElementById('Chart');

        // 使用 Chart.js 创建折线图
        this.myChart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                datasets: [{
                    label: "Working Hours",
                    backgroundColor: 'rgba(255,193,99,0.66)',
                    borderColor: 'rgba(255,193,99,0.66)',
                    data: [8, 10, 5, 2, 7],
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
    }

    closeChart() {
        if (this.myChart) {
            this.myChart.destroy();
            this.myChart = null;
        }
        const exitButton = document.getElementById('chart-exit-button');
        exitButton.removeEventListener('click', this.exitButtonListener); // 移除监听器
        Utility.toggleMenu(this, 'window');
    }
}
