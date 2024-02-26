import Utility from "./Utility.js";

export default class FarmScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FarmScene' });
    }


    preload () {
        this.load.bitmapFont('pixelFont', '../fonts/pixeloperatorbitmap.png', '../fonts/pixeloperatorbitmap.xml');

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
        this.load.spritesheet("sunflowerGrowth", "../assets/crops/sunflower-growth-AS2.png", {frameWidth: 19, frameHeight: 41});
        
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


        this.farm = new PlayerFarm(0,0,0,0,0);
        this.farm.createFarm(this);







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




        // this.add.text(50, 450, 'Coins: ' + farm.coins , {fontSize: 20, fill: '#000000'});

        this.coinsText = this.add.bitmapText(50, 480, 'pixelFont', 'Coins: ' + this.farm.coins, 32);
        this.coinsText.setTint(0x000000);
        

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
    constructor(coins, crops, decorations, furniture, animals){
        this.coins = coins;
        this.plots = [];
        //owned crops
        this.crops = crops;
        this.decorations = decorations;
        this.furniture = furniture;
        this.animals = animals;
    }

    createFarm(scene){

        for(let i = 0; i < 6; i++){
            let plotX = 165 + (100 * (i % 4));
            let plotY = 610 + (100 * Math.floor(i / 4));
            let plot = new Plot(scene, plotX, plotY, i + 1, "sunflower", 10);
            this.plots.push(plot);
        }

    }

}

class Plot extends Phaser.GameObjects.Container{
    constructor(scene, x, y, id, crop, growthStage) {
        super(scene, x, y);

        this.id = id;
        this.crop = crop;
        this.growthStage = growthStage;
        this.cropSprites = [];



        // Create the plot sprite and add it to the container
        this.plotSprite = scene.add.sprite(0, 0, 'plot');
        Utility.addTintOnHover(this.plotSprite);
        this.add(this.plotSprite);

        if(this.crop !== "nothing"){

            let gridSize = 5;
            let cellWidth = this.plotSprite.width / gridSize;
            let cellHeight = this.plotSprite.height / gridSize;

            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    let x = col * cellWidth + cellWidth / 2;
                    let y = row * cellHeight + cellHeight / 2;
                    //If setOrigin is not 0,0 or 1,1 then when the plot container is moved the crop sprites will look wrong
                    let crop = scene.add.sprite(x - 35, y - 42, this.crop + "Growth").setOrigin(1, 1);
                    crop.setFrame(this.growthStage);
                    this.cropSprites.push(crop);
                    this.add(crop);
                }
            }
        }

        // Make the container interactive
        this.setInteractive(new Phaser.Geom.Rectangle(-this.plotSprite.width/2, -this.plotSprite.height/2, this.plotSprite.width, this.plotSprite.height), Phaser.Geom.Rectangle.Contains);

        // Add a hover effect to the plot sprite (for some reason Utility.addTintOnHover doesn't work here)
        this.on('pointerover', () => {
            this.plotSprite.setTint(0xdddddd); // Change the color to your liking
        });

        this.on('pointerout', () => {
            this.plotSprite.clearTint();
        });

        // Add a click event listener
        this.on('pointerdown', () => {
            alert(`Plot id: ${this.id}`);
            this.harvest(scene);
        });
        
        // Add the container to the scene
        scene.add.existing(this);
                

    }

    harvest(scene){
        for(let cropSprite of this.cropSprites){
            cropSprite.destroy();
            switch(this.crop){
                case "sunflower":
                    scene.farm.coins += 100 * 1.2;
                    scene.coinsText.setText('Coins: ' + scene.farm.coins);
                    break;
                case "carrot":
                    scene.farm.coins += 100 * 1.5;
                    scene.coinsText.setText('Coins: ' + scene.farm.coins);
                    break;
            }
            this.growthStage = 0;
            this.crop = "nothing";
        }
    
    }
    
}


// plots = []
// create appropriate plots with correct plant and growth stage etc
// add plots to plots array
// pass plots array to Farm object
// Farm object creates the plots in the scene
