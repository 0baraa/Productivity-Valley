export default class InsideFarmhouseScene extends Phaser.Scene { 
    constructor() {
        super({ key: 'InsideFarmhouseScene' });
    }


    preload () {
        this.load.image('insideFarmhouseBackground', '../assets/farmhouse-background.png');
        this.load.image('door', '../assets/door.png');
    }


    create () {
        this.cameras.main.setZoom(2);

        this.add.image(320, 600, 'insideFarmhouseBackground');

        this.door = this.add.sprite(430, 560, 'door');
        this.door.setInteractive();

        //Swtich to farm scene when door is clicked
        this.door.on('pointerdown', () => {
            this.scene.start('FarmScene');
        });

        


    }
}