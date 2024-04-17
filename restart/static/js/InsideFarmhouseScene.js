import Utility from "./Utility.js";

export default class InsideFarmhouseScene extends Phaser.Scene {
    constructor() {
        super({ key: 'InsideFarmhouseScene'});
    }


    preload() {
        const loadStatic = (key, file) => this.load.image(key, STATIC_URL + file);

        // Credit to https://penzilla.itch.io/top-down-retro-interior for furniture assets

        loadStatic('insideFarmhouseBackground', 'assets/farmhouse-background.png');
        loadStatic('door1', 'assets/house/doors/house-door.png');
        loadStatic('wall1', 'assets/house/walls/wall1.png');
        loadStatic('floor1', 'assets/house/floors/floor1.png');
        loadStatic('window', 'assets/house/window.png');

        loadStatic('bookshelf', 'assets/house/furniture/bookshelf.png');
        loadStatic('carpet1', 'assets/house/furniture/carpet1.png');
        loadStatic('chair', 'assets/house/furniture/chair.png');
        loadStatic('couch', 'assets/house/furniture/couch.png');
        loadStatic('fridge', 'assets/house/furniture/fridge.png');
        loadStatic('grandfather-clock', 'assets/house/furniture/grandfather-clock.png');
        loadStatic('kitchen-sink', 'assets/house/furniture/kitchen-sink.png');
        loadStatic('lamp', 'assets/house/furniture/lamp.png');
        loadStatic('lamp-on', 'assets/house/furniture/lamp-on.png');
        loadStatic('table', 'assets/house/furniture/table.png');
        loadStatic('bathtub', 'assets/house/furniture/bathtub.png');
        loadStatic('toilet', 'assets/house/furniture/toilet.png');

        loadStatic('bookshelf2', 'assets/house/furniture/bookshelf2.png');
        loadStatic('coatrack', 'assets/house/furniture/coatrack.png');
        loadStatic('mirror', 'assets/house/furniture/mirror.png');
        loadStatic('cooker', 'assets/house/furniture/cooker.png');
        loadStatic('plant', 'assets/house/furniture/plant.png');
        loadStatic('roundtable', 'assets/house/furniture/roundtable.png');
        loadStatic('sink', 'assets/house/furniture/sink.png');
        loadStatic('smallbookshelf', 'assets/house/furniture/smallbookshelf.png');
        loadStatic('smallcouch', 'assets/house/furniture/smallcouch.png');
        loadStatic('table2', 'assets/house/furniture/table2.png');
        loadStatic('vinylplayer', 'assets/house/furniture/vinylplayer.png');



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

        this.door = this.add.sprite(322, 570, 'door1');
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

        //Swtich to farm scene when door is clicked
        this.door.on('pointerdown', () => {
            let farmScene = this.scene.get('FarmScene');
            this.toggleHideScene(farmScene);
            this.toggleHideSubtasks();
        });

        this.children.each(child => child.setVisible(false));
        this.hidden = true;
    }

    
    createFurniture(furniture) {
        this.furniture = []
        for(let i = 0; i < furniture.length; i++){
            let new_furniture = new Furniture({scene: this, 
                                           x: furniture[i].x, 
                                           y: furniture[i].y, 
                                           type: furniture[i].type, 
                                           texture: furniture[i].type,
                                           placed: furniture[i].placed});
            this.furniture.push(new_furniture);
        }
    }

    addFurnitureToInventory(farm, type) {
        let furniture = new Furniture({scene: this, x: 2000, y: 2000, type: type, texture: type, placed: false});
        this.furniture.push(furniture);
        farm.saveSingleFurniture(furniture);
    }

    toggleHideScene(farmScene) {
        if(!Utility.isEditMode()) {
            farmScene.input.enabled = !farmScene.input.enabled;
            if(this.hidden) {
                this.children.each(child => child.setVisible(true));
                this.toggleInverseColour("white");
                this.hidden = !this.hidden;
            }
            else {
                this.children.each(child => child.setVisible(false));
                this.toggleInverseColour("black");
                this.hidden = !this.hidden;
            }
        }
    }

    toggleHideSubtasks() {
        let subtasks = document.getElementById("wrapperContainer");
        let subtasksDiv = document.getElementById('subtasksDiv');

        // Try to find an input inside subtasksDiv
        let childInput = subtasksDiv.querySelector('input');

        // Check if a child input was found
        if (childInput !== null && !Utility.isEditMode()) {
            if(subtasks.style.display == "none") {
                subtasks.style.display = "block";
            }
            else {
                subtasks.style.display = "none";
            }
        }
    }

    toggleInverseColour(colour) {
        if(colour == "white") {
            let images = document.querySelectorAll("#edit-buttons-container .edit img, .top-left-container img, .coins-container p");
            for(let image of images) {
                image.classList.add("inverted-colour");
            }
        }
        else if(colour == "black") {
            let images = document.querySelectorAll("#edit-buttons-container .edit img, .top-left-container img, .coins-container p");
            for(let image of images) {
                image.classList.remove("inverted-colour");
            }
        }
    }
}



class Furniture extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.texture);

        // Set the type of this furniture
        this.type = config.type;

        // Store a reference to the scene
        this.scene = config.scene;

        if (this.scene.hidden) {
            this.setVisible(false)
        }

        // Whether or not the furniture is currently placed on the scene
        this.placed = config.placed;

        this.wasDeleted = false;

        // Enable input for this object
        this.setInteractive({ draggable: true });

        // Add a hover effect to the furniture
        Utility.addTintOnHover(this);
        this.setDepth(10);
        console.log(config.texture)

        // Add this object to the scene
        this.scene.add.existing(this);

        if(!this.placed) {
            this.setVisible(false); // make the sprite invisible
            this.setActive(false); // make the sprite inactive
            this.setPosition(2000, 2000); // move it off-screen
        }

        // Add a pointerdown event listener
        this.on('pointerdown', this.handleClick, this);

        this.scene.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            if(Utility.isEditMode()) {
                // Snap the furniture to a grid
                gameObject.x = Math.round(dragX / 4) * 4;
                gameObject.y = Math.round(dragY / 4) * 4;

                // Keep the furniture within the bounds of the room
                if(gameObject.x + gameObject.width / 2 > 464) {
                    gameObject.x = 464 - gameObject.width / 2;
                }
                if(gameObject.x - gameObject.width / 2 < 176) {
                    gameObject.x = 176 + gameObject.width / 2;
                }
                if(gameObject.y + gameObject.height / 2 > 674) {
                    gameObject.y = 674 - gameObject.height / 2;
                }
                if(gameObject.y - gameObject.height / 2 < 526) {
                    gameObject.y = 526 + gameObject.height / 2;
                }
            }


        });

        this.scene.input.on('dragstart', function (pointer, gameObject) {
            // Bring the gameObject to the top of the display list
            if(Utility.isEditMode()){
            this.children.bringToTop(gameObject);
            }
        }, this.scene);

        if (this.type === "fireplace") {
            this.anims.play('fireplaceAnimation');
        }

    }

    handleClick() {
        if (!Utility.isDeleteMode()) {
        if(this.type === "fireplace"){
            if(!this.scene.fireplaceTurnedOn) {
                this.anims.resume();
                this.scene.fireplaceTurnedOn = true
            }
            else {
                this.anims.pause();
                this.setTexture('fireplace');
                this.scene.fireplaceTurnedOn = false;
            }
        }

        else if(this.type === "lamp") {
            if(!this.scene.lampTurnedOn) {
                this.setTexture('lamp-on');
                this.scene.lampTurnedOn = true;
            }
            else {
                this.setTexture('lamp');
                this.scene.lampTurnedOn = false;
            }
        }
        }
        else{ 
            this.wasDeleted = true;
            this.setVisible(false); // make the sprite invisible
            this.setActive(false); // make the sprite inactive
            this.setPosition(2000, 2000); // move it off-screen
            this.placed = false;
        }
    }
}