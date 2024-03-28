import Utility from "./Utility.js";

export default class ChartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ChartScene' });
    }

    create() {
        // 显示图表界面
        Utility.toggleMenu(this, 'window');

        // 获取画布元素
        const chartCanvas = document.getElementById('Chart');

        // 使用 Chart.js 创建折线图
        this.myChart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                datasets: [{
                    label: "Working Hours",
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgb(255, 99, 132)',
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

        // 获取退出按钮并添加事件监听器
        const exitButton = document.getElementById('chart-exit-button');
        this.exitButtonListener = () => {
            this.closeChart(); // 调用关闭图表的函数
        };
        exitButton.addEventListener('click', this.exitButtonListener);
    }

    closeChart() {
        if (this.myChart) {
            this.myChart.destroy(); // 销毁图表实例
            this.myChart = null;
        }
        const exitButton = document.getElementById('chart-exit-button');
        exitButton.removeEventListener('click', this.exitButtonListener); // 移除监听器
        Utility.toggleMenu(this, 'window'); // 关闭图表界面
    }
}
