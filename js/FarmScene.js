import Utility from "./Utility.js";

export default class FarmScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FarmScene' });
    }


    preload() {
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

        this.load.spritesheet("carrotGrowth", "../assets/crops/carrot-growth-AS.png", { frameWidth: 20, frameHeight: 30 });
        this.load.spritesheet("sunflowerGrowth", "../assets/crops/sunflower-growth-AS.png", { frameWidth: 19, frameHeight: 41 });

        this.load.image('play-button', '../assets/clock/play-button.png');
        this.load.image('pause-button', '../assets/clock/pause-button.png');
        this.load.image('skip-button', '../assets/clock/skip-button.png');

    }

    create() {
        this.add.image(320, 550, 'farmBackground').setDepth(-1);

        this.add.image(320, 520, 'mountains');

        this.sun = this.add.sprite(320, 455, 'sun').setDepth(-1);
        this.sun.setInteractive();
        Utility.addTintOnHover(this.sun);

        this.clouds = [];
        this.cloudImages = ['cloud1', 'cloud2', 'cloud3', 'cloud4', 'cloud5', 'cloud6'];

        //Generate initial cloud
        generateCloud(this);

        //Generate a new cloud every 5 seconds
        this.time.addEvent({
            delay: 2500,
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



        //Create crop animations.
        this.anims.create({
            key: 'carrotAnim',
            frames: this.anims.generateFrameNumbers("carrotGrowth", { start: 0, end: 10, }),
            frameRate: 1,
            repeat: 0
        })
        this.anims.create({
            key: 'sunflowerAnim',
            frames: this.anims.generateFrameNumbers("sunflowerGrowth", { start: 0, end: 10, }),
            frameRate: 1,
            repeat: 0
        })

        this.farm = new PlayerFarm({ coins: 0, cropsOwned: 0, decorationsOwned: 0, decorationsPlaced: 0, furnitureOwned: 0, animals: 0 });
        this.farm.createPlots(this);






        //When F key is pressed call toggleFullscreen function
        //Disabled for now as it doesn't quite work with the dialog element
        // this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F).on('down', Utility.toggleFullscreen);


        // the market sign has moved to this.farm.createPlots()

        // Switch to inside farmhouse scene when farmhouse is clicked (Keeps FarmScene running in background)
        this.farmhouse.on('pointerdown', () => {
            // Disable input for FarmScene
            this.input.enabled = false;
            this.scene.launch('InsideFarmhouseScene');
        });




        // this.add.text(50, 450, 'Coins: ' + farm.coins , {fontSize: 20, fill: '#000000'});
        // this.coinsText = this.add.bitmapText(50, 480, 'pixelFont', 'Coins: ' + this.farm.coins, 32);
        // this.coinsText.setTint(0x000000);


        // const element = this.add.dom(320, 600).createFromCache('form');
        // element.addListener('click');

        // this.add.dom(320, 600, 'div', 'background-color: orange; width: 20vw; height: 20vw; font: 48px pixel-font', 'Phaser');


        // disable input when menu is shown
        // this.sys.game.input.enabled = false;

        // const pomodoro = new Pomodoro(this, 100, 100, 100);
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
    cloud.setScale(Phaser.Math.Between(50, 75) / 100);

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

function createSun(){
    const workTime = document.getElementById('minutes').value;
    // const shortBreakTime = document.getElementById('').value;
    // const longBreakTime = document.getElementById('').value;
    // const noOfPomodoros = document.getElementById('').value;

    const pomodoro = new Pomodoro(this, 100, 100, 100, workTime);
}

class SectorCircle extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y, radius, startAngle, endAngle, color) {
        super(scene);
        scene.add.existing(this);

        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startAngle = Phaser.Math.DegToRad(startAngle); // Starting angle at -90 degrees
        this.endAngle = Phaser.Math.DegToRad(endAngle); // Ending angle at 260 degrees
        this.arcAngle = this.endAngle - this.startAngle;
        this.color = color;

        // Draw the sector of the circle
        this.drawSector();
    }

    drawSector() {
        this.fillStyle(this.color); // Fill color
        this.fillSector(this.x, this.y, this.radius, this.startAngle, this.arcAngle);
    }

    fillSector(x, y, radius, startAngle, arcAngle) {
        this.beginPath();
        this.moveTo(x, y);
        this.arc(x, y, radius, startAngle, startAngle + arcAngle, false);
        this.closePath();
        this.fillPath();
    }
}

class AnalogTimer extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y, radius, totalTimeInSeconds, repeatDurationInSeconds, pomodoro, pauseFlag, color) {
        super(scene);
        scene.add.existing(this);

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.totalTimeInSeconds = totalTimeInSeconds;
        this.repeatDurationInSeconds = repeatDurationInSeconds;
        this.remainingTime = totalTimeInSeconds;
        this.elapsedTime = 0;

        this.pomodoro = pomodoro;
        this.pauseFlag = pauseFlag;
        this.color = color;

        // Generate the text
        this.timeString = scene.add.text(this.x + 62, this.y + 125, '', { color: '#000000' });
        this.timeString.setDepth(1);

        // Add the text to the scene
        this.scene.add.existing(this.timeString);

        this.updateTimeString();

        this.timeString.setVisible(false);

        this.fillCircle = new SectorCircle(scene, this.x, this.y, radius, -90, -90, this.color);

        // Create the timer face
        this.createTimerFace();

        // Start the timer
        this.startTimer();

        // Listen to events from pomodoro
        this.scene.events.on('timerPaused', this.pauseTimer, this);
        this.scene.events.on('timerResumed', this.resumeTimer, this);
        this.scene.events.on('timerSkipped', this.skipTimer, this);

        this.scene.events.on('showTime', this.showTime, this);
        this.scene.events.on('hideTime', this.hideTime, this);
    }

    skipTimer() {
        this.timeString.destroy();
    }

    showTime() {
        this.timeString.setVisible(true);
    }

    hideTime() {
        this.timeString.setVisible(false);
    }

    drawSector() {
        this.fillStyle(0xFFEA00); // Fill color
        this.fillSector(this.x, this.y, this.radius, this.startAngle, this.arcAngle);
    }

    fillSector(x, y, radius, startAngle, arcAngle) {
        this.beginPath();
        this.moveTo(x, y);
        this.arc(x, y, radius, startAngle, startAngle + arcAngle, false);
        this.closePath();
        this.fillPath();
    }

    createTimerFace() {
        this.clear();

        const angle = (this.elapsedTime / this.totalTimeInSeconds) * Phaser.Math.PI2 - Phaser.Math.PI2 / 4;
        const handLength = this.radius * 0.7;

        this.lineStyle(3, 0xff0000);
        this.beginPath();
        this.moveTo(this.x, this.y);
        this.lineTo(
            this.x + Math.cos(angle) * handLength,
            this.y + Math.sin(angle) * handLength
        );
        this.strokePath();
    }

    startTimer() {
        this.timerEvent = this.scene.time.addEvent({
            delay: 1000, // Update every second
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    pauseTimer() {
        this.timerEvent.paused = true;
    }

    resumeTimer() {
        this.timerEvent.paused = false;
    }

    updateTimeString() {
        // Calculate hours, minutes, and remaining seconds
        const hours = Math.floor(this.remainingTime / 3600);
        const minutes = Math.floor((this.remainingTime % 3600) / 60);
        const seconds = this.remainingTime % 60;

        // Format hours, minutes, and seconds with leading zeros if needed
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        // Display the formatted time
        this.timeString.setText(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
    }

    updateTimer() {
        // Check if the timer has been destroyed
        if (!this.active) {
            this.fillCircle.destroy();
            return;
        }

        // Clear previous timer hand
        this.clear();
        this.fillCircle.clear();

        this.elapsedTime++;
        this.remainingTime--;

        this.updateTimeString();

        // Calculate angle for timer hand
        const angle = (this.elapsedTime / this.totalTimeInSeconds) * Phaser.Math.PI2 - Phaser.Math.PI2 / 4;

        // Change the fill circle area
        this.fillCircle = new SectorCircle(this.scene, this.x, this.y, this.radius - 30, -90, Phaser.Math.RadToDeg(angle), this.color);

        // Draw timer hand
        const handLength = this.radius * 0.7;
        this.lineStyle(3, 0xff0000);
        this.beginPath();
        this.moveTo(this.x, this.y);
        this.lineTo(
            this.x + Math.cos(angle) * handLength,
            this.y + Math.sin(angle) * handLength
        );
        this.strokePath();

        // Constant check for the state of the timer to update pomodoro
        if (this.timerEvent.paused) {
            this.pauseFlag = true;
        } else {
            // this.scene.events.emit('timerResumed');
            this.pauseFlag = false;
        }

        // Check if timer is completed
        if (this.remainingTime <= 0) {
            this.scene.events.emit('timerCompleted');
            this.timeString.destroy();
            if (this.repeatDurationInSeconds > 0) {
                // If repeat duration is specified, restart the timer
                // Reset timer for repeat duration
                this.elapsedTime = 0;
                this.remainingTime = this.totalTimeInSeconds;
                this.timerEvent.delay = this.repeatDurationInSeconds * 1000;
                this.repeatDurationInSeconds--;
            }
            else {
                this.timerEvent.remove();
                this.fillCircle.destroy();
                console.log("Timer completed!");
            }
        }
    }
}

// Events for the timer
class Pomodoro extends Phaser.GameObjects.Container {
    constructor(scene, x, y, radius, workTime = 1, shortBreakTime = 0.5, longBreakTime = 2, noOfPomodoros = 2, autoStartBreak = false, autoStartPomodoro = true, longBreakInterval = 2) {
        super(scene, x, y);
        scene.add.existing(this);

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.radius = radius;

        this.workTime = workTime; // In Minutes
        this.shortBreakTime = shortBreakTime; // In Minutes
        this.longBreakTime = longBreakTime; // In Minutes
        this.longBreakInterval = longBreakInterval;
        this.autoStartBreak = autoStartBreak;
        this.autoStartPomodoro = autoStartPomodoro;
        this.noOfPomodoros = noOfPomodoros;

        this.workFlag = true; // true = work time, false = break time
        this.pauseFlag = false;

        this.initBreakInterval = longBreakInterval;

        this.workTime = this.workTime * 60;
        this.shortBreakTime = this.shortBreakTime * 60;
        this.longBreakTime = this.longBreakTime * 60;

        this.createButtons();
        this.createHitArea();

        this.playButton.setVisible(true);

        this.scene.events.on('timerCompleted', this.autoStart, this);

        this.graphics = this.scene.add.graphics();

        this.drawBackCircle();
        this.add(this.graphics);
    }

    drawBackCircle() {
        // Clear previous graphics
        this.graphics.clear();

        // Set line style and fill color
        this.graphics.lineStyle(2, 0x000000);
        this.graphics.fillStyle(0xFFEA00, 1);

        // Draw the circle shape
        this.graphics.beginPath();
        this.graphics.arc(this.x, this.y, this.radius - 30, 0, Phaser.Math.PI2);
        this.graphics.closePath();
        this.graphics.fillPath();
    }

    createButtons() {
        // create play button image
        this.playButton = this.scene.add.image(this.x + 98, this.y + 100, 'play-button').setScale(.30);
        this.playButton.setDepth(1);
        this.playButton.setVisible(false);
        this.playButton.setInteractive();
        // Utility.addTintOnHover(this.playButton);

        // create pause button image
        this.pauseButton = this.scene.add.image(this.x + 75, this.y + 100, 'pause-button').setScale(.30);
        this.pauseButton.setDepth(1);
        this.pauseButton.setVisible(false);
        this.pauseButton.setInteractive();
        // Utility.addTintOnHover(this.pauseButton);

        // create skip button image
        this.skipButton = this.scene.add.image(this.x + 125, this.y + 100, 'skip-button').setScale(.30);
        this.skipButton.setDepth(1);
        this.skipButton.setVisible(false);
        this.skipButton.setInteractive();
        // Utility.addTintOnHover(this.skipButton);

        // Event listeners to the images
        this.playButton.on('pointerdown', () => {
            console.log('play button clicked');
            console.log(this.workFlag);
            if (this.timer1){
                if (this.timer1.remainingTime == 0){
                    this.skipTimer();
                } else {
                    this.scene.events.emit('timerResumed');
                    this.pauseFlag = false;
                }
            } else {
                this.skipTimer();
            }
        });

        this.pauseButton.on('pointerdown', () => {
            console.log('pause button clicked');
            this.scene.events.emit('timerPaused');
            this.pauseFlag = true;
        });

        this.skipButton.on('pointerdown', () => {
            console.log('skip button clicked');
            this.scene.events.emit('timerSkipped');
            
            console.log('work flag', this.workFlag)
            this.skipTimer();
        });
    }

    autoStart() {
        if (this.timer1){
            this.timer1.destroy();
        }

        if (this.workFlag) {
            if (!this.autoStartPomodoro) {
                this.playButton.setVisible(true); 
                this.pauseButton.setVisible(false);
                this.skipButton.setVisible(false);
                return;
            } else {
                this.skipTimer(); 
            }
        } else {
            if (!this.autoStartBreak) { 
                this.playButton.setVisible(true); 
                this.pauseButton.setVisible(false);
                this.skipButton.setVisible(false);
                return; 
            } else {
                this.skipTimer();
            }
        }
    }

    skipTimer() {
        if (this.timer1){
            this.timer1.destroy();
        }

        this.workFlag = !this.workFlag;

        if (!this.workFlag) {
            if (this.noOfPomodoros != 0) {
                this.noOfPomodoros--;
                this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.workTime, 0, this, this.pauseFlag, 0xffa500);
            } else {
                this.playButton.destroy();
                this.pauseButton.destroy();
                this.skipButton.destroy();
            }
        } else {
            this.longBreakInterval--;
            if (this.longBreakInterval == 0) {
                this.longBreakInterval = this.initBreakInterval;
                this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.longBreakTime, 0, this, this.pauseFlag, 0x228B22);
            } else {
                this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.shortBreakTime, 0, this, this.pauseFlag, 0x7CFC00);
            }
        }
    }

    createHitArea() {
        // Create an invisible sprite to handle pointer events
        this.hitArea = this.scene.add.circle(this.x, this.y, this.radius - 35);
        this.hitArea.setDepth(1);
        this.hitArea.setAlpha(1); // Make it invisible

        // Add event listeners
        this.hitArea.setInteractive();
        this.hitArea.on('pointerover', this.onPointerOver, this);
        this.hitArea.on('pointerout', this.onPointerOut, this);

        this.add(this.hitArea);
    }

    onPointerOver() {
        this.scene.events.emit('showTime');
        
        this.playButton.setVisible(true);
        if (this.timer1){
            if (this.pauseFlag || this.timer1.remainingTime == 0 || this.timer1.paused) {
                this.playButton.setVisible(true);
                this.pauseButton.setVisible(false);
                this.skipButton.setVisible(false);
            } else {
                this.playButton.setVisible(false);
                this.pauseButton.setVisible(true);
                this.skipButton.setVisible(true);
            }
        }
    }

    onPointerOut() {
        this.scene.events.emit('hideTime');
        this.playButton.setVisible(false);
        this.pauseButton.setVisible(false);
        this.skipButton.setVisible(false);
    }
}

// A PlayerFarm object will store the state of everything specific to a user on the website
class PlayerFarm {
    constructor(config) {
        // load playerstate from database
        this.coins = config.coins;
        this.plots = [];
        this.furniturePlaced = [];
        this.cropsOwned = config.cropsOwned;
        this.decorationsOwned = config.decorationsOwned;
        this.decorationsPlaced = config.decorationsPlaced;
        this.furnitureOwned = config.furnitureOwned;
        this.animals = config.animals;
    }

    createPlots(scene) {
        let data = Utility.getUserData();

        let x, zoom;
        let y = 0;
        let along = false;
        // calculate camera offset and zoom based on plot number
        switch (data.plots.length) {
            case 2:
                x = -100;
                y = -40;
                zoom = 1.455;
                along = true;
                break;
            case 4:
                x = -100;
                zoom = 1.455;
                break;
            case 6:
                x = -50;
                zoom = 1.2;
                break;
            default:
                x = 0;
                zoom = 1;
        }
        // adjust camera
        // scene.cameras.main.setScroll(x, y)
        // scene.cameras.main.setZoom(zoom,zoom);
        let plotX, plotY;
        for (let i = 0; i < data.plots.length; i++) {

            if (along) {
                plotX = 165 + (100 * (i));
                plotY = 610;
            } else {
                plotX = 165 + (100 * (i % (data.plots.length / 2)));
                plotY = 610 + (100 * Math.floor(i / (data.plots.length / 2)));
            }
            //adjustable plot numbers:


            let plot = new Plot({ scene: scene, x: plotX, y: plotY, id: data.plots[i].id, crop: data.plots[i].crop, counter: data.plots[i].growthStage });
            this.plots.push(plot);
        }

        //set market sign to be one more than the crops.
        this.marketSign = scene.add.image(600, 560, 'marketSign');
        this.marketSign.setInteractive();
        Utility.addTintOnHover(this.marketSign);
        this.marketSign.on('pointerdown', () => {
            // Disable input for FarmScene
            scene.input.enabled = false;
            scene.scene.launch('MarketScene');
        });
    }

    createFurniture(scene) {
        let data = Utility.getUserData();

        for (let i = 0; i < data.furniture.length; i++) {
            let furniture = new Furniture({ scene: scene, x: data.furniture[i].x, y: data.furniture[i].y, type: data.furniture[i].type, texture: data.furniture[i].type });
            this.furniturePlaced.push(furniture);
        }
    }

}

class Plot extends Phaser.GameObjects.Container {
    constructor(config) {
        //loads plot state 
        super(config.scene, config.x, config.y);
        this.scene = config.scene;
        this.id = config.id;
        this.crop = config.crop || "nothing";
        this.growthStage = config.counter || 0;
        this.growthStep = config.step || 0;
        this.cropSprites = [];


        if (this.crop === "nothing") {
            this.occupied = false;
        } else {
            this.occupied = true;
        }

        // Create the plot sprite and add it to the container
        this.plotSprite = this.scene.add.sprite(0, 0, 'plot');
        Utility.addTintOnHover(this.plotSprite);
        this.add(this.plotSprite);

        // if there's crops saved, load those crops
        if (this.crop !== "nothing") {
            this.plantCrops();
        }

        // Make the container interactive
        this.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(-this.plotSprite.width / 2, -this.plotSprite.height / 2, this.plotSprite.width, this.plotSprite.height),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            draggable: false
        });

        // Add a hover effect to the plot sprite of the container(for some reason Utility.addTintOnHover doesn't work here)
        this.on('pointerover', () => {
            this.plotSprite.setTint(0xdddddd); // Change the color to your liking
        });

        this.on('pointerout', () => {
            this.plotSprite.clearTint();
        });


        // Dragging code (set draggable to true in setInteractive to enable dragging)
        // scene.input.on('drag', function(pointer, gameObject, dragX, dragY) {
        //     gameObject.x = dragX;
        //     gameObject.y = dragY;
        // });

        // scene.input.on('dragstart', function (pointer, gameObject) {
        //     // Bring the gameObject to the top of the display list
        //     this.children.bringToTop(gameObject);
        // }, this.scene);

        // Add the container to the scene


        this.on('pointerdown', () => {
            // if occupied, attempt harvest, if unoccupied, open start task menu.
            if (this.occupied) {
                this.harvest();
                this.occupied = false;
            }
            else {
                //show menu
                Utility.toggleMenu(this.scene, "taskMenu");
                const self = this;
                let form = document.getElementById("task-form");
                let taskExitButton = document.getElementById('task-exit-button');
                const func = function submitHandler(event) {
                    //starts crop growth, removes listeners, or just removes listeners
                    form.removeEventListener('submit', func);
                    taskExitButton.removeEventListener('click', func)
                    Utility.toggleMenu(self.scene, "taskMenu");
                    if (event.type == "submit") {
                        event.preventDefault();
                        self.setupCrops();
                    }
                }
                //add submit listener
                form.addEventListener('submit', func);
                //add exit listener
                taskExitButton.addEventListener('click', func);


            }
        });


        this.scene.add.existing(this);
    }

    setupCrops() {
        if (this.occupied == true)
            this.resetPlot();

        this.crop = document.getElementById('crop').value;
        this.plantCrops();
        this.playGrowth();
    }

    resetPlot() {
        this.growthStage = 0;
        this.occupied = false;
        for (let cropSprite of this.cropSprites) {
            cropSprite.destroy();
        }
        this.crop = "nothing";
        this.cropSprites = [];
    }

    plantCrops() {
        this.gridSize = 5;
        this.occupied = true;

        let cellWidth = this.plotSprite.width / this.gridSize;
        let cellHeight = this.plotSprite.height / this.gridSize;

        //Place crops
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                let x = col * cellWidth + cellWidth / 2;
                let y = row * cellHeight + cellHeight / 2;
                //If setOrigin is not 0,0 or 1,1 then when the plot container is moved the crop sprites will look wrong
                let crop = this.scene.add.sprite(x - 35, y - 40, this.crop + "Growth").setOrigin(1, 1).play(this.crop + "Anim");
                // immediately stops animation so that it can be controlled.
                crop.stop();
                //Set the frame of the crop sprite to the the current growth stage of the plot
                crop.setFrame(this.growthStage);
                //Push the crop sprite to the cropSprites array of the plot
                this.cropSprites.push(crop);
                //Add the crop sprite to the plot container
                this.add(crop);
            }
        }
        //Used for growth
        this.maxFrame = this.cropSprites[0].anims.getTotalFrames();
    }

    playGrowth() {

        console.log("started growing");

        //List of numbered references to possible cropSprites.
        this.cropsLeft = [];
        for (let i = 0; i < this.cropSprites.length; i++) {
            this.cropsLeft.push(i);
        }
        let self = this;

        //repeating function to grow crops individually
        this.tick = setInterval(function () { self.findCrop(); }, 100);
    }

    findCrop() {
        //progress tracking
        if (this.growthStep === this.cropSprites.length) {
            this.growthStep = 0;
            this.growthStage++;
            //console.log("Max " + this.cropsLeft.length);

            //send current state and time to database to save growthStage
        }
        if (this.growthStage >= this.maxFrame - 1) {
            //crops finished

            //todo: prompt to harvest
            clearInterval(this.tick);
            console.log("crops finished!");
            alert(`Crops finished growing in: ${this.id}`);
            return;
        }

        //check if any crops are left too far behind by the growthStage
        for (let j = 1; j <= this.cropsLeft.length; j++) {
            if (this.cropSprites[this.cropsLeft[j - 1]].anims.getFrameName() <= this.growthStage - 2) {
                this.growSelectedCrop(this.cropsLeft[j - 1], j - 1);
                return;
            }
        }

        //random number
        let rand = (Math.random() * this.cropsLeft.length) | 0;

        let upordown = (Math.random() * 2) | 0; // makes it seem more random when cycling through.
        //console.log(num);
        //crop selection logic
        for (let i = 0; i < this.cropsLeft.length; i++) {
            if (this.cropSprites[this.cropsLeft[rand]].anims.getFrameName() > this.growthStage + 1) {
                if (upordown) {
                    rand++;
                } else {
                    rand--;
                } //cycle through crops to find one to actually increment

                //reset random if out of range of list
                if (rand == this.cropsLeft.length) {
                    rand = 0;
                }
                else if (rand == 0) {
                    rand = this.cropsLeft.length - 1;
                }


            }
            else { this.growSelectedCrop(this.cropsLeft[rand], rand); break; } //viable crop found
        }
    }
    growSelectedCrop(num, rand) {
        //actually increment the frame of the crop
        if (this.cropsLeft.length != 0) { //here for safety's sake
            this.cropSprites[num].anims.nextFrame(1);
            if (this.cropSprites[num].anims.getFrameName() == this.maxFrame - 1) {
                this.cropsLeft.splice(rand, 1); // remove from list of crops to grow
                console.log("finished growing crop");
            }
            this.growthStep++;
        }
        else {
            //in the event of the crops somehow finishing early, it will still finish the counter
            this.growthStep++;
        }
    }

    pauseGrowth() {
        if (this.tick) {
            clearInterval(this.tick);
            console.log("Paused growing");
        }
    }

    harvest() {
        //todo: remove this once we 'lock' the plots when in pomodoro mode.
        if (this.tick) {
            clearInterval(this.tick);
        }
        //calculate coins
        switch (this.crop) {
            case "sunflower":
                this.scene.farm.coins += 100 * 1.2 * this.size * this.size; // i don' think we need to multiply by number of crops but anyway, this is better than a loop calculating
                // scene.coinsText.setText('Coins: ' + scene.farm.coins);
                break;
            case "carrot":
                this.scene.farm.coins += 100 * 1.5 * this.size * this.size;
                // scene.coinsText.setText('Coins: ' + scene.farm.coins);
                break;
        }
        //remove crops
        for (let cropSprite of this.cropSprites) {
            cropSprite.destroy();
        }
        this.crop = "nothing";
        this.growthStage = 0;
        this.cropSprites = [];

    }

}



class Furniture extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.texture);

        // Set the type of this furniture
        this.type = config.type;

        // Store a reference to the scene
        this.scene = config.scene;

        // Enable input for this object
        this.setInteractive({ draggable: true });

        // Add a hover effect to the furniture
        Utility.addTintOnHover(this);

        // Add this object to the scene
        this.scene.add.existing(this);

        // Add a pointerdown event listener
        this.on('pointerdown', this.handleClick, this);

        this.scene.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        this.scene.input.on('dragstart', function (pointer, gameObject) {
            // Bring the gameObject to the top of the display list
            this.children.bringToTop(gameObject);
        }, this.scene);

        if (this.type === "fireplace") {
            this.anims.play('fireplaceAnimation');
        }

    }

    handleClick() {
        if (this.type === "fireplace") {
            if (!this.scene.fireplaceTurnedOn) {
                this.anims.resume();
                this.scene.fireplaceTurnedOn = true
            }
            else {
                this.anims.pause();
                this.setTexture('fireplace');
                this.scene.fireplaceTurnedOn = false;
            }
        }

        else if (this.type === "lamp") {
            if (!this.scene.lampTurnedOn) {
                this.setTexture('lampOn');
                this.scene.lampTurnedOn = true;
            }
            else {
                this.setTexture('lamp');
                this.scene.lampTurnedOn = false;
            }
        }
    }
}
