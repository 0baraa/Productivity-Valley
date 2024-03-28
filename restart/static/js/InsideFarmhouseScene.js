import Utility from "./Utility.js";

export default class InsideFarmhouseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InsideFarmhouseScene'});
    }


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

        // this.add.image(400, 548, 'window');
        const windowSprite = this.add.sprite(400, 548, 'window').setInteractive();
        windowSprite.on('pointerdown', () => {
            this.scene.launch('ChartScene');
        });

        this.door = this.add.sprite(322, 573, 'door1');
        this.door.setScale(0.5);
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
        this.farm = FarmScene.farm;
        this.farm.createFurniture(this);


        //Swtich to farm scene when door is clicked
        this.door.on('pointerdown', () => {
            if(!Utility.isEditMode()) {
                this.scene.stop();
                //Re-enable input for farm scene
                this.scene.get('FarmScene').input.enabled = true;
            }
        });
}
}
