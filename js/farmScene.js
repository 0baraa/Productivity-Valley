import Utils from "./Utils.js";

export default class FarmScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FarmScene' });
    }


    preload () {
        // this.load.bitmapFont('pixelFont', '../fonts/dogicabitmap.png', '../fonts/dogicabitmap.xml');

        this.load.image('farmBackground', '../assets/farm-background.png');
        this.load.spritesheet('farmhouseSpritesheet', '../assets/farmhouse-animation.png', { frameWidth: 80, frameHeight: 128 });
        this.load.image('cloud1', '../assets/cloud1.png');
        this.load.image('cloud2', '../assets/cloud2.png');
        this.load.image('cloud3', '../assets/cloud3.png');
    }

    create () {
        this.add.image(320, 600, 'farmBackground');

        this.anims.create({
            key: 'farmhouseAnimation',
            frames: this.anims.generateFrameNumbers('farmhouseSpritesheet', { start: 0, end: 4 }),
            frameRate: 6,
            repeat: -1 // Repeat indefinitely
        });


        this.farmhouse = this.add.sprite(128, 624, 'farmhouseSpritesheet');
        this.farmhouse.anims.play('farmhouseAnimation');
        this.farmhouse.setInteractive();
        Utils.addTintOnHover(this.farmhouse);

        this.add.image(280, 440, 'cloud1');
        this.add.image(140, 460, 'cloud2');
        this.add.image(500, 510, 'cloud3');


        // this.add.bitmapText(150, 500, 'pixelFont', 'Hello, world!', 32);




        //When F key is pressed call toggleFullscreen function
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F).on('down', Utils.toggleFullscreen);




        //Switch to inside farmhouse scene when farmhouse is clicked
        this.farmhouse.on('pointerdown', () => {
            this.scene.start('InsideFarmhouseScene');
        });
        

    }




    // toggleFullscreen() {
    //     if(!document.fullscreenElement){
    //         document.documentElement.requestFullscreen();
    //     }
    //     else {
    //         document.exitFullscreen();
    //     }
    // }

    //Add tint to sprite when hovered over with cursor
    // addTintOnHover(sprite) {
    //     sprite.on('pointerover', () => {
    //         sprite.setTint(0xdddddd); // Set tint to light grey
    //     });
        
    //     sprite.on('pointerout', () => {
    //         sprite.clearTint(); // Clear tint
    //     });
    // }

}
