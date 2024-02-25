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
        this.load.image('marketSign', '../assets/market-sign.png');
        this.load.image('sun', '../assets/sun.png');
        this.load.image('plot', '../assets/larger_plot.png');

        this.load.image('cloud1', '../assets/clouds/cloud1.png');
        this.load.image('cloud2', '../assets/clouds/cloud2.png');
        this.load.image('cloud3', '../assets/clouds/cloud3.png');
        this.load.image('cloud4', '../assets/clouds/cloud4.png');
        this.load.image('cloud5', '../assets/clouds/cloud5.png');
        this.load.image('cloud6', '../assets/clouds/cloud6.png');

        this.load.spritesheet("carrotGrowth", "../assets/crops/carrot-growth-AS.png", {frameWidth: 20, frameHeight: 30});
        this.load.spritesheet("sunflowerGrowth", "../assets/crops/sunflower-growth-AS.png", {frameWidth: 19, frameHeight: 41});
        
    }

    create () {
        let plotsAcross = 4;
        let plotsDown = 2;

        this.add.image(320, 550, 'farmBackground').setDepth(-2);

        this.add.image(320, 520, 'mountains');

        this.sun = this.add.sprite(320, 440, 'sun');
        this.sun.setInteractive();
        Utility.addTintOnHover(this.sun);

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

        this.add.image(320, 550, 'fence');



        this.anims.create({
            key: 'farmhouseAnimation',
            frames: this.anims.generateFrameNumbers('farmhouseSpritesheet', { start: 0, end: 4 }),
            frameRate: 6,
            repeat: -1 // Repeat indefinitely
        });

        //Add farmhouse image and make it interactive
        this.farmhouse = this.add.sprite(64, 560, 'farmhouseSpritesheet');
        this.farmhouse.anims.play('farmhouseAnimation');
        this.farmhouse.setInteractive();
        Utility.addTintOnHover(this.farmhouse);

        //Add market sign image and make it interactive
        this.marketSign = this.add.image(600, 560, 'marketSign');
        this.marketSign.setInteractive();
        Utility.addTintOnHover(this.marketSign);


        // this.plots = [];  // Create an array to store the plot objects

        // //create the plots
        // for (let i = 0; i < plotsDown; i++) {
        //     for (let j = 0; j < plotsAcross; j++) {
        //     this.plots.push(new Plot({scene: this, x: 170 + j*100, y: 627 + i*100, key: 'crop', id: (j + i * plotsAcross)}))
        //     }
        // }

        let plots = [];
        let plot = new Plot(0, "sunflower", 0);
        plots.push(plot);
        let plot2 = new Plot(0, "sunflower", 0);
        plots.push(plot2);
        let plot3 = new Plot(0, "sunflower", 0);
        plots.push(plot3);
        let plot4 = new Plot(0, "sunflower", 0);
        plots.push(plot4);
        let plot5 = new Plot(0, "sunflower", 0);
        plots.push(plot5);
        let plot6 = new Plot(0, "sunflower", 0);
        plots.push(plot6);

        let farm = new PlayerFarm(0,plots,0,0,0,0);
        farm.createFarm(this);

        // create crop animations
        this.anims.create({
            key: 'carrotAnimation',
            frames: this.anims.generateFrameNumbers("carrotGrowth", {start: 0, end: 10,}),
            frameRate: 1,
            repeat: 0
        })
        this.anims.create({
            key: 'sunflowerAnimation',
            frames: this.anims.generateFrameNumbers("sunflowerGrowth", {start: 0, end: 10,}),
            frameRate: 1,
            repeat: 0
        })


        //When F key is pressed call toggleFullscreen function
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F).on('down', Utility.toggleFullscreen);


        // Switch to inside farmhouse scene when farmhouse is clicked (Keeps FarmScene running in background)
        this.marketSign.on('pointerdown', () => {
            // Disable input for FarmScene
            this.input.enabled = false;
            this.scene.launch('MarketScene');
        });

        // Switch to inside farmhouse scene when farmhouse is clicked (Keeps FarmScene running in background)
        this.farmhouse.on('pointerdown', () => {
            // Disable input for FarmScene
            this.input.enabled = false;
            this.scene.launch('InsideFarmhouseScene');
        });




        // this.add.text(300, 500, 'Hello, world!', {fontSize: 20, fill: '#000000'});

        // let text = this.add.bitmapText(150, 500, 'pixelFont', 'Time: 12040', 16);
        // text.setTint(0x000000);
        

    }


    generateCloud() {
        // Generate a random y position
        let y = Phaser.Math.Between(100, 460);

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

    setupPomodoro() {
        // add functionality for giving page of crop choices.
        let id = 2;
        return id;
    }
}

// export class Plot extends Phaser.GameObjects.Sprite{
//     constructor(config) {
//         super(config.scene, config.x, config.y, 'plot')
//         this.growing = false;
//         this.id = config.id;
//         this.scene = config.scene;
//         this.plotSprite = this.scene.add.existing(this);
//         this.plotSprite.setInteractive()
//         Utility.addTintOnHover(this.plotSprite);
//         this.plotSprite.on('pointerdown', () => {
//             if (!this.growing) {
//                 let cId = this.scene.setupPomodoro();
//                 this.plantCrops(cId);
//             } else {
//                 this.harvestCrops();
//             }
//         })
//     }

//     plantCrops(id) {
//         this.growing = true;
//         let cropType = "";
//         let cropAnim = "";
//         let yoffset = 0;
//         //crop choice
//         switch (id) {
//             case 1: // carrots
//                 cropType = 'carrotGrowth';
//                 cropAnim = 'carrotAnimation';
//                 yoffset = 1;
//                 break;
//             case 2: // sunflowers
//                 cropType = 'sunflowerGrowth';
//                 cropAnim = 'sunflowerAnimation';
//                 yoffset = 0;
//                 break;
//         }

//         // get spacing for the crops
//         let plotTex = this.scene.textures.get('plot').getSourceImage();
//         let wSpace = plotTex.width/6 + 2;
//         let hSpace = plotTex.height/5;
//         let xBase = this.plotSprite.x;
//         let yBase = this.plotSprite.y;
//         yBase += yoffset;
        
//         // place the crops
//         this.crops = this.scene.add.group();
//         for (let i = -2; i < 3; i++) {
//             for (let j = -3; j < 2; j++) {
//                 this.crops.add(this.scene.add.sprite((xBase + i*wSpace) | 0, (yBase + j*hSpace) | 0, cropType));
                
//                 //console.log((xBase + i*wSpace) | 0, (yBase + j*hSpace) | 0);
                
//             }
//         }

//         // to be replaced with an update crop method
//         this.scene.anims.play(cropAnim, this.crops.getChildren(), 0);

//     }

//     harvestCrops() {
//         this.growing = false;
//         this.crops.destroy(true);
//     }

// }






class PlayerFarm {
    constructor(coins, plots, crops, decorations, furniture, animals){
        this.coins = coins;
        this.plots = plots;
        this.crops = crops;
        this.decorations = decorations;
        this.furniture = furniture;
        this.animals = animals;
    }

    createFarm(scene){

        for(let i = 0; i < this.plots.length; i++) {
            let x = 165 + (100 * (i % 4));
            let y = 610 + (100 * Math.floor(i / 4));
            let plot = scene.add.sprite(x, y, 'plot');
            plot.setInteractive();
            Utility.addTintOnHover(plot);
        }

    }

}

class Plot {
    constructor(id, plant, growthStage){
        this.id = id;
        this.plant = plant;
        this.growthStage = growthStage;
    }
}


// plots = []
// create appropriate plots with correct plant and growth stage etc
// add plots to plots array
// pass plots array to Farm object
// Farm object creates the plots in the scene
