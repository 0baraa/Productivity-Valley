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
        this.id = 1;
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

        this.add.image(320, 560, 'fence');



        this.anims.create({
            key: 'farmhouseAnimation',
            frames: this.anims.generateFrameNumbers('farmhouseSpritesheet', { start: 0, end: 4 }),
            frameRate: 6,
            repeat: -1 // Repeat indefinitely
        });

        //Add farmhouse image and make it interactive
        this.farmhouse = this.add.sprite(64, 574, 'farmhouseSpritesheet');
        this.farmhouse.anims.play('farmhouseAnimation');
        this.farmhouse.setInteractive();
        Utility.addTintOnHover(this.farmhouse);

        //Add market sign image and make it interactive
        this.marketSign = this.add.image(600, 560, 'marketSign');
        this.marketSign.setInteractive();
        Utility.addTintOnHover(this.marketSign);


        this.plots = [];  // Create an array to store the plot objects

        //create the plots
        for (let i = 0; i < plotsAcross; i++) {
            for (let j = 0; j < plotsDown; j++) {
            this.plots.push(new Plot({scene: this, x: 170 + i*100, y: 627 + j*100, key: 'crop', id: (j + i * plotsDown)}))
            }
        }

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
        if (this.id == 2) {
            this.id = 1;
        } else {
            this.id = 2;
        }
        return this.id;
    }

    setChildrenDepth(children, depth) {
        for (let i = 0; i < children.length; i ++ ) {
            children[i].setDepth(depth);
        }
    }

    progressAnimation(sprite) {
        console.log(sprite);
        sprite.anims.currentFrame.nextFrame(1);
    }

}

export class Plot extends Phaser.GameObjects.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, 'plot')
        this.growing = false;
        this.alternating = false;
        this.size = 5;
        this.id = config.id;
        if (this.id % 2 === 0) { // make sure plots below don't overlap ones above.
            this.cropDepth = 1;
        } else {
            this.cropDepth = 2;
        }
        this.scene = config.scene;
        this.plotSprite = this.scene.add.existing(this);
        this.plotSprite.setInteractive()
        Utility.addTintOnHover(this.plotSprite);
        this.plotSprite.on('pointerdown', () => {
            if (!this.growing) {
                let cId = this.scene.setupPomodoro();
                this.plantCrops(cId);
            } else {
                this.harvestCrops();
            }
        })
    }

    plantCrops(id) {
        this.updateCount = 0;
        this.growing = true;
        let cropType = "";
        let cropAnim = "";

        // prepare for spacing of the crops
        let plotTex = this.scene.textures.get('plot').getSourceImage();
        
        let yoffset = 0;
        let xoffset = 0;

        //crop choice
        switch (id) {
            case 1: // carrots
                cropType = 'carrotGrowth';
                cropAnim = 'carrotAnimation';
                yoffset = 0;
                this.size = 4;
                xoffset = plotTex.width/this.size/2; 
                break;
            case 2: // sunflowers
                cropType = 'sunflowerGrowth';
                cropAnim = 'sunflowerAnimation';
                yoffset = -plotTex.height/this.size/2;
                this.size = 5;
                xoffset = plotTex.width/this.size/2;
                break;
        }
        let wSpace = plotTex.width/this.size;
        let hSpace = plotTex.height/this.size;
        let xBase = this.plotSprite.x - plotTex.width/2;
        let yBase = this.plotSprite.y - plotTex.height/2;

        
        yBase += yoffset;
        xBase += xoffset;
        // place the crops
        this.crops = this.scene.add.group();
        for (let j = 0; j < this.size; j++) {
            if (this.alternating) { // places crops in alternating pattern
                if (j%2 !== 0) {
                    for (let i = 0; i < this.size; i++) {
                        this.crops.add(this.scene.add.sprite((xBase + i*wSpace + wSpace/2) | 0, (yBase + j*hSpace) | 0, cropType));
                    }
                }
                else {
                    for (let i = -2; i < 3; i++) {
                        this.crops.add(this.scene.add.sprite((xBase + i*wSpace) | 0, (yBase + j*hSpace) | 0, cropType));
                    }
                }

            } else { //standard grid pattern
                for (let i = 0; i < this.size; i += 1) {
                    this.crops.add(this.scene.add.sprite((xBase + i*wSpace) | 0, (yBase + j*hSpace) | 0, cropType));
                }
            }
        }
        
        this.randomCrops = this.crops.getChildren();
        this.scene.anims.play(cropAnim, this.crops.getChildren(), 0);
        this.randomCrops.forEach((crop) => crop.stop());
        this.randomCrops = this.shuffle(this.randomCrops);
        const self = this;

        let tick = setInterval(function (){
            if (self.updateCount === self.size * self.size) {
                self.updateCount = 0;
            }
            self.progressAnimation(self.randomCrops[self.updateCount]);
            self.updateCount += 1;
        }, 500);
        
        //this.progressAnimation(this.crops.getChildren()[1])
        this.scene.setChildrenDepth(this.crops.getChildren(), this.cropDepth);
        
        
    }

    
    harvestCrops() {
        this.growing = false;
        this.crops.destroy(true);
    }
    


    progressAnimation(sprite) {
        if (!sprite.anims.isLast) {
            sprite.anims.nextFrame(1);
        }
        
    }

    // Fisher-Yates shuffle method : https://bost.ocks.org/mike/shuffle/
    shuffle(array) {
        let randomScope = array.length;
        let i, endV;
        while (randomScope != 0) {
            i = (Math.random() * randomScope--) | 0;
            endV = array[randomScope];
            array[randomScope] = array[i];
            array[i] = endV;
        }
        return array;
    }
}
