import Utils from "./Utils.js";

export default class InsideFarmhouseScene extends Phaser.Scene { 
    constructor() {
        super({ key: 'InsideFarmhouseScene' });
    }


    preload () {
        this.load.image('insideFarmhouseBackground', '../assets/farmhouse-background.png');
        this.load.image('door', '../assets/door.png');
    }


    create () {
        //Set camera zoom to 2x as canvas size of farmhouse interior is 320px wide, rather than 640px
        this.cameras.main.setZoom(2);
        //When F key is pressed call toggleFullscreen function
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F).on('down', Utils.toggleFullscreen);

        this.add.image(320, 600, 'insideFarmhouseBackground');

        this.door = this.add.sprite(430, 560, 'door');
        this.door.setInteractive();

        //Swtich to farm scene when door is clicked
        this.door.on('pointerdown', () => {
            this.scene.start('FarmScene');
        });




    }
}