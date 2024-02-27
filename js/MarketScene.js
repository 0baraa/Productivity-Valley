import Utility from "./Utility.js";

export default class MarketScene extends Phaser.Scene { 
    constructor() {
        super({ key: 'MarketScene' });
    }


    preload () {
        this.load.image('marketBackground', '../assets/market-background.png');
        this.load.image('farmSign', '../assets/farm-sign.png');
    }


    create () {
        //Set camera zoom to 2x as canvas size of farmhouse interior is 320px wide, rather than 640px
        this.cameras.main.setZoom(2);

        this.add.image(320, 600, 'marketBackground');

        this.farmSign = this.add.sprite(200, 630, 'farmSign');
        this.farmSign.setInteractive();
        Utility.addTintOnHover(this.farmSign);







        //Swtich to farm scene when door is clicked
        this.farmSign.on('pointerdown', () => {
            this.scene.stop();
            //Re-enable input for farm scene
            this.scene.get('FarmScene').input.enabled = true;
        });




    }
}