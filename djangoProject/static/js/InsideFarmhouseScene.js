import Utility from "./Utility.js";

export default class InsideFarmhouseScene extends Phaser.Scene { 
    constructor() {
        super({ key: 'InsideFarmhouseScene'});
    }


    // preload () {
    //     this.load.image('insideFarmhouseBackground', '../assets/farmhouse-background.png');
    //     this.load.image('door1', '../assets/house/doors/door1.png');
    //     this.load.image('wall1', '../assets/house/walls/wall1.png');
    //     this.load.image('floor1', '../assets/house/floors/floor1.png');
    //     this.load.image('window', '../assets/house/window.png');
    //
    //     this.load.image('bookshelf', '../assets/house/furniture/bookshelf.png');
    //     this.load.image('carpet1', '../assets/house/furniture/carpet1.png');
    //     this.load.image('chair', '../assets/house/furniture/chair.png');
    //     this.load.image('couch', '../assets/house/furniture/couch.png');
    //     this.load.image('fridge', '../assets/house/furniture/fridge.png');
    //     this.load.image('grandfatherClock', '../assets/house/furniture/grandfather-clock.png');
    //     this.load.image('kitchenSink', '../assets/house/furniture/kitchen-sink.png');
    //     this.load.image('lamp', '../assets/house/furniture/lamp.png');
    //     this.load.image('lampOn', '../assets/house/furniture/lamp-on.png');
    //     this.load.image('table', '../assets/house/furniture/table.png');
    //     this.load.image('bathtub', '../assets/house/furniture/bathtub.png');
    //     this.load.image('toilet', '../assets/house/furniture/toilet.png');
    //
    //     this.load.image('fireplace', '../assets/house/furniture/fireplace.png');
    //     this.load.spritesheet('fireplaceSpritesheet', '../assets/house/furniture/fireplace-animation.png', { frameWidth: 24, frameHeight: 78 });
    //
    // }

    preload() {
        const loadStatic = (key, file) => this.load.image(key, STATIC_URL + file);

        loadStatic('insideFarmhouseBackground', 'assets/farmhouse-background.png');
        loadStatic('door1', 'assets/house/doors/door1.png');
        loadStatic('wall1', 'assets/house/walls/wall1.png');
        loadStatic('floor1', 'assets/house/floors/floor1.png');
        loadStatic('window', 'assets/house/window.png');

        loadStatic('bookshelf', 'assets/house/furniture/bookshelf.png');
        loadStatic('carpet1', 'assets/house/furniture/carpet1.png');
        loadStatic('chair', 'assets/house/furniture/chair.png');
        loadStatic('couch', 'assets/house/furniture/couch.png');
        loadStatic('fridge', 'assets/house/furniture/fridge.png');
        loadStatic('grandfatherClock', 'assets/house/furniture/grandfather-clock.png');
        loadStatic('kitchenSink', 'assets/house/furniture/kitchen-sink.png');
        loadStatic('lamp', 'assets/house/furniture/lamp.png');
        loadStatic('lampOn', 'assets/house/furniture/lamp-on.png');
        loadStatic('table', 'assets/house/furniture/table.png');
        loadStatic('bathtub', 'assets/house/furniture/bathtub.png');
        loadStatic('toilet', 'assets/house/furniture/toilet.png');

        loadStatic('fireplace', 'assets/house/furniture/fireplace.png');
        this.load.spritesheet('fireplaceSpritesheet', STATIC_URL + 'assets/house/furniture/fireplace-animation.png', { frameWidth: 24, frameHeight: 78 });
    }



    create () {
        //Set camera zoom to 2x as canvas size of farmhouse interior is 320px wide, rather than 640px
        this.cameras.main.setZoom(2);
        
        this.lampTurnedOn = false;
        this.fireplaceTurnedOn = true;

        this.add.image(320, 600, 'insideFarmhouseBackground');

        this.add.image(320, 560, 'wall1');

        this.add.image(320, 634, 'floor1');

        this.add.image(240, 548, 'window');

        this.add.image(400, 548, 'window');
        // this.window = this.add.image(400, 548, 'window').setInteractive();
        // this.window.on('pointerdown', () => {
        //     this.scene.launch('ChartScene');
        // });

        this.door = this.add.sprite(320, 571, 'door1');
        this.door.setInteractive();
        Utility.addTintOnHover(this.door);


        // Create fireplace animation
        this.anims.create({
            key: 'fireplaceAnimation',
            frames: this.anims.generateFrameNumbers('fireplaceSpritesheet', { start: 0, end: 4 }),
            frameRate: 6,
            repeat: -1 // Repeat indefinitely


        });
        
        let FarmScene = this.scene.get('FarmScene');
        FarmScene.farm.createFurniture(this);











        //Swtich to farm scene when door is clicked
        this.door.on('pointerdown', () => {
            this.scene.stop();
            //Re-enable input for farm scene
            this.scene.get('FarmScene').input.enabled = true;
        });
    }
}






// Initial dragging code (must have setInteractive({draggable: true});)

// this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
//     gameObject.x = dragX;
//     gameObject.y = dragY;
// });

// let gameObjectOrder = [chair1, couch, table, object4];

// this.input.on('dragstart', function (pointer, gameObject) {
//     // Bring the gameObject to the top of the display list
//     this.children.bringToTop(gameObject);

//     // Remove the gameObject from the array
//     let index = gameObjectOrder.indexOf(gameObject);
//     if (index !== -1) {
//         gameObjectOrder.splice(index, 1);
//     }

//     // Add the gameObject back at the end of the array
//     gameObjectOrder.push(gameObject);
// }, this);