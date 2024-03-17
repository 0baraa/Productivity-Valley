export default class ChartScene extends Phaser.Scene{
    constructor() {
        super({ key: 'ChartScene' });
    }

    preload() {
        // 从 CDN 加载 Chart.js
        this.load.script('chartjs', 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.8.0/chart.min.js');
        // 从 CDN 加载 rexUI 插件
        this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
    }

    create() {
        this.rexUI.add.chart({
            x: 400,
            y: 300,
            width: 800,
            height: 400,

            chart: {
                type: 'bar',
                data: {
                    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                    datasets: [{
                        label: 'Dataset 1',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }
            // 添加关闭图表的逻辑，例如监听 'ESC' 键盘事件
        this.input.keyboard.on('keydown-ESC', () => {
        this.scene.stop();
        });
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1024,
    height: 768,
    scene: ChartScene
};

new Phaser.Game(config);
