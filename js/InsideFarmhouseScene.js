import Utility from "./Utility.js";

export default class InsideFarmhouseScene extends Phaser.Scene { 
    constructor() {
        super({ key: 'InsideFarmhouseScene'});
    }


    preload () {
        this.load.image('insideFarmhouseBackground', '../assets/farmhouse-background.png');
        this.load.image('door1', '../assets/house/doors/door1.png');
        this.load.image('wall1', '../assets/house/walls/wall1.png');
        this.load.image('floor1', '../assets/house/floors/floor1.png');
        this.load.image('window', '../assets/house/window.png');

        this.load.image('bookshelf', '../assets/house/furniture/bookshelf.png');
        this.load.image('carpet1', '../assets/house/furniture/carpet1.png');
        this.load.image('chair', '../assets/house/furniture/chair.png');
        this.load.image('couch', '../assets/house/furniture/couch.png');
        this.load.image('fridge', '../assets/house/furniture/fridge.png');
        this.load.image('grandfatherClock', '../assets/house/furniture/grandfather-clock.png');
        this.load.image('kitchenSink', '../assets/house/furniture/kitchen-sink.png');
        this.load.image('lamp', '../assets/house/furniture/lamp.png');
        this.load.image('lampOn', '../assets/house/furniture/lamp-on.png');
        this.load.image('table', '../assets/house/furniture/table.png');

        this.load.image('fireplace', '../assets/house/furniture/fireplace.png');
        this.load.spritesheet('fireplaceSpritesheet', '../assets/house/furniture/fireplace-animation.png', { frameWidth: 24, frameHeight: 78 });

    }


    create () {
        //Set camera zoom to 2x as canvas size of farmhouse interior is 320px wide, rather than 640px
        this.cameras.main.setZoom(2);
        //When F key is pressed call toggleFullscreen function
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F).on('down', Utility.toggleFullscreen);

        this.add.image(320, 600, 'insideFarmhouseBackground');

        this.add.image(320, 560, 'wall1');

        this.add.image(320, 634, 'floor1');

        this.add.image(240, 548, 'window');

        this.add.image(400, 548, 'window');

        this.door = this.add.sprite(320, 571, 'door1');
        this.door.setInteractive();
        Utility.addTintOnHover(this.door);

        this.add.image(320, 612, 'carpet1');

        this.add.image(281, 580, 'bookshelf');

        // this.add.image(320, 570, 'couch');


        this.add.image(193, 580, 'fridge');
        this.add.image(246, 580, 'grandfatherClock');
        this.add.image(408, 600, 'kitchenSink');

        this.add.image(210, 640, 'chair');
        this.add.image(210, 656, 'chair');
        this.add.image(192, 650, 'table');

        this.lamp = this.add.sprite(345, 580, 'lamp');
        this.lamp.setInteractive();
        Utility.addTintOnHover(this.lamp);

        this.lampTurnedOn = false;


        // Create fireplace animation
        this.anims.create({
            key: 'fireplaceAnimation',
            frames: this.anims.generateFrameNumbers('fireplaceSpritesheet', { start: 0, end: 4 }),
            frameRate: 6,
            repeat: -1 // Repeat indefinitely
        });

        //Add fireplace image, play animation and make it interactive
        this.fireplace = this.add.sprite(221, 565, 'fireplaceSpritesheet');
        this.fireplace.anims.play('fireplaceAnimation');
        this.fireplace.setInteractive();
        Utility.addTintOnHover(this.fireplace);
        this.fireplaceTurnedOn = true;


        //Turn lamp on and off when clicked
        this.lamp.on('pointerdown', () => {
            if(!this.lampTurnedOn) {
                this.lamp.setTexture('lampOn');
                this.lampTurnedOn = true;
            }
            else {
                this.lamp.setTexture('lamp');
                this.lampTurnedOn = false;
            }
        });

        //Turn fireplace on and off when clicked
        this.fireplace.on('pointerdown', () => {
            if(!this.fireplaceTurnedOn) {
                this.fireplace.anims.resume();
                this.fireplaceTurnedOn = true
            }
            else {
                this.fireplace.anims.pause();
                this.fireplace.setTexture('fireplace');
                this.fireplaceTurnedOn = false;
            }
        });





        //Swtich to farm scene when door is clicked
        this.door.on('pointerdown', () => {
            this.scene.stop();
            //Re-enable input for farm scene
            this.scene.get('FarmScene').input.enabled = true;
        });




    }
}