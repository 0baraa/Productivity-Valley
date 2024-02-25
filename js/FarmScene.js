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
        generateCloud(this);

        //Generate a new cloud every 5 seconds
        this.time.addEvent({
            delay: 5000,
            callback: () => generateCloud(this),
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


        let plots = [];
        let plot = new Plot(0, "sunflower", [], 5);
        plots.push(plot);
        let plot2 = new Plot(0, "sunflower", [], 9);
        plots.push(plot2);
        let plot3 = new Plot(0, "carrot", [], 9);
        plots.push(plot3);
        let plot4 = new Plot(0, "sunflower", [], 4);
        plots.push(plot4);
        let plot5 = new Plot(0, "carrot", [], 10);
        plots.push(plot5);
        let plot6 = new Plot(0, "sunflower", [], 7);
        plots.push(plot6);

        let farm = new PlayerFarm(0,plots,0,0,0,0);
        farm.createFarm(this);


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



}

function generateCloud(scene) {
    // Generate a random y position
    let y = Phaser.Math.Between(100, 460);

    // Select a random cloud image
    let randomIndex = Phaser.Math.Between(0, scene.cloudImages.length - 1);
    let randomImage = scene.cloudImages[randomIndex];

    // Create a new cloud at left edge of the screen and at the random y position, setDepth(-1) to make sure the clouds are behind the mountains
    let cloud = scene.physics.add.image(-50, y, randomImage).setDepth(-1);

    // Set the cloud's velocity to the right
    cloud.setVelocityX(20);

    // Add the cloud to the clouds array
    scene.clouds.push(cloud);

    // Loop through every cloud. If a cloud's x coordinate is greater than the canvas width, destroy it and remove it from the array
    for (let i = scene.clouds.length - 1; i >= 0; i--) {
        if (scene.clouds[i].x > scene.game.config.width) {
            scene.clouds[i].destroy();
            scene.clouds.splice(i, 1);
        }
    }
}



function getUserData() {
    // Called in create method of FarmScene
    // Fetches user data from the backend
    // Then formats data in appropriate way
    // This data is used to create a PlayerFarm object, which is then displayed
}


class PlayerFarm {
    constructor(coins, plots, crops, decorations, furniture, animals){
        this.coins = coins;
        this.plots = plots;
        //owned crops
        this.crops = crops;
        this.decorations = decorations;
        this.furniture = furniture;
        this.animals = animals;
    }

    createFarm(scene){

        for(let i = 0; i < this.plots.length; i++) {

            let currentPlot = this.plots[i];

            let plotX = 165 + (100 * (i % 4));
            let plotY = 610 + (100 * Math.floor(i / 4));

            let plotContainer = scene.add.container(plotX, plotY);
            let plot = scene.add.sprite(0, 0, 'plot');
            plot.setInteractive();
            Utility.addTintOnHover(plot);
            plotContainer.add(plot);

            let gridSize = 5;
            let cellWidth = plot.width / gridSize;
            let cellHeight = plot.height / gridSize;

            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    let x = col * cellWidth + cellWidth / 2;
                    let y = row * cellHeight + cellHeight / 2;
                    let crop = scene.add.sprite(x - (plot.width / 2), y - (plot.height / 2), currentPlot.crop + "Growth").setOrigin(0.5, 0.9);
                    crop.setFrame(currentPlot.growthStage);
                    plotContainer.add(crop);
                    currentPlot.cropSprites.push(crop);
                }
            }

        }


    }

}

class Plot {
    constructor(id, crop, cropSprites, growthStage){
        this.id = id;
        this.crop = crop;
        //crop sprites on the plot
        this.cropSprites = cropSprites;
        this.growthStage = growthStage;
    }

    grow(){
        for(let cropSprite of this.cropSprites){
            this.growthStage++;
            cropSprite.setFrame(this.growthStage);
        }
    }
}


// plots = []
// create appropriate plots with correct plant and growth stage etc
// add plots to plots array
// pass plots array to Farm object
// Farm object creates the plots in the scene
