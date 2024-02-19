import Utility from "./Utility.js";

export default class FarmScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FarmScene' });
    }


    preload () {
        // this.load.bitmapFont('pixelFont', '../fonts/pixeloperatorbitmap.png', '../fonts/pixeloperatorbitmap.xml');

        this.load.image('farmBackground', '../assets/farm-background.png');
        this.load.image('mountains', '../assets/mountains.png');
        this.load.image('fence', '../assets/fence.png');
        this.load.spritesheet('farmhouseSpritesheet', '../assets/farmhouse-animation.png', { frameWidth: 80, frameHeight: 128 });
        this.load.image('market', '../assets/market.png');
        this.load.image('sun', '../assets/sun.png');

        this.load.image('cloud1', '../assets/clouds/cloud1.png');
        this.load.image('cloud2', '../assets/clouds/cloud2.png');
        this.load.image('cloud3', '../assets/clouds/cloud3.png');
        this.load.image('cloud4', '../assets/clouds/cloud4.png');
        this.load.image('cloud5', '../assets/clouds/cloud5.png');
        this.load.image('cloud6', '../assets/clouds/cloud6.png');
    }

    create () {
        this.add.image(320, 600, 'farmBackground').setDepth(-2);

        this.add.image(320, 570, 'mountains')

        this.add.image(320, 490, 'sun');

        this.clouds = [];
        this.cloudImages = ['cloud1', 'cloud2', 'cloud3', 'cloud4', 'cloud5', 'cloud6'];
        
        //Generate initial cloud
        this.generateCloud();

        //Generate a new cloud every 5 seconds
        this.time.addEvent({
            delay: 5000,
            callback: this.generateCloud,
            callbackScope: this,
            loop: true
        });

        this.add.image(320, 610, 'fence');

        this.anims.create({
            key: 'farmhouseAnimation',
            frames: this.anims.generateFrameNumbers('farmhouseSpritesheet', { start: 0, end: 4 }),
            frameRate: 6,
            repeat: -1 // Repeat indefinitely
        });

        //Add farmhouse image and make it interactive
        this.farmhouse = this.add.sprite(64, 624, 'farmhouseSpritesheet');
        this.farmhouse.anims.play('farmhouseAnimation');
        this.farmhouse.setInteractive();
        Utility.addTintOnHover(this.farmhouse);

        //Add market image and make it interactive
        this.market = this.add.image(580, 624, 'market');
        this.market.setInteractive();
        Utility.addTintOnHover(this.market);
        // Make market invisible for now until we have a nice market sprite
        this.market.setVisible(false);



        //When F key is pressed call toggleFullscreen function
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F).on('down', Utility.toggleFullscreen);


        // Switch to inside farmhouse scene when farmhouse is clicked (Keeps FarmScene running in background)
        this.market.on('pointerdown', () => {
            this.scene.launch('MarketScene');
        });

        // Switch to inside farmhouse scene when farmhouse is clicked (Keeps FarmScene running in background)
        this.farmhouse.on('pointerdown', () => {
            this.scene.launch('InsideFarmhouseScene');
        });




        // this.add.text(300, 500, 'Hello, world!', {fontSize: 20, fill: '#000000'});

        // let text = this.add.bitmapText(150, 500, 'pixelFont', 'Time: 12040', 16);
        // text.setTint(0x000000);
        

    }


    generateCloud() {
        // Generate a random y position
        let y = Phaser.Math.Between(100, 560);

        // Select a random cloud image
        let randomIndex = Phaser.Math.Between(0, this.cloudImages.length - 1);
        let randomImage = this.cloudImages[randomIndex];

        // Create a new cloud at left edge of the screen and at the random y position, setDepth(-1) to make sure the clouds are behind the mountains
        let cloud = this.physics.add.image(-50, y, randomImage).setDepth(-1);

        // Set the cloud's velocity to the right
        cloud.setVelocityX(20);

        // Add the cloud to the clouds array
        this.clouds.push(cloud);

        // Loop through every cloud. If a cloud's x coordinate is greater than the canvas width, destroy it and remove it from the array
        for (let i = this.clouds.length - 1; i >= 0; i--) {
            if (this.clouds[i].x > this.game.config.width) {
                this.clouds[i].destroy();
                this.clouds.splice(i, 1);
            }
        }
    }

}
