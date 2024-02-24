import Utility from "./Utility.js";
import Phaser from 'phaser'
//import { Phaser } from "./libs/phaser.js";

export default class MarketScene extends Phaser.Scene { 
    constructor() {
        super({ key: 'MarketScene' });
    }


    preload () {
        this.load.image('insideFarmhouseBackground', '../assets/farmhouse-background.png');
        this.load.image('door', '../assets/door.png');
    }


    create () {
        //Set camera zoom to 2x as canvas size of farmhouse interior is 320px wide, rather than 640px
        this.cameras.main.setZoom(2);
        //When F key is pressed call toggleFullscreen function
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F).on('down', Utility.toggleFullscreen);

        this.add.image(320, 600, 'insideFarmhouseBackground');

        this.door = this.add.sprite(430, 560, 'door');
        this.door.setInteractive();
        Utility.addTintOnHover(this.door);

        //Swtich to farm scene when door is clicked
        this.door.on('pointerdown', () => {
            this.scene.stop();
        });




    }
}