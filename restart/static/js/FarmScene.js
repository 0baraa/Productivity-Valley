import Utility from "./Utility.js";
import AccessUserData from "./connection/AccessUserData.js";

export default class FarmScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FarmScene' });
    }


    // preload () {
    //     this.load.bitmapFont('pixelFont', '../fonts/pixeloperatorbitmap.png', '../fonts/pixeloperatorbitmap.xml');
    //
    //     this.load.image('farmBackground', '../assets/farm-background.png');
    //     // this.load.bitmapFont('pixelFont', STATIC_URL + 'fonts/pixeloperatorbitmap.png', STATIC_URL + 'fonts/pixeloperatorbitmap.xml');
    //     // this.load.image('farmBackground', STATIC_URL + 'assets/farm-background.png');
    //
    //     this.load.image('mountains', '../assets/mountains.png');
    //     this.load.image('fence', '../assets/fence.png');
    //     this.load.spritesheet('farmhouseSpritesheet', '../assets/farmhouse-animation.png', { frameWidth: 80, frameHeight: 128 });
    //     this.load.image('marketSign', '../assets/market-sign.png');
    //     this.load.image('sun', '../assets/sun.png');
    //     this.load.image('plot', '../assets/larger_plot.png');
    //
    //     this.load.image('cloud1', '../assets/clouds/cloud1.png');
    //     this.load.image('cloud2', '../assets/clouds/cloud2.png');
    //     this.load.image('cloud3', '../assets/clouds/cloud3.png');
    //     this.load.image('cloud4', '../assets/clouds/cloud4.png');
    //     this.load.image('cloud5', '../assets/clouds/cloud5.png');
    //     this.load.image('cloud6', '../assets/clouds/cloud6.png');
    //
    //     this.load.spritesheet("carrotGrowth", "../assets/crops/carrot-growth-AS.png", {frameWidth: 20, frameHeight: 30});
    //     this.load.spritesheet("sunflowerGrowth", "../assets/crops/sunflower-growth-AS.png", {frameWidth: 19, frameHeight: 41});
    //
    // }

    preload() {
        // 辅助函数，自动添加 STATIC_URL 前缀
        this.gatherData();
        const loadStatic = (key, file) => this.load.image(key, STATIC_URL + file);

        // 对于特殊资源类型，如 bitmapFont 或 spritesheet，可以创建专门的辅助函数或直接使用 STATIC_URL
        const loadBitmapFont = (key, textureUrl, xmlUrl) => this.load.bitmapFont(key, STATIC_URL + textureUrl, STATIC_URL + xmlUrl);
        const loadSpritesheet = (key, file, frameConfig) => this.load.spritesheet(key, STATIC_URL + file, frameConfig);

        // 使用辅助函数加载资源
        loadBitmapFont('pixelFont', 'fonts/pixeloperatorbitmap.png', 'fonts/pixeloperatorbitmap.xml');
        loadStatic('farmBackground', 'assets/farm-background.png');
        loadStatic('sky', 'assets/sky.png');
        loadStatic('farmground', 'assets/farmground.png');
        loadStatic('mountains', 'assets/mountains.png');
        loadStatic('fence', 'assets/fence.png');
        loadStatic('level1farmhouse', 'assets/house/level1farmhouse.png');
        loadStatic('level2farmhouse', 'assets/house/level2farmhouse.png');
        loadSpritesheet('level2farmhousespritesheet', 'assets/house/level2farmhouseanimation.png', { frameWidth: 80, frameHeight: 128 });
        
        loadStatic('marketSign', 'assets/market-sign.png');
        // loadStatic('sun', 'assets/sun.png');
        loadStatic('sun-flares', 'assets/sun-flares.png');
        loadStatic('plot', 'assets/larger_plot.png');
        loadStatic('plotSelect', 'assets/plot_select.png');

        loadStatic('snowman', 'assets/decorations/snowman.png');
        loadStatic('gnome', 'assets/decorations/gnome.png');
        loadStatic('autumn-tree', 'assets/decorations/autumn-tree.png');
        loadStatic('dirt-rock', 'assets/decorations/dirt-rock.png');
        loadStatic('dirt-rocks', 'assets/decorations/dirt-rocks.png');
        loadStatic('ice-rock', 'assets/decorations/ice-rock.png');
        loadStatic('icy-rocks', 'assets/decorations/icy-rocks.png');
        loadStatic('leafy-rock', 'assets/decorations/leafy-rock.png');
        loadStatic('leafy-rocks', 'assets/decorations/leafy-rocks.png');
        loadStatic('palm-tree', 'assets/decorations/palm-tree.png');
        loadStatic('pine-tree', 'assets/decorations/pine-tree.png');
        loadStatic('red-sandstone-rock', 'assets/decorations/red-sandstone-rock.png');
        loadStatic('red-sandstone-rocks', 'assets/decorations/red-sandstone-rocks.png');
        loadStatic('sandstone-rock', 'assets/decorations/sandstone-rock.png');
        loadStatic('sandstone-rocks', 'assets/decorations/sandstone-rocks.png');
        loadStatic('snowy-rock', 'assets/decorations/snowy-rock.png');
        loadStatic('snowy-rocks', 'assets/decorations/snowy-rocks.png');
        loadStatic('stump', 'assets/decorations/stump.png');
        loadStatic('scarecrow2', 'assets/decorations/scarecrow2.png');


        loadStatic('cloud1', 'assets/clouds/cloud1.png');
        loadStatic('cloud2', 'assets/clouds/cloud2.png');
        loadStatic('cloud3', 'assets/clouds/cloud3.png');
        loadStatic('cloud4', 'assets/clouds/cloud4.png');
        loadStatic('cloud5', 'assets/clouds/cloud5.png');
        loadStatic('cloud6', 'assets/clouds/cloud6.png');

        loadSpritesheet("butterfly1AS", "assets/animals/butterfly2-as.png", {frameWidth: 16, frameHeight:16 });
        
        loadSpritesheet("carrotGrowth", "assets/crops/carrot-growth-AS.png", {frameWidth: 20, frameHeight: 28});
        loadSpritesheet("sunflowerGrowth", "assets/crops/sunflower-growth-AS.png", {frameWidth: 19, frameHeight: 41});
        loadSpritesheet("pumpkinGrowth", "assets/crops/pumpkin-growth-AS.png", {frameWidth: 33, frameHeight: 39 });
        loadSpritesheet("tulipGrowth", "assets/crops/tulip-growth-AS.png", {frameWidth: 10, frameHeight: 22 });

        loadStatic('play-button', 'assets/clock/play-button.png');
        loadStatic('pause-button', 'assets/clock/pause-button.png');
        loadStatic('skip-button', 'assets/clock/skip-button.png');
    }



    
    create() {
        // this.add.image(320, 550, 'farmBackground').setDepth(-2);
        this.add.image(320, 550, 'sky').setDepth(-5);

        this.add.image(570, 460, 'mountains-large').setScale(2).setAlpha(0);
        this.add.image(320, 520, 'mountains').setDepth(-1);

        // this.sun = this.add.sprite(320, 455, 'sun').setDepth(-1);
        // this.sun.setInteractive();
        // Utility.addTintOnHover(this.sun);

        this.clouds = [];
        this.cloudImages = ['cloud1', 'cloud2', 'cloud3', 'cloud4', 'cloud5', 'cloud6'];
        

         // Calculate the dimensions of the screen for better positioning
         const screenWidth = this.sys.game.config.width;
         const screenHeight = this.sys.game.config.height;
         
         const pomodoroY = screenHeight * 0.2045;
         this.sunFlares = this.add.sprite(320, pomodoroY+245, 'sun-flares').setDepth(-4);
         this.pomodoro = new Pomodoro(this, 160, pomodoroY, 75).setDepth(-2);

        // Launch the FarmhouseScene (which is hidden at first)
        

        //Generate initial cloud
        generateCloud(this);
        

        //Generate a new cloud every 5 seconds
        this.time.addEvent({
            delay: 8000,
            callback: () => generateCloud(this),
            loop: true
        });

        this.add.image(320, 600, 'farmground');
        this.add.image(320, 550, 'fence');


        this.butterflies = [];
        this.anims.create({
            key: "butterfly1Anim",
            frames: this.anims.generateFrameNumbers("butterfly1AS", {start: 0, end: 3}),
            frameRate: 20,
            yoyo: true
        });

        //needs to be replaced with a setinterval function with random delay. (also to be only activated when flowers are growing)
        this.time.addEvent({
            delay: 10000,
            callback: () => generateButterfly(this),
            loop: true
        });
        
        //animation driver 20 fps
        this.skip = 0; // skip frames for 10fps or 5fps or 4fps or 8.333 fps
        this.time.addEvent({
            delay: 50,
            callback: () => this.updateAnimations(),
            loop: true
        });

        
        this.anims.create({
            key: 'level2farmhouseAnimation',
            frames: this.anims.generateFrameNumbers('level2farmhousespritesheet', { start: 0, end: 4 }),
            frameRate: 6,
            repeat: -1 // Repeat indefinitely
        });

        //Create crop animations.
        this.anims.create({
            key: 'carrotAnim',
            frames: this.anims.generateFrameNumbers("carrotGrowth", { start: 0, end: 10 }),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: 'sunflowerAnim',
            frames: this.anims.generateFrameNumbers("sunflowerGrowth", { start: 0, end: 10 }),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: "pumpkinAnim",
            frames: this.anims.generateFrameNumbers("pumpkinGrowth", {start: 0, end: 10}),
            frameRate: 1,
            repeat: 0
        });
        this.anims.create({
            key: "tulipAnim",
            frames: this.anims.generateFrameNumbers("tulipGrowth", {start: 0, end: 15}),
            frameRate: 1,
            repeat: 0
        });
        
        
        
        //set market sign to be one more than the crops.
        this.marketSign = this.add.image(600, 560, 'marketSign');
        this.marketSign.setInteractive();
        Utility.addTintOnHover(this.marketSign);
        this.marketSign.on('pointerdown', () => {
            // Disable input for FarmScene
            if(!Utility.isEditMode()) {
                this.input.enabled = false;
                this.scene.get('InsideFarmhouseScene').toggleHideSubtasks();
                this.scene.launch('MarketScene');
            }
        });
        
        
        let homeButton = document.getElementById("home-icon-container");
        homeButton.addEventListener('click', () => {
            Utility.toggleMenu(this, "homeMenu");
        });
        let homeExitButton = document.getElementById("home-exit-button");
        homeExitButton.addEventListener('click', () => {
            Utility.toggleMenu(this, "homeMenu");
        });

        let settingsButton = document.getElementById("settings-icon-container");
        settingsButton.addEventListener('click', () => {
            Utility.toggleMenu(this, "settingsMenu");
            let settingsForm = document.getElementById('settings-form');
            let settingsExitButton = document.getElementById('settings-exit-button');
            let settingsInfoButton = document.getElementById('settings-info-button');

            const showInfo = (event) => {
                Utility.showInfo(this, "settingsInfo");
            };
            const settingsClose = (event) => {
                settingsForm.removeEventListener('submit', settingsClose);
                settingsExitButton.removeEventListener('click', settingsClose);
                //showInfo needs to be added to Utility.js
                Utility.toggleMenu(this, "settingsMenu");
                if (event.type == "submit") {
                    event.preventDefault();
                    //Utility.sendSettingsData();
                    //update pomodoro timer settings;
                    this.pomodoro.updateTimeSettings();


                    
                    let fontStyle = document.getElementById("fontStyle").value;
                    let elements = document.querySelectorAll('button, input, select');

                    if (fontStyle == "standard") {
                        document.body.style.fontFamily = "Helvetica, sans-serif";
                        for (let i = 0; i < elements.length; i++) {
                            elements[i].style.fontFamily = "Helvetica, sans-serif";
                        }
                        
                    } else if (fontStyle == "pixel") {
                        document.body.style.fontFamily = "pixel-font, Helvetica, sans-serif";
                        for (let i = 0; i < elements.length; i++) {
                            elements[i].style.fontFamily = "pixel-font, Helvetica, sans-serif";
                        }
                    }
                    else {
                        document.body.style.fontFamily = "open-dyslexic, Helvetica, sans-serif";
                        for (let i = 0; i < elements.length; i++) {
                            elements[i].style.fontFamily = "open-dyslexic, Helvetica, sans-serif";
                        }
                    }

                    let fontSize = document.getElementById("fontSize").value;
                    if(fontSize == "large") {
                        document.documentElement.style.setProperty('--scale-factor', '1.3');
                    }
                    else {
                        document.documentElement.style.setProperty('--scale-factor', '1');
                    }

                }
            }
            settingsExitButton.addEventListener('click', settingsClose);
            settingsForm.addEventListener('submit', settingsClose);
        });
        
        //white square around plot that will move to selected plot
        this.selector = new Selector({scene: this, x: -300, y: -100, sprite: "plotSelect"});
        this.selector.setVisible(false);

        this.scene.launch('InsideFarmhouseScene');
        //get scene
        this.insideFarmhouseScene = this.scene.get('InsideFarmhouseScene');
        // wait for scene to load then close it
        this.insideFarmhouseScene.load.on('complete', () => {
            this.farmReady = true;
        });

        let editButton = document.getElementById('edit-button');
        let tickButton = document.getElementById('tick-button');
        let plusButton = document.getElementById('plus-button');
        let trashButton = document.getElementById('trash-button');
        let crossButton = document.getElementById('cross-button');

        editButton.addEventListener('click', () => {


            Utility.toggleEditMode();
            editButton.style.display = 'none';
            tickButton.style.display = 'inline';
            plusButton.style.display = 'inline';
            trashButton.style.display = 'inline';
            crossButton.style.display = 'inline';

            this.selector.setVisible(false);


            // Save initial positions of objects so they can be reset if the user cancels the edit

            // If we are in InsideFarmhouseScene
            if(!this.input.enabled) {
                this.originalFurniture = this.insideFarmhouseScene.furniture.map(furniture => ({...furniture}));
            }
            // If we are in FarmScene
            else {
                this.originalPlots = this.farm.plots.map(plot => ({...plot}));
                this.originalDecorations = this.farm.decorations.map(decoration => ({...decoration}));
                this.originalFarmhouse = {...this.farm.farmhouse};
            }
        });

        crossButton.addEventListener('click', () => {
            if(Utility.isDeleteMode()){
                Utility.toggleDeleteMode();
            }
            Utility.toggleEditMode();
            tickButton.style.display = 'none';
            plusButton.style.display = 'none';
            trashButton.style.display = 'none';
            crossButton.style.display = 'none';
            editButton.style.display = 'inline';
            

            // Reset the positions of the objects
            if(!this.input.enabled) {
                for (let i = 0; i < this.insideFarmhouseScene.furniture.length; i++) {
                    this.insideFarmhouseScene.furniture[i].x = this.originalFurniture[i].x;
                    this.insideFarmhouseScene.furniture[i].y = this.originalFurniture[i].y;
                    // If the furniture was deleted, place it back
                    if(this.insideFarmhouseScene.furniture[i].wasDeleted == true) {
                        this.insideFarmhouseScene.furniture[i].setVisible(true);
                        this.insideFarmhouseScene.furniture[i].setActive(true);
                        this.insideFarmhouseScene.furniture[i].placed = true;
                    }
                }
            }
            // If we are in FarmScene
            else {
                for (let i = 0; i < this.farm.plots.length; i++) {
                    this.farm.plots[i].x = this.originalPlots[i].x;
                    this.farm.plots[i].y = this.originalPlots[i].y;
                    // If the plot was deleted, place it back
                    if(this.farm.plots[i].wasDeleted == true) {
                        this.farm.plots[i].setVisible(true);
                        this.farm.plots[i].setActive(true);
                        this.farm.plots[i].placed = true;
                    }
                    this.farm.plots[i].wasDeleted = false;
                }

                for (let i = 0; i < this.farm.decorations.length; i++) {
                    this.farm.decorations[i].x = this.originalDecorations[i].x;
                    this.farm.decorations[i].y = this.originalDecorations[i].y;
                    // If the decoration was deleted, place it back
                    if(this.farm.decorations[i].wasDeleted == true) {
                        this.farm.decorations[i].setVisible(true);
                        this.farm.decorations[i].setActive(true);
                        this.farm.decorations[i].placed = true;
                    }
                    this.farm.decorations[i].wasDeleted = false;
                }

                this.farm.farmhouse.x = this.originalFarmhouse.x;
                this.farm.farmhouse.y = this.originalFarmhouse.y;
                this.updateSelector();
                this.selector.setVisible(true);
            }
        });

        trashButton.addEventListener('click', () => {
            Utility.toggleDeleteMode();
        
        });

        plusButton.addEventListener('click', () => {
            if(Utility.isDeleteMode()){
                Utility.toggleDeleteMode();
            }
            if(!this.input.enabled) {
                
                let furnitureContainer = document.getElementById('furniture-container');

                for(let furniture of this.insideFarmhouseScene.furniture){
                    if(furniture.placed == false) {
                        let furnitureDiv = document.createElement('div');
                        furnitureDiv.style.width = '12vw';
                        furnitureDiv.style.height = '12vw';
                        furnitureDiv.style.display = 'flex';
                        furnitureDiv.style.flexDirection = 'column';
                        furnitureDiv.style.justifyContent = 'center';
                        furnitureDiv.style.marginBottom = '1vh';

                        let furnitureImg = document.createElement('img');
                        furnitureImg.style.width = '100%';
                        furnitureImg.style.height = 'calc(100% - 4vw)';
                        furnitureImg.style.objectFit = 'contain';
                        furnitureImg.src = '/static/assets/house/furniture/' + furniture.type + '.png';

                        let buttonDiv = document.createElement('div');
                        buttonDiv.style.display = 'flex';
                        buttonDiv.style.justifyContent = 'center';

                        let furnitureButton = document.createElement('button');
                        furnitureButton.classList.add('furniture-button');
                        furnitureButton.id = furniture.type + '-button';
                        furnitureButton.textContent = '+';

                        buttonDiv.appendChild(furnitureButton);
                        furnitureDiv.appendChild(furnitureImg);
                        furnitureDiv.appendChild(buttonDiv);
                        furnitureContainer.appendChild(furnitureDiv);
                    }
                }

                for(let furniture of this.insideFarmhouseScene.furniture){
                    let furnitureButton = document.getElementById(furniture.type + '-button');
                    if(furnitureButton){
                        furnitureButton.onclick = () => {
                            furniture.placed = true;
                            furniture.setVisible(true);
                            furniture.setActive(true);  
                            furniture.x = 320;
                            furniture.y = 620;
                            this.scene.get('InsideFarmhouseScene').children.bringToTop(furniture);
                            // Clear the furniture container
                            let furnitureContainer = document.getElementById('furniture-container');
                            while (furnitureContainer.firstChild) {
                                furnitureContainer.removeChild(furnitureContainer.firstChild);
                            }
                            Utility.toggleMenu(this.insideFarmhouseScene, "furnitureMenu");
                        };
                    }
                }

                Utility.toggleMenu(this.insideFarmhouseScene, "furnitureMenu");
            }

            // If we are in FarmScene
            else {
                let plotContainer = document.getElementById('plot-container');

                for(let plot of this.farm.plots){
                    if(plot.placed == false) {
                        let plotDiv = document.createElement('div');
                        plotDiv.style.width = '12vw';
                        plotDiv.style.height = '12vw';
                        plotDiv.style.display = 'flex';
                        plotDiv.style.flexDirection = 'column';
                        plotDiv.style.justifyContent = 'center';
                        plotDiv.style.marginBottom = '1vh';

                        let plotImg = document.createElement('img');
                        plotImg.style.width = '100%';
                        plotImg.style.height = 'calc(100% - 4vw)';
                        plotImg.style.objectFit = 'contain';
                        plotImg.src = '/static/assets/larger_plot.png';

                        let buttonDiv = document.createElement('div');
                        buttonDiv.style.display = 'flex';
                        buttonDiv.style.justifyContent = 'center';

                        let plotButton = document.createElement('button');
                        plotButton.classList.add('furniture-button');
                        plotButton.id = plot.plotId + '-button';
                        plotButton.textContent = '+';

                        buttonDiv.appendChild(plotButton);
                        plotDiv.appendChild(plotImg);
                        plotDiv.appendChild(buttonDiv);
                        plotContainer.appendChild(plotDiv);
                    }
                }

                for(let plot of this.farm.plots){
                    let plotButton = document.getElementById(plot.plotId + '-button');
                    if(plotButton){
                        plotButton.onclick = () => {
                            plot.placed = true;
                            plot.setVisible(true);
                            plot.setActive(true);  
                            plot.x = 320;
                            plot.y = 620;
                            // Clear the decorations and plot containers
                            let decorationContainer = document.getElementById('decoration-container');
                            while (decorationContainer.firstChild) {
                                decorationContainer.removeChild(decorationContainer.firstChild);
                            }
                            let plotContainer = document.getElementById('plot-container');
                            while (plotContainer.firstChild) {
                                plotContainer.removeChild(plotContainer.firstChild);
                            }
                            Utility.toggleMenu(this, "decorationPlotMenu");
                        };
                    }
                }

                let decorationContainer = document.getElementById('decoration-container');

                for(let decoration of this.farm.decorations){
                    if(decoration.placed == false) {
                        let decorationDiv = document.createElement('div');
                        decorationDiv.style.width = '12vw';
                        decorationDiv.style.height = '12vw';
                        decorationDiv.style.display = 'flex';
                        decorationDiv.style.flexDirection = 'column';
                        decorationDiv.style.justifyContent = 'center';
                        decorationDiv.style.marginBottom = '1vh';

                        let decorationImg = document.createElement('img');
                        decorationImg.style.width = '100%';
                        decorationImg.style.height = 'calc(100% - 4vw)';
                        decorationImg.style.objectFit = 'contain';
                        decorationImg.src = '/static/assets/decorations/' + decoration.type + '.png';

                        let buttonDiv = document.createElement('div');
                        buttonDiv.style.display = 'flex';
                        buttonDiv.style.justifyContent = 'center';
                        
                        let decorationButton = document.createElement('button');
                        decorationButton.classList.add('furniture-button');
                        decorationButton.id = decoration.type + '-button';
                        decorationButton.textContent = '+';

                        buttonDiv.appendChild(decorationButton);
                        decorationDiv.appendChild(decorationImg);
                        decorationDiv.appendChild(buttonDiv);
                        decorationContainer.appendChild(decorationDiv);
                    }
                }
                for(let decoration of this.farm.decorations){
                    let decorationButton = document.getElementById(decoration.type + '-button');
                    if(decorationButton){
                        decorationButton.onclick = () => {
                            decoration.placed = true;
                            decoration.setVisible(true);
                            decoration.setActive(true);
                            decoration.x = 320;
                            decoration.y = 620;
                            // Clear the decorations and plot containers
                            let decorationContainer = document.getElementById('decoration-container');
                            while (decorationContainer.firstChild) {
                                decorationContainer.removeChild(decorationContainer.firstChild);
                            }
                            let plotContainer = document.getElementById('plot-container');
                            while (plotContainer.firstChild) {
                                plotContainer.removeChild(plotContainer.firstChild);
                            }
                            Utility.toggleMenu(this, "decorationPlotMenu");
                        };
                    }

                }
                Utility.toggleMenu(this, "decorationPlotMenu");
            }
        });

        tickButton.addEventListener('click', () => {
            if(Utility.isDeleteMode()){
                Utility.toggleDeleteMode();
            }
            Utility.toggleEditMode();
            tickButton.style.display = 'none';
            plusButton.style.display = 'none';
            trashButton.style.display = 'none';
            crossButton.style.display = 'none';
            editButton.style.display = 'inline';
            this.updateSelector();
            this.selector.setVisible(true);
            
            if(!this.input.enabled) {
                for(let furniture of this.insideFarmhouseScene.furniture){
                    furniture.wasDeleted = false;
                }
                this.farm.saveFurniture()
            }
            else {
                for(let plot of this.farm.plots){
                    plot.wasDeleted = false;
                }
                this.farm.saveDecorations()
                this.farm.saveAllPlots()
                this.farm.saveHouseState()
            }
            

            this.farm.farmhouse.wasDeleted = false;

            // Save the furniture state to the database
        });

        let furnitureExitButton = document.getElementById('furniture-exit-button');
        furnitureExitButton.addEventListener('click', () => {
            // Clear the furniture container
            let furnitureContainer = document.getElementById('furniture-container');
            while (furnitureContainer.firstChild) {
                furnitureContainer.removeChild(furnitureContainer.firstChild);
            }
            Utility.toggleMenu(this.scene.get('InsideFarmhouseScene'), "furnitureMenu");
        });

        let houseUpgradeExitButton = document.getElementById('house-upgrade-exit-button');
        houseUpgradeExitButton.addEventListener('click', () => {
            Utility.toggleMenu(this, "upgradeHouseMenu");
        });

        let houseUpgradeButton = document.getElementById('house-upgrade-button');
        houseUpgradeButton.addEventListener('click', () => {
            if(this.farm.getCoins() >= 1000) {
                // Update in database
                this.farm.updateCoins(-1000);
                this.farm.farmhouse.upgrade();
                Utility.toggleMenu(this, "upgradeHouseMenu");
            }
        });
        

        let decorationPlotExitButton = document.getElementById('decoration-plot-exit-button');
        decorationPlotExitButton.addEventListener('click', () => {
            // Clear the decoration and plot containers
            let decorationContainer = document.getElementById('decoration-container');
            while (decorationContainer.firstChild) {
                decorationContainer.removeChild(decorationContainer.firstChild);
            }
            let plotContainer = document.getElementById('plot-container');
            while (plotContainer.firstChild) {
                plotContainer.removeChild(plotContainer.firstChild);
            }
            Utility.toggleMenu(this, "decorationPlotMenu");
        });

        // Dragging code (set draggable to true in setInteractive to enable dragging)
        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
            if(Utility.isEditMode()){
                if(gameObject instanceof Plot) {
                    gameObject.x = Math.round(dragX / 8) * 8;
                    gameObject.y = Math.round(dragY / 8) * 8;

                    // Keep the plots within the bounds of the farm

                    if(gameObject.x + 42 + gameObject.width / 2 > 640) {
                        gameObject.x = 592;
                    }
                    
                    if(gameObject.x - 42 - gameObject.width / 2 < 0) {
                        gameObject.x = 48;
                    }
                    if(gameObject.y + gameObject.height / 2 > 710) {
                        gameObject.y = Math.round(710 / 8) * 8 - gameObject.height / 2;
                    }
                    if(gameObject.y - gameObject.height / 2 < 605) {
                        gameObject.y = Math.round(605 / 8) * 8 + gameObject.height / 2;
                    }
                    gameObject.setDepth(gameObject.y);
                }

                else if (gameObject instanceof Decoration) {
                    gameObject.x = Math.round(dragX / 8) * 8;
                    gameObject.y = Math.round(dragY / 8) * 8;

                    if(gameObject.x - gameObject.width / 2 < 0) {
                        gameObject.x = gameObject.width / 2;
                    }

                    if(gameObject.x + gameObject.width / 2 > 640) {
                        gameObject.x = 640 - gameObject.width / 2;
                    }

                    if(gameObject.y + gameObject.height / 2 > 758) {
                        gameObject.y = 758 - gameObject.height / 2;
                    }

                    if(gameObject.y - gameObject.height / 2 < 530) {
                        gameObject.y = 530 + gameObject.height / 2;
                    }
                    
                    gameObject.setDepth(gameObject.y);
                }

                else if (gameObject instanceof Farmhouse) {
                    gameObject.x = Math.round(dragX / 8) * 8;
                    gameObject.y = Math.round(dragY / 8) * 8;

                    if(gameObject.x - gameObject.width / 2 < 0) {
                        gameObject.x = gameObject.width / 2;
                    }

                    if(gameObject.x + gameObject.width / 2 > 640) {
                        gameObject.x = 640 - gameObject.width / 2;
                    }

                    if(gameObject.y + gameObject.height / 2 > 758) {
                        gameObject.y = 758 - gameObject.height / 2;
                    }

                    if(gameObject.level == 2) {
                        if(gameObject.y - gameObject.height / 2 < 490) {
                            gameObject.y = 490 + gameObject.height / 2;
                        }
                    }
                    else {
                        if(gameObject.y - gameObject.height / 2 < 515) {
                            gameObject.y = 515 + gameObject.height / 2;
                        }
                    }

                    gameObject.setDepth(gameObject.y);
                }
            }
        });

        let furnitureShopExitButton = document.getElementById('furniture-shop-exit-button');
        let furnitureShopContainer = document.getElementById('furniture-shop-container');
        
        furnitureShopExitButton.addEventListener('click', () => {
            while (furnitureShopContainer.firstChild) {
                furnitureShopContainer.removeChild(furnitureShopContainer.firstChild);
            }
            Utility.toggleMenu(this.scene.get('MarketScene'), "furnitureShopMenu");
        });

        let decorationShopExitButton = document.getElementById('decoration-shop-exit-button');
        let decorationShopContainer = document.getElementById('decoration-shop-container');

        decorationShopExitButton.addEventListener('click', () => {
            while (decorationShopContainer.firstChild) {
                decorationShopContainer.removeChild(decorationShopContainer.firstChild);
            }
            Utility.toggleMenu(this.scene.get('MarketScene'), "decorationShopMenu");
        });

        let plotShopExitButton = document.getElementById('plots-shop-exit-button');
        let plotShopContainer = document.getElementById('plots-shop-container');

        plotShopExitButton.addEventListener('click', () => {
            while (plotShopContainer.firstChild) {
                plotShopContainer.removeChild(plotShopContainer.firstChild);
            }
            Utility.toggleMenu(this.scene.get('MarketScene'), "plotShopMenu");
        });

        
        // Get the InsideFarmhouseScene instance
        

        

        this.events.on('pomodoroStarted', this.playPlot, this);
        this.events.on('pomodoroResumed', this.playPlot, this);
        this.events.on('pomodoroPaused', this.pausePlot, this);
        this.events.on('pomodoroSkipped', this.pausePlot, this);
        this.events.on('pomodoroFinished', this.incrementPomodoroCount), this;
        this.events.on('taskCompleted', this.completePlot, this);

        this.events.on('harvestCrops', this.harvestPlot, this);
        this.events.on('creatingTask', this.createTaskMenu, this);
        this.events.on('editingTask', this.editTaskMenu, this);
    }


    async gatherData() {
        AccessUserData.getAllUserData(currentUsername)
            .then((result) => {
                console.log("recieved data")
                this.sendData(result);
            })
            .catch((error) =>
                console.error("could not resolve UserData:", error)
            )
    }

    sendData(dataConfig) {
        this.farm = new PlayerFarm(this, dataConfig);
        this.insideFarmhouseScene.setFurnitureData(dataConfig.furniture)
    } 

    updateSelector() {
        //makes the selector jump to the plot if its moved in edit mode
        console.log(this.selector.plotSelected);
        if (this.selector.plotSelected != null) {
            this.selector.x = this.farm.plots[this.selector.plotSelected].x;
            this.selector.y = this.farm.plots[this.selector.plotSelected].y;
        }
    }

    updateAnimations() {
        for (let i = 0; i < this.butterflies.length; i++) {
            this.butterflies[i].updateY();
        }
        if (this.skip == 2) {
            this.skip = 0;
            for (let j = 0; j < this.clouds.length; j++) {
                this.clouds[j].moveX();
            }
            
            if (Utility.getWorkingState()){
                this.sunFlares.angle ++;
            }
        }
        this.skip++;
        
    }

    incrementPomodoroCount() {
        this.farm.tasks[this.farm.findSelectedTaskIndex()].pomodorosCompleted ++;
        
    }

    playPlot() {
        this.farm.plots[this.selector.plotSelected].playGrowth()
    }

    pausePlot() {
        this.farm.plots[this.selector.plotSelected].pauseGrowth();
    }

    completePlot() {
        this.farm.plots[this.selector.plotSelected].finishCrops();
        this.farm.tasks[this.selector.plotSelected].completed = true;
    }

    harvestPlot() {
        this.farm.plots[this.selector.plotSelected].harvest();
        this.farm.tasks[this.selector.plotSelected].reset();
        this.farm.savePlot(this.selector.plotSelected)
        this.farm.saveTask(this.farm.tasks[this.selector.plotSelected])
    }

    editTaskMenu() {
        this.openTaskMenu(true);
    }

    createTaskMenu() {
        this.openTaskMenu(false);
    }

    openAlertWindow(prompt, note) {
        Utility.toggleMenu(this, "alertWindow");
        document.getElementById("alertWindow-message").innerText = prompt;
        document.getElementById("alertWindow-note").innerText = note;
        let okButton = document.getElementById("okButton");
        const close = () => {
            okButton.removeEventListener('click', close);
            Utility.toggleMenu(this, "alertWindow");
        }
        okButton.addEventListener("click", close);
    }

    openTaskMenu(editing) {
        if (!editing) {
            Utility.setPlotReady(false)
            let cropChoice = document.getElementById("cropChoice");
            let seedsOwned = this.farm.getOwnedSeeds();
            let taskable = false;
            let neverBought = true;

            for (let i = 0; i < 5; i++) {
                let count = seedsOwned[cropChoice.options[i].value.toString()]
                if (count > 0) {
                    cropChoice.options[i].style.display = "display";
                    taskable = true;
                    neverBought = false;
                    cropChoice.value = cropChoice.options[i].value
                } else if (count == 0) {
                    neverBought = false;
                    cropChoice.options[i].style.display = "none";
                } else {cropChoice.options[i].style.display = "none";}
            }
            let price = 50
            if (neverBought) {
                price = 150
            }
            if (!taskable && this.farm.coins >= price) {
                this.openAlertWindow("You have no seeds!", "You can buy some from the Market.")
                return;
            } else if (!taskable) {
                console.log("for some reason not taskable")
                this.openAlertWindow("You have no seeds!", "But we're very generous and have given you some sunflower seeds. Use it well");
                this.farm.addSeedToInventory("carrot");
                return;
            }
        }

        Utility.toggleMenu(this, "taskMenu");
        let form = document.getElementById("task-form");
        let taskExitButton = document.getElementById('task-exit-button');
        let subtasksCheck = document.getElementById("subtasks-query");
        
        const showHideSubtasks = () => {
            let subtasksRows = document.getElementsByClassName("subtask-row");
            for (let i = 0; i < subtasksRows.length; i++) {
                if(subtasksCheck.checked) {subtasksRows[i].style.display = "block";} 
                else {subtasksRows[i].style.display = "none";}
            }
        }
        const addSubtask = () => {
            let filled = true;
            let subtasks = document.getElementsByClassName("subtask");
            for (let i = 0; i < subtasks.length; i++) {
                if (subtasks[i].value == "") {
                    filled = false;
                }
            }
            if (filled && subtasks.length < 10) {
                let table = document.getElementById("task-menu-table");
                let row = table.insertRow(table.rows.length - 2);
                row.setAttribute("class","subtask-row");
                let cell = row.insertCell(0);
                cell.innerHTML = '<label for="subtask'+(subtasks.length)+'"> - </label><input type ="text" class="subtask editable" name="subtask" maxlength="64" id= "subtask'+(subtasks.length)+'"></input>';
            }
        }
        
        let harvestButton = document.getElementById("harvest-task");
        let saveButton = document.getElementById('create-task');
        let editable = document.getElementsByClassName('editable');
        let rowsToHide = document.getElementsByClassName("uneditable");
        let harvestCoinsText = document.getElementById("harvest-coins-text");
        let harvestCoinsImage = document.getElementById("harvest-coins-image");

       
        let taskTitle = document.getElementById('task-title');
        if (editing) {
            for (let i = 0; i < rowsToHide.length; i++) {
                rowsToHide[i].style.display = "none";
            }
            saveButton.innerHTML = "Save";
            harvestButton.style.display = "block";
            taskTitle.innerHTML = "Edit Task"
            let task = this.farm.tasks[this.selector.plotSelected];
            if (task.completed) {
                harvestButton.style.backgroundColor = "#72d242";
            }

            harvestCoinsText.innerHTML = "+ " + this.farm.plots[this.selector.plotSelected].calculateCoins() + " ";
            harvestCoinsText.style.display = "block";
            harvestCoinsImage.style.display = "block";

            editable[0].value = task.name;
            editable[1].value = task.pomodoros;
            editable[2].checked = (task.subtasks.length > 0) ? true : false;
            if (editable[2].checked) {
                showHideSubtasks();
                for (let j = 0; j < task.subtasks.length; j++) { 
                    document.getElementById('subtask' + j).value = task.subtasks[j];
                    addSubtask();
                }
            }

        } else {
            
            
        }

        const resetTaskMenu = () => {
            editable[0].value = "Task";
            editable[1].value = 1;
            editable[2].checked = false;
            harvestButton.style.display = "none";
            harvestButton.style.backgroundColor = "red";
            saveButton.innerHTML = "Create";
            taskTitle.innerHTML = "Create a Task"
            harvestCoinsText.style.display = "none";
            harvestCoinsImage.style.display = "none";

            let subtasks = document.getElementsByClassName("subtask");
            for (let i = 0; i < subtasks.length; i++) {
                subtasks[i].value = "";
            }
            let table = document.getElementById("task-menu-table");
            console.log(table.rows.length);
            while (table.rows.length > 8) {
                table.deleteRow(table.rows.length - 3)
            }
            table.rows[5].style.display = "none";

        }

        const close = (event) => {
            //starts crop growth, removes listeners, or just removes listeners
            form.removeEventListener('submit', close);
            taskExitButton.removeEventListener('click', close);
            harvestButton.removeEventListener('click', close);
            subtasksCheck.removeEventListener('click', showHideSubtasks);
            Utility.toggleMenu(this, "taskMenu");

            if (event.type == "submit") {
                event.preventDefault();
                let subtasksData = [];
                let finalSubtasks = document.getElementsByClassName("subtask editable");
                console.log(finalSubtasks);
                for (let j = 0; j < finalSubtasks.length; j++) {
                    if (!(finalSubtasks[j].value == "" || finalSubtasks[j].value == null)) { 
                        subtasksData.push(finalSubtasks[j].value);
                    }
                }
                //connect up to pomodoro timer;
                let taskConfig = {name: document.getElementById("taskName").value,
                                  plotId: this.selector.plotSelected,
                                  pomodoros: document.getElementById("repetitions").value,
                                  subtasks: subtasksData }
                if (editing) {
                    this.farm.editTask(taskConfig);
                    this.events.emit("taskEdited");
                }
                else {
                    let cropType = document.getElementById("cropChoice").value;
                    this.farm.plots[this.selector.plotSelected].setupCrops(cropType);
                    Utility.setPlotReady(true);
                    this.farm.addTask(taskConfig);
                    this.farm.removeSeedFromInventory(cropType);
                    this.events.emit("taskCreated");

                }
                console.log(this.farm.tasks, taskConfig);
                console.log(document.getElementById("taskName").value)
            }
            else if (event.type == "click") {
                if (!this.farm.plots[this.selector.plotSelected].occupied){
                    Utility.setPlotReady(false);
                }
            }
            //resets the task menu to its default
            resetTaskMenu();
            if (editing) {
                //a lil bit more resetting
                for (let i = 0; i < rowsToHide.length; i ++) {
                    rowsToHide[i].style.display = "table-row";
                }
                //harvest task handler;
                if (this.farm.tasks[this.selector.plotSelected]){
                    let finished = this.farm.tasks[this.selector.plotSelected].completed;
                    if (event.srcElement.id == "harvest-task"){
                        if (finished) {
                            //if plot is finished just harvest
                            this.events.emit("harvestCrops");
                        }
                        else {
                            let prompt = "Are you sure you want to harvest this plot?"
                            let note = "Warning: this plot is unfinished, and you will not collect the task completion bonus"
                            Utility.throwConfirmationScreen(this, "harvestCrops", prompt, note);
                        }
                    }
                }
            }
        }


        //add subtask listener
        subtasksCheck.addEventListener('click', showHideSubtasks);
        //add subtaskfilled listener
        form.addEventListener('keydown', addSubtask);
        //add submit listener
        form.addEventListener('submit', close);

        harvestButton.addEventListener('click', close);
        //add exit listener
        taskExitButton.addEventListener('click', close);
    }

}

function generateCloud(scene) {
    // Generate a random y position
    let y = Phaser.Math.Between(100, 460);

    // Select a random cloud image
    let randomIndex = Phaser.Math.Between(0, scene.cloudImages.length - 1);
    let randomImage = scene.cloudImages[randomIndex];

    // Create a new cloud at left edge of the screen and at the random y position, setDepth(-1) to make sure the clouds are behind the mountains
    let cloud = new Cloud({scene: scene, x: -50, y: y, texture: randomImage})
    // scene.physics.add.image(-50, y, randomImage).setDepth(-1);
    //cloud.setScale(Phaser.Math.Between(50, 75) / 100);

    // // Set the cloud's velocity to the right
    // cloud.setVelocityX(20);

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

function generateButterfly(scene) {
    let y = Math.floor(Math.random() * 200) + 450;
    let x = -20;
    let butterfly = new Butterfly ({
        animalName: "butterfly1",
        scene: scene,
        x: x,
        y: y,
        frameStartEnd: [0, 3],
        })
    butterfly.seed();
    scene.butterflies.push(butterfly);

    for(let i = 0; i < scene.butterflies.length; i++) {
        scene.butterflies[i].setDepth(10000);
    }
    
    for (let i = 0; i < scene.butterflies.length; i++) {
        if ((scene.butterflies[i].x < -20) || scene.butterflies[i].x > (screen.width + 40) ) {
            scene.butterflies[i].destroy();
            scene.butterflies.splice(i, 1);
        }
    }
}

class Selector extends Phaser.GameObjects.Sprite {
    constructor (config) {
        super (config.scene, config.x, config.y, config.sprite);
        this.plotSelected = null;

        config.scene.add.existing(this);
    }
}

class SectorCircle extends Phaser.GameObjects.Graphics {
    constructor(scene, x, y, radius, startAngle, endAngle, color) {
        super(scene);
        this.setDepth(-2);
        scene.add.existing(this);

        this.x = x
        this.y = y;
        this.radius = radius
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
    constructor(scene, x, y, radius, totalTimeInSeconds, elapsedTime, repeatDurationInSeconds, pomodoro, pauseFlag, color, autoStartTimer) {
        super(scene);
        scene.add.existing(this);

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.totalTimeInSeconds = totalTimeInSeconds;
        this.repeatDurationInSeconds = repeatDurationInSeconds;
        this.remainingTime = totalTimeInSeconds - elapsedTime;
        this.elapsedTime = elapsedTime | 0;

        this.pomodoro = pomodoro;
        this.pauseFlag = pauseFlag;
        this.color = color;
        this.autoStartTimer = this.autoStartTimer;

        // Generate the text
        this.timeString = scene.add.text(this.x + 127, this.y*2 + 10, '', { color: '#000000', fontSize: '14px'});
        this.timeString.setDepth(1);
        this.timeString.autoRound = false;

        // Add the text to the scene
        this.scene.add.existing(this.timeString);

        this.updateTimeString();

        this.timeString.setVisible(true);

        this.fillCircle = new SectorCircle(scene, this.x, this.y, radius, -90, -90, this.color);

        // Create the timer face
        this.createTimerFace();

        // Listen to events from pomodoro
        this.scene.events.on('timerPaused', this.pauseTimer, this);
        this.scene.events.on('timerResumed', this.resumeTimer, this);
        this.scene.events.on('timerSkipped', this.skipTimer, this);
        this.scene.events.on('timerStarted', this.startTimer, this);

        this.scene.events.on('showTime', this.showTime, this);
        this.scene.events.on('hideTime', this.hideTime, this);

        this.scene.events.on('hideButtons', this.reset, this);

        //this.scene.events.on('pomodoroStarted', this.startPomodoro, this);
        // Start the timer
        //console.log("workFlag: ", this.pomodoro.workFlag);
        // if (this.autoStartTimer){
        //     this.startTimer();
        // }
        this.startTimer();
    }

    reset(){
        console.log("in reset");
        console.log(this.active);
        if (this.timerEvent) {
            this.timerEvent.paused = true;
            this.scene.time.removeEvent(this.timerEvent);
            delete this.timerEvent
        }
        this.clear();
        this.hideTime();
        this.fillCircle.destroy();

    }

    skipTimer() {
        this.timeString.destroy();
        this.reset();
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
        const handLength = this.radius * 0.6;

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
        if (!this.timerEvent) {
            try{
                this.timerEvent = this.scene.time.addEvent({
                    delay: 1000, // Update every second
                    callback: this.updateTimer,
                    callbackScope: this,
                    loop: true
                });
            }
            catch {
                console.log("this bitch doesn't know what a scene is. what a loser. (old instance that is still listening to old events, got this here so that two seconds don't pass in one)")
                console.log(this);
            }

            console.log("timer started");
        }
    }

    pauseTimer() {
        if (this.timerEvent){
            this.timerEvent.paused = true;
            console.log("timer paused");
        }
    }

    resumeTimer() {
        if (this.timerEvent){
            this.timerEvent.paused = false;
            console.log("timer resumed");
        }
    }

    updateTimeLeft(timeIn, elapsedTime) {
        this.totalTimeInSeconds = timeIn; 
        console.log(this.elapsedTime);
        this.remainingTime = timeIn - elapsedTime;
        console.log(this.remainingTime);
        this.updateTimeString()
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
        if (formattedHours > 0) {
            this.timeString.setText(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
            this.timeString.setX(300)
        } else {
            this.timeString.setText(`${formattedMinutes}:${formattedSeconds}`);
            this.timeString.setX(300)
        }
    }
    calculateAngle() {
        // Calculate angle for timer hand
        
        let angle = (this.elapsedTime / this.totalTimeInSeconds) * Phaser.Math.PI2 - Phaser.Math.PI2 / 4;

        // Change the fill circle area
        if (this.elapsedTime != this.totalTimeInSeconds) {
            if (this.fillCircle) {
                this.fillCircle.destroy();
            }
            this.fillCircle = new SectorCircle(this.scene, this.x, this.y, this.radius - 30, -90, Phaser.Math.RadToDeg(angle), this.color);
        }
            return angle;
    }

    updateCircle() {
        let angle = this.calculateAngle();

        // Draw timer hand
        const handLength = this.radius * 0.6;
        this.lineStyle(3, 0xff0000);
        this.beginPath();
        this.moveTo(this.x, this.y);
        this.lineTo(
            this.x + Math.cos(angle) * handLength,
            this.y + Math.sin(angle) * handLength
        );
        this.strokePath();
    }

    updateTimer() {
        // Check if the timer has been destroyed
        console.log("1 second has passed");
        if (!this.active) {
            this.fillCircle.destroy();
            return;
        }


        // Clear previous timer hand
        this.clear();
        this.fillCircle.clear();

        this.elapsedTime++;
        this.scene.farm.tasks[this.scene.selector.plotSelected].updateTime(this.elapsedTime)
        this.remainingTime--;

        if (this.elapsedTime % 20 == 0 && !this.scene.pomodoro.workFlag) {
            this.scene.farm.saveTask(this.scene.farm.tasks[this.scene.selector.plotSelected])
        }
        
        
        this.updateTimeString();
        // Check if timer is completed
        if (this.remainingTime <= 0) {
            this.scene.events.emit('timerCompleted');
            Utility.setWorkingState(false);
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
                if (this.timerEvent) {
                    this.timerEvent.paused = true;
                    delete this.timerEvent
                }
                this.fillCircle.destroy();
                console.log("Timer completed!");
            }
        }
        else {
            this.updateCircle();
        }

        // Constant check for the state of the timer to update pomodoro
        if (this.timerEvent.paused) {
            this.pauseFlag = true;
        } else {
            // this.scene.events.emit('timerResumed');
            this.pauseFlag = false;
        }

        
    }

    complete() {
        this.reset()
    }
}

// Events for the timer
class Pomodoro extends Phaser.GameObjects.Container {
    constructor(scene, x, y, radius, noOfPomodoros = 2) {
        super(scene, x, y);
        scene.add.existing(this);

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.radius = radius;

        
        this.workFlag = false; // true = work time, false = break time
        this.pauseFlag = false;
        
        this.initBreakInterval = longBreakInterval;
        //times are stored in seconds.
        this.updateTimeSettings(true);
        this.noOfPomodoros = noOfPomodoros;
        
        this.setupPomodoro();
        //this.createHitArea();

        this.scene.events.on('timerCompleted', this.autoStart, this);

        this.scene.events.on('plotSelected', this.onVisibility, this);
        this.scene.events.on('hideButtons', this.offVisibility, this);
        //     this.playButton.setVisible(true);

        this.scene.events.on('taskCreated', this.onVisibility, this);
        this.scene.events.on('timerCompleted', this.savePomState, this);

        this.graphics = this.scene.add.graphics();

        this.drawBackCircle();
        this.add(this.graphics);
    }

    createTimer(){
        if (this.timer1){
            this.timer1.reset();
            this.timer1.fillCircle.destroy();
            this.timer1.destroy();
            delete this.timer1;
        }
        this.workFlag = true;
        this.playButton.setVisible(true);
        this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.workTime, 0, 0, this, this.pauseFlag, 0xffa500, this.autoStartPomodoro);
        this.scene.events.emit("timerPaused");
    }

    onVisibility(){
        this.playButton.setVisible(true);
        this.pauseButton.setVisible(false);
        this.skipButton.setVisible(false);
    }

    offVisibility(){
        this.playButton.setVisible(false);
        this.pauseButton.setVisible(false);
        this.skipButton.setVisible(false);
    }

    setupPomodoro() {
        this.createButtons();
        this.playButton.setVisible(false);
    }

    updateTimeSettings(dont_save) {
        this.workTime = document.getElementById("workTime").value * 60;
        this.shortBreakTime = document.getElementById("shortBreakTime").value * 60;
        this.longBreakTime = document.getElementById("longBreakTime").value * 60;
        this.longBreakInterval = document.getElementById("longBreakInterval").value;
        this.autoStartBreak = document.getElementById("autoStartBreak").checked;
        this.autoStartPomodoro = document.getElementById("autoStartPomodoro").checked;
        if (this.timer1) {
            try {
                let task = this.scene.farm.tasks[this.scene.selector.plotSelected]
                let updateTime = 0;
                switch (task.timerState) {
                    case 0:
                        updateTime = this.workTime;
                        break;
                    case 1:
                        updateTime = this.shortBreakTime;
                        break;
                    case 2:
                        updateTime = this.longBreakTime;
                        break;
                }
                this.timer1.updateTimeLeft(updateTime, task.time)
                //this.timer1.
                if (!this.pauseFlag){
                    this.scene.farm.plots[this.scene.selector.plotSelected].pauseGrowth()
                    this.scene.farm.plots[this.scene.selector.plotSelected].playGrowth()
                }
            }
            catch (err) {
                this.timer1.totalTimeInSeconds = this.workTime
            }
                
        }
        if (dont_save) {
            return;
        }
        //save settings to database
        let fontSize = document.getElementById("fontSize").value.toLowerCase()
        if (fontSize == "small") {
            fontSize = 0
        } else if (fontSize == "large") {
            fontSize = 2
        } else {
            fontSize = 1
        }

        AccessUserData.updateUserSettings({
            usernameId: this.scene.farm.userName,
            workTime: Math.floor(this.workTime/60),
            shortBreakTime: Math.floor(this.shortBreakTime/60),
            longBreakTime: Math.floor(this.longBreakTime/60),
            longBreakInterval: this.longBreakInterval,
            autoStartBreak: this.autoStartBreak,
            autoStartPomodoro: this.autoStartPomodoro,
            font: document.getElementById("fontStyle").value,
            fontSize: fontSize
        })
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
        this.graphics.setDepth(-3);
    }

    createButtons() {
        // create play button image
        this.playButton = this.scene.add.image(this.x + 160, this.y*2 - 10, 'play-button').setScale(.23);
        this.playButton.setDepth(1);
        // this.playButton.setVisible(true);
        this.playButton.setInteractive();
        // Utility.addTintOnHover(this.playButton);

        // create pause button image
        this.pauseButton = this.scene.add.image(this.x + 140, this.y*2 - 10, 'pause-button').setScale(.23);
        this.pauseButton.setDepth(1);
        this.pauseButton.setVisible(false);
        this.pauseButton.setInteractive();
        // Utility.addTintOnHover(this.pauseButton);

        // create skip button image
        this.skipButton = this.scene.add.image(this.x + 185, this.y*2 - 10, 'skip-button').setScale(.23);
        this.skipButton.setDepth(1);
        this.skipButton.setVisible(false);
        this.skipButton.setInteractive();
        // Utility.addTintOnHover(this.skipButton);

        // Event listeners to the images
        this.playButton.on('pointerdown', () => {
            console.log("playButton clicked");
            console.log(Utility.plotReady())
            console.log(Utility.isEditMode())
            if (this.timer1 && Utility.plotReady && !Utility.isEditMode()){
                console.log(this.timer1.active);
                if (this.timer1.remainingTime == 0 || !this.timer1.active){
                    this.playButton.setVisible(false);
                    this.pauseButton.setVisible(true);
                    this.skipButton.setVisible(true);
                    this.nextTimer();
                } else {
                    if (this.workFlag) {
                        Utility.setWorkingState(true);
                        this.scene.events.emit("pomodoroResumed");
                    }
                    this.scene.events.emit('timerResumed');
                    this.pauseFlag = false;
                    this.playButton.setVisible(false);
                    this.pauseButton.setVisible(true);
                    this.skipButton.setVisible(true);
                }
                
            } else if (Utility.plotReady() && !Utility.isEditMode()){
                this.playButton.setVisible(false);
                this.pauseButton.setVisible(true);
                this.skipButton.setVisible(true);
                this.nextTimer();
                this.scene.events.emit("timerStarted");
            }
        });

        this.pauseButton.on('pointerdown', () => {
            this.playButton.setVisible(true);
            this.pauseButton.setVisible(false);
            this.skipButton.setVisible(false);

            console.log('pause button clicked');
            this.scene.events.emit('timerPaused');
            if (this.workFlag) {
                console.log("in");
                this.scene.events.emit('pomodoroPaused');
                this.timer1.paused = true;
                Utility.setWorkingState(false);
            } else {
                this.timer1.paused = true
            }
            this.pauseFlag = true;
        });

        this.skipButton.on('pointerdown', () => {
            this.playButton.setVisible(true);
            this.pauseButton.setVisible(false);
            this.skipButton.setVisible(false);

            console.log('skip button clicked');
            this.scene.events.emit('timerSkipped');
            if (this.workFlag) {
                this.scene.events.emit('pomodoroSkipped');
                this.timer1.paused = true;
                Utility.setWorkingState(false);
            }
            console.log('work flag', this.workFlag)
            this.autoStart();
        });
        
        //  has to be updated every time
        // if (Utility.plotReady()){
        //     console.log("plot found");
        //     this.playButton.setVisible(true);
        // } else {
        //     console.log("plot not found");
        //     this.playButton.setVisible(false);
        // }
    }

    autoStart() {
        if (this.timer1){
            this.timer1.reset();
            this.timer1.destroy();
            this.timer1.clear();
            this.timer1.timeString.destroy();
            delete this.timer1;
        }

        this.scene.farm.tasks[this.scene.selector.plotSelected].updateTime(0)

        if (this.workFlag) {
            if (!this.autoStartPomodoro) {
                this.scene.farm.tasks[this.scene.selector.plotSelected].timeState = 0;
                this.playButton.setVisible(true); 
                this.pauseButton.setVisible(false);
                this.skipButton.setVisible(false);
                Utility.setWorkingState(false);
                return;
            } else {
                this.nextTimer(); 
            }
        } else {
            if (!this.autoStartBreak) { 
                this.playButton.setVisible(true); 
                this.pauseButton.setVisible(false);
                this.skipButton.setVisible(false);
                this.scene.farm.tasks[this.scene.selector.plotSelected].timeState = 1;
                return; 
            } else {
                this.nextTimer();
                
            }
        }
        this.scene.farm.saveTask(this.scene.farm.tasks[this.scene.selector.plotSelected])
    }

    loadTimer(elapsedTime, state) {

        if (this.timer1) {
            this.timer1.fillCircle.clear();
            this.timer1.destroy();
            this.timer1.timeString.destroy();
            this.timer1.clear();
            delete this.timer1;
        }
        console.log("load timer");
        
        
    
        if (state == 0 && elapsedTime < this.workTime){
            console.log("not in break");
            this.workFlag = true;
            this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.workTime, elapsedTime, 0, this, this.pauseFlag, 0xffa500).setDepth(-2);
        } else if (state == 1 && elapsedTime < this.shortBreakTime){
            console.log("in short break");
            this.workFlag = false;
            this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.shortBreakTime, elapsedTime, 0, this, this.pauseFlag, 0x7CFC00).setDepth(-2);
            Utility.setWorkingState(false);
        } else if (state == 2 && elapsedTime < this.longBreakTime){
            console.log("long break");
            this.longBreakInterval = this.initBreakInterval
            this.workFlag = false;
            Utility.setWorkingState(false);
            this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.longBreakTime, elapsedTime, 0, this, this.pauseFlag, 0x228B22).setDepth(-2)
        } else {
            //timer too large for event (if settings are changed)
            //so timer is done
            switch(state) {
                case 0: 
                    this.workFlag = true;
                    break;
                case 1:
                    this.workFlag = false;
                    break;
                case 2:
                    this.workFlag = false;
                    this.longBreakInterval = this.initBreakInterval
                    break;
            }
        }
        this.scene.events.emit("timerPaused");
        this.pauseFlag = true;
        if(this.timer1){
            this.timer1.updateCircle();
        }
    }

    loadTask() {
        let index = this.scene.selector.plotSelected
        console.log(this.scene.farm.findSelectedTaskIndex())
        console.log(this.scene.farm.tasks);
        let task = this.scene.farm.tasks[index];
        let plot = this.scene.farm.plots[index]
        if (!plot.occupied || !task || task.completed) {
            console.log("nothing to load");
            this.playButton.setVisible(false);
            this.pauseButton.setVisible(false);
            this.skipButton.setVisible(false);
            if (this.timer1) {
                this.timer1.destroy();
                this.timer1.clear();
                this.timer1.fillCircle.destroy();
                this.timer1.timeString.destroy();
                delete this.timer1;
            }
            //no task to load
            return;
        } else if (task.time == 0){
            console.log("timer not started yet");
            switch(task.timeState) {
                case 0: 
                    this.workFlag = false;
                    break;
                case 1:
                    this.workFlag = true;
                    break;
                case 2:
                    this.workFlag = true;
                    this.longBreakInterval = 1
                    break;
            }
            if (this.timer1) {
                this.timer1.destroy()
                this.timer1.clear()
                this.timer1.fillCircle.destroy()
                this.timer1.timeString.destroy()
                delete this.timer1;
            }
            this.playButton.setVisible(true);
            this.pauseButton.setVisible(false);
            this.skipButton.setVisible(false);
            return;
            //no timer to load: just make the pomodoro ready for the next one
        }

        this.noOfPomodoros = task.pomodoros - task.pomodorosCompleted;
        this.loadTimer(task.time, task.timerState)
        // if (task.timer != 0 && this.noOfPomodoros != 0) {
        //     if (task.timerState == 0 && task.timer < this.workTime) {
        //         //middle of pomodoro
        //         this.workFlag = false
        //         this.noOfPomodoros--;
        //         this.loadTimer(task.time, task.timerState)

        //     }
        //     else if (task.timerState == 0) {
        //         this.workFlag = false
        //         //switch to break but don't start
        //     }

        //     if (task.timerState == 1 && task.timer < this.shortBreakTime) {
        //         //load timer state for short break
        //         this.workFlag = true
        //         this.loadTimer(task.timer, task.timerState)
        //     }
        //     else if (task.timerState == 1){
        //         //jump to next pomodoro
        //         this.workFlag = true
        //     }

        //     if (task.timerState == 2 && task.timer < this.longBreakTime) {
        //         //load timer state for long break
        //         this.workFlag = true
        //         this.loadTimer(task.timer, task.timerState)
        //     }
        //     else if (task.timerState == 2) {
        //         //jump to next pomodoro
        //         this.workFlag = true;
        //     }
        // }
        
    }

    nextTimer() {
        if (this.timer1){
            this.timer1.reset();
            this.timer1.destroy();
            this.timer1.fillCircle.destroy();
            this.timer1.timeString.setVisible(false);
            delete this.timer1;
        }
        this.workFlag = !this.workFlag;
        if (this.workFlag) {  // if transitioning to work
            if (this.noOfPomodoros != 0) {
                Utility.setWorkingState(true);
                this.noOfPomodoros--;

                console.log("pomodoro started");
                
                this.scene.farm.tasks[this.scene.farm.findSelectedTaskIndex()].timerState = 0;
                this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.workTime, 0, 0, this, this.pauseFlag, 0xffa500, this.autoStartPomodoro);
                this.scene.events.emit('pomodoroStarted');
                if (this.autoStartPomodoro) {
                    this.scene.events.emit('timerStarted');
                }
            } else {
                console.log("taskComplete!");
                this.scene.farm.tasks[this.scene.selector.plotSelected].timerState = 1;
                this.scene.farm.tasks[this.scene.selector.plotSelected].completed = true;
                this.playButton.setVisible(false);
                this.pauseButton.setVisible(false);
                this.skipButton.setVisible(false);
                Utility.setWorkingState(false);
                this.scene.events.emit('taskCompleted');
            }
        } else {  // if transitioning to break
            console.log()
            Utility.setWorkingState(false);
            this.longBreakInterval--;
            if (this.longBreakInterval == 0) {
                this.scene.farm.tasks[this.scene.selector.plotSelected].timerState = 2;
                this.longBreakInterval = this.initBreakInterval;
                this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.longBreakTime, 0, 0, this, this.pauseFlag, 0x228B22, this.autoStartBreak);
            } else {
                this.scene.farm.tasks[this.scene.selector.plotSelected].timerState = 1;
                this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.shortBreakTime, 0, 0, this, this.pauseFlag, 0x7CFC00, this.autoStartBreak);
            }
            if (this.autoStartBreak) {
                this.scene.events.emit('timerStarted');
            }
        }

    }
    savePomState() {
        this.scene.farm.tasks[this.scene.selector.plotSelected].time = 0;
        if (this.workFlag) {
            this.scene.farm.tasks[this.scene.selector.plotSelected].timerState = this.longBreakInterval == 1 ? 2 : 1;
            this.scene.farm.tasks[this.scene.selector.plotSelected].pomodorosCompleted ++;
        } else {
            this.scene.farm.tasks[this.scene.selector.plotSelected].timerState = 0;
        }
    }
}

// A PlayerFarm object will store the state of everything specific to a user on the website
class PlayerFarm {
    constructor(scene, data){
        // load playerstate from database
        this.scene = scene;
        this.coins = 0;
        this.plots = [];
        this.seedsOwned = {};
        this.decorations = [];
        this.animals = [];
        this.farmhouse = null;
        this.seedsOwned = [];

        console.log(data);
        console.log(data.userFarm);
        console.log()
        if (data.userFarm.usernameId == "guest") 
            {   this.userName = null}
        else{   this.userName = currentUsername;}

        this.loadOwnedSeeds(data.seedsOwned);
        this.createPlots(data.plots);
        this.createTasks(data.tasks);
        this.createDecorations(data.decorations);
        this.createFarmhouse(data.userFarm);
        this.showCoins(data.userFarm.coins);
        this.loadSettings(data.userSettings);
        this.sortTasksAndPlots();
    }

    sortTasksAndPlots() {
        console.log(this.plots, this.tasks)
        this.plots = this.insertionSort(this.plots);
        this.tasks = this.insertionSort(this.tasks);
        
        console.log(this.plots, this.tasks)
    }

    insertionSort(array) {

        console.log(array);

        for (let i = 1; i < array.length; i++) {
            let current = array[i];
            let j = i - 1;

            while(j>=0 && array[j].plotId > current.plotId) {
                let old = array[j+1];
                array[j+1] = array[j];
                array[j] = old;
                j--;
            }
            array[j+1] == current;
        }
        return array;


    }

    loadOwnedSeeds(seedsOwned) {
        try {
            delete seedsOwned.usernameId;
        }
        catch (err) {}
        this.seedsOwned = seedsOwned;
    }
    getOwnedSeeds() {
        return this.seedsOwned;
    }

    createPlots(plots) {
        for (let i = 0; i < plots.length; i++) {
            let plot = new Plot({ scene: this.scene, 
                                x: plots[i].x, y: plots[i].y, 
                                id: plots[i].plotId, 
                                crop: plots[i].crop, 
                                counter: plots[i].growthStage,
                                step: plots[i].growthStep,
                                placed: plots[i].placed});
            this.plots.push(plot);
        }
        console.log(this.plots[0].plotSprite)
    }

    findSelectedTaskIndex(id) {
        if (!id){
            id = this.scene.selector.plotSelected;
        }
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].plotId == id) {
                return i;
            }
        }
    }

    createTasks(tasksData) {
        this.tasks = []
        //console.log(tasksData);
        for (let i =0; i < 8; i++) {
            let subtasks = [];
            let subtasksCompleted = [];
            console.log(tasksData[i])
            if (i < tasksData.length){
                tasksData[i]['time'] = tasksData[i]['timerTime']
                for (let j = 1; j <= 10; j++) {
                    let subtask;
                    let subtaskCompleted;
                    subtask = tasksData[i]["subTask"+j];
                    subtaskCompleted = tasksData[i]["subTask"+j+"Completed"];
                    if (!subtaskCompleted) {
                        subtaskCompleted = false;
                    }
                    if (subtask != null) {
                        subtasks.push(subtask);
                        subtasksCompleted.push(subtaskCompleted);
                        console.log(subtask, subtaskCompleted);
                    }
                }
            }
            if (subtasks.length != 0) {
                tasksData[i].subtasks = subtasks;
                tasksData[i].subtasksCompleted = subtasksCompleted;
            }
            try {tasksData[i].scene = this.scene;}
            catch (err) {tasksData.push ({scene: this.scene, plotId: i, name: "empty"})}
            this.tasks.push(new Task(tasksData[i]));
        }
        
    }

    
    addTask(taskConfig) {
        this.tasks[this.scene.selector.plotSelected].updateTask(taskConfig)
        let subtasksCompleted = []
        for (let subtask in taskConfig.subtasks) {
            subtasksCompleted.push(false)
        }
        taskConfig.subtasksCompleted = subtasksCompleted
        this.saveTask(taskConfig);
    }

    editTask(taskConfig) {
        this.tasks[this.findSelectedTaskIndex()].updateTask(taskConfig);
        this.saveTask(taskConfig);
    }

    createDecorations(decorations) {
        for(let i = 0; i < decorations.length; i++){
            console.log(decorations[i])
            let decoration = new Decoration({scene: this.scene, x: decorations[i].x, y: decorations[i].y, type: decorations[i].type, texture: decorations[i].type, placed: decorations[i].placed});
            this.decorations.push(decoration);
        }
    }

    createFarmhouse(data) {
        //console.log('level' + data.farmHouseLevel + 'farmhouse')
        let sprite_texture = "level1farmhouse"
        if (data.farmHouseLevel == 2) {
            sprite_texture = "level2farmhouse"
        }
        this.farmhouse = new Farmhouse({scene: this.scene, x: data.x, y: data.y, level: data.farmHouseLevel, texture: sprite_texture});
    }
    getCoins(){
        return this.coins;
    }
    showCoins(coins) {
        this.coins = coins;
        this.coinText = document.getElementById("current-coins-value");
        this.coinText.innerText = this.coins;
    }
    updateCoins(change) {
        this.coins += change;
        this.coinText.innerText = this.coins;
        //save data to db;
        console.log(this.coins);
        this.saveCoins();
    }

    loadSettings(settingsConfig) {
        document.getElementById("workTime").value = settingsConfig.pomTimer;
        document.getElementById("shortBreakTime").value = settingsConfig.shortBreak;
        document.getElementById("longBreakTime").value = settingsConfig.longBreak;
        document.getElementById("longBreakInterval").value = settingsConfig.longBreakInterval;
        document.getElementById("autoStartBreak").checked = settingsConfig.autoStartBreak;
        document.getElementById("autoStartPomodoro").checked = settingsConfig.autoStartPomodoro;
        this.scene.pomodoro.updateTimeSettings(true)
        console.log(settingsConfig.fontStyle);
        switch(settingsConfig.fontStyle) {
            case "pixel":
                document.getElementById("fontStyle").value = "pixel"
                break;
            case "standard":
                document.getElementById("fontStyle").value = "standard"
                break;
        }
        switch(settingsConfig.fontSize) {
            case 1:
                document.getElementById("fontSize").value = "normal";
                break;
            case 2:
                document.getElementById("fontSize").value = "large";
                break;
        }
        
        let fontStyle = document.getElementById("fontStyle").value;
        let elements = document.querySelectorAll('button, input, select');

        if (fontStyle == "standard") {
            document.body.style.fontFamily = "Helvetica, sans-serif";
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.fontFamily = "Helvetica, sans-serif";
            }
            
        } else if (fontStyle == "pixel") {
            document.body.style.fontFamily = "pixel-font, Helvetica, sans-serif";
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.fontFamily = "pixel-font, Helvetica, sans-serif";
            }
        }
        else {
            document.body.style.fontFamily = "open-dyslexic, Helvetica, sans-serif";
            for (let i = 0; i < elements.length; i++) {
                elements[i].style.fontFamily = "open-dyslexic, Helvetica, sans-serif";
            }
        }

        let fontSize = document.getElementById("fontSize").value;
        if(fontSize == "large") {
            document.documentElement.style.setProperty('--scale-factor', '1.3');
        }
        else {
            document.documentElement.style.setProperty('--scale-factor', '1');
        }
    }

    addFurnitureToInventory(type) {
        this.scene.insideFarmhouseScene.addFurnitureToInventory(this, type);
    }

    addDecorationToInventory(scene, type) {
        let decoration = new Decoration({scene: scene, x: 2000, y: 2000, type: type, texture: type, placed: false});
        this.decorations.push(decoration);
        this.saveSingleDecoration(decoration)
    }

    addPlotToInventory(scene) {
        let plot = new Plot({scene: scene, x: 2000, y: 2000, id: this.plots.length, crop: "nothing", counter: 0, placed: false});
        this.plots.push(plot);
        this.savePlot(plot)
    }

    addSeedToInventory(cropsIn) {
        console.log(cropsIn.length)
        if (this.seedsOwned[cropsIn] < 0) {
            this.seedsOwned[cropsIn] = 0;
        }
        this.seedsOwned[cropsIn] ++;
        console.log(this.seedsOwned);
        this.saveSeedsOwned()
    }
    removeSeedFromInventory(cropsIn) {
        if (this.seedsOwned[cropsIn] > 0) {
            this.seedsOwned[cropsIn] --;
            this.saveSeedsOwned()
        }
    }

    saveSeedsOwned() {
        if (this.userName == null) {return;}
        let seedsOwned = this.seedsOwned;
        seedsOwned.usernameId = this.userName;
        AccessUserData.amendUserSeeds(seedsOwned)
    }

    savePlot(plot) {
        if (this.userName == null) {return;}
        let data = {
            usernameId: this.userName,
            plotId: plot.plotId,
            crop: plot.crop,
            growthStage: plot.growthStage,
            growthStep: plot.growthStep,
            x: plot.x,
            y: plot.y,
            placed: plot.placed
        }
        AccessUserData.updateSinglePlot(data)
    }


    saveAllPlots() {
        if (this.userName == null) {return;}
        for (let i = 0; i < this.plots.length; i++) {
            this.savePlot(this.plots[i]);
        }
    }
    saveTask(task) {
        let taskData = {
            usernameId: this.userName,
            plotId: task.plotId,
            name: task.name,
            pomodoros: task.pomodoros,
            pomodorosCompleted: task.pomodorosCompleted,
            completed: task.completed,
            timerState: task.timerState,
            timerTime: task.time,
            elapsedTime: task.elapsedTime,
            "subTask1": null,
            "subTask1Completed": null,
            "subTask2": null,
            "subTask2Completed": null,
            "subTask3": null,
            "subTask3Completed":null,
            "subTask4": null,
            "subTask4Completed":null,
            "subTask5": null,
            "subTask5Completed":null,
            "subTask6": null,
            "subTask6Completed":null,
            "subTask7": null,
            "subTask7Completed":null,
            "subTask8": null,
            "subTask8Completed":null,
            "subTask9": null,
            "subTask9Completed":null,
            "subTask10": null,
            "subTask10Completed": null,
        }
        task = task instanceof Task ? task : this.tasks[this.scene.selector.plotSelected]
        for (let i = 0; i < task.subtasks.length; i++) {

            taskData["subTask"+(i+1)] = task.subtasks[i];
            taskData["subTask"+(i+1)+"Completed"] = task.subtasksCompleted[i]
        }
        AccessUserData.updateSingleTask(taskData)
    }
    saveAllTasks() {
        if (this.userName == null) {return;}
        for (let i = 0; i < this.tasks.length; i++) {
            let task = this.tasks[i];
            this.saveTask(task)
        }
    }
    saveSingleFurniture(furniture) {
        if (this.userName == null) {return;}
        AccessUserData.updateSingleFurniture({
            usernameId: this.userName,
            type: furniture.type,
            x: furniture.x,
            y: furniture.y,
            placed: furniture.placed
        })
    }
    saveFurniture() {
        let furniture = this.scene.insideFarmhouseScene.furniture;

        if (this.userName == null) {return;}
        let furnitureData = [];
        for (let i = 0; i < furniture.length; i++) {
            let data = {
                usernameId: this.userName,
                type: furniture[i].type,
                x: furniture[i].x,
                y: furniture[i].y,
                placed: furniture[i].placed
            }
            furnitureData.push(data);
        }
        AccessUserData.updateAllUserFurniture(furnitureData)
    }
    saveSingleDecoration(decoration) {
        if (this.userName == null) {return;}
        AccessUserData.updateSingleDecoration({
            usernameId: this.userName,
            type: decoration.type,
            x: decoration.x,
            y: decoration.y,
            placed: decoration.placed
        })
    }
    saveDecorations() {
        if (this.userName == null) {return;}
        let decorationData = [];
        for (let i = 0; i < this.decorations.length; i++) {
            let data = {
                usernameId: this.userName,
                type: this.decorations[i].type,
                x: this.decorations[i].x,
                y: this.decorations[i].y,
                placed: this.decorations[i].placed
            }
            decorationData.push(data);
        }
        AccessUserData.updateAllUserDecorations(decorationData);
    }
    saveCoins() {
        if (this.userName == null) {return;}
        AccessUserData.amendCoins(this.userName, this.coins)
    }

    addTaskToDB(taskConfig) {
        if (this.userName == null) {return;}
        taskConfig.usernameId = this.userName;
        return taskConfig;
    }
    addPlotToDB(plotConfig) {
        if (this.userName == null) {return;}
        plotConfig.usernameId = this.userName;
    }
    addFurnitureToDB(furnitureConfig) {
        if (this.userName == null) {return;}
        furnitureConfig.usernameId = this.userName;
    }
    addDecorationToDB(decorationConfig) {
        if (this.userName == null) {return;}
        decorationConfig.usernameId = this.userName;
    }


}

class Task {
    constructor(config) {
        this.scene = config.scene;
        this.plotId = config.plotId;
        this.name = config.name;
        console.log(config.elapsedTime);
        this.elapsedTime = config.elapsedTime || 0;
        this.pomodoros = config.pomodoros || 1;
        this.pomodorosCompleted = config.pomodorosCompleted || 0;
        this.subtasks = config.subtasks || [];
        this.subtasksCompleted = config.subtasksCompleted  || [];
        this.completed = config.completed || false;
        this.timerState = config.timerState || 0; // 0 : working, 1: short break, 2 : long break
        this.time = config.time || 0; // in seconds

        if (this.noOfPomodors <= this.pomodorosCompleted) {
            this.completed = true;
        }
        while (this.subtasks.length > this.subtasksCompleted.length) {
            this.subtasksCompleted.push(false)
        }
    }

    updateTask(config) {
        this.name = config.name || this.name;
        if (config.pomodoros <= this.pomodorosCompleted) {
            this.completed = true;
            super.scene.events.emit("taskCompleted");
        }
        this.pomodoros = config.pomodoros || this.pomodoros;
        this.subtasks = config.subtasks || this.subtasks;
        while (this.subtasks.length > this.subtasksCompleted.length) {
            this.subtasksCompleted.push(false)
        }
        while (this.subtasks.length < this.subtasksCompleted.length) {
            this.subtasksCompleted.pop()
        }
        this.completed = config.completed || this.completed;
        this.updateTaskScreen();
    }

    updateTaskScreen() {
        var wrapperDiv = document.getElementById("wrapperContainer");
        var taskNameDiv = document.getElementById("taskNameDiv");
        var subtasksDiv = document.getElementById("subtasksDiv");

        wrapperDiv.style.display = "flex";
        subtasksDiv.innerHTML = "";
        taskNameDiv.innerText = this.name;

        console.log(currentUsername);

        const updateListener = (event) => {this.updateSubtasksCompleted(event)}
        
        if (this.subtasks.length == 0) {return;}

        for (let i = 0; i < this.subtasks.length; i++) {
            let subtaskName = this.subtasks[i];
            let checked = this.subtasksCompleted[i];
            var textNode = document.createTextNode(subtaskName);
            var br = document.createElement('br');

            // create checkbox
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.setAttribute("id", i);
            checkbox.checked = checked;
            checkbox.style.width = "15px";
            checkbox.style.height = "15px";
            checkbox.onclick = updateListener;


            subtasksDiv.appendChild(checkbox);
            subtasksDiv.appendChild(textNode);
            subtasksDiv.appendChild(br);
        }
    }

    updateSubtasksCompleted(event) {
        let index = event.target.id;
        this.subtasksCompleted[index] = event.target.checked;
        this.scene.farm.saveTask(this);
        console.log(this.subtasksCompleted);
        
    }

    updateElapsedTime(interval) { //in milliseconds
        this.elapsedTime +=  interval / 3600000; //hours
        console.log(this.elapsedTime);
    }

    updateTime(currentTime){ //directly from pomodoro timer
        this.time = currentTime
    }

    getTime(){
        return this.time;
    }

    reset() {
        this.name = null
        this.elapsedTime =  0;
        this.pomodoros = 1;
        this.pomodorosCompleted = 0;
        this.subtasks = [];
        this.subtasksCompleted = [];
        this.completed = false;
        this.timerState = 0; // 0 : working, 1: short break, 2 : long break
        this.time = 0;
    }

}

class Animal extends Phaser.GameObjects.Sprite{
    constructor (config) {
        super(config.scene, config.x, config.y, config.animalName+"AS")
        this.spritesheet = config.animalName + "AS";
        this.animal = config.animalName;
        this.scene = config.scene;
        this.animation = config.animalName + "Anim";
        this.scene.add.existing(this);
    }
}

class Cloud extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.texture);

        config.scene.add.existing(this);
    }
    moveX () {
        this.x ++;
    }
}

class Butterfly extends Animal {
    //this would work better with birds tbh.

    seed () {
        this.offset1 = (Math.random() * 2) | 0 + 2
        this.offset2 = (Math.random() * 3) | 0
        this.startingy = this.y;
    }
    graph (x) {
        let y = this.startingy + 20*(Math.sin(this.offset1*x ) + 4*Math.sin(1/5*x + this.offset2)) | 0;
        let deriv = 20*(Math.cos(this.offset1*x) + 4/5*Math.sin(1/5*x + this.offset2))
        let second_deriv =  20*( - 9*Math.sin(this.offset1*x ) - 4/25*Math.sin(1/5*x + this.offset2));
        if (second_deriv < 0 || deriv < -6) {
            if (!this.anims.isPlaying)
                this.anims.play(this.animation);
        }
        return y
    }
    updateY () {
        this.x += 2;
        this.y = this.graph(this.x/50);
    }
}



class Plot extends Phaser.GameObjects.Container {
    constructor(config) {
        //loads plot state 
        super(config.scene, config.x, config.y);
        this.scene = config.scene;
        this.plotId = config.id;
        this.crop = config.crop || "nothing";
        this.growthStage = config.counter || 0;
        this.growthStep = config.step || 0;
        this.placed = config.placed;
        this.cropSprites = [];
        this.lastValidPosition = {x: 0, y: 0};
        this.wasDeleted = false;
        this.remainingTime = config.remainingTime || 0;
        
        // Create the plot sprite and add it to the container
        this.plotSprite = this.scene.add.sprite(0, 0, 'plot');
        this.add(this.plotSprite);
        this.scene.add.existing(this);

        if (this.crop === "nothing") {
            this.occupied = false;
        } else {
            this.occupied = true;
            this.plantCrops();
            console.log(this.growthStep);
            for (let i = 0; i < this.growthStep; i++) {
                this.growSelectedCrop(this.findCrop());
            }
        }

        // Make the container interactive
        this.setInteractive({
            hitArea: new Phaser.Geom.Rectangle(-this.plotSprite.width / 2, -this.plotSprite.height / 2, this.plotSprite.width, this.plotSprite.height),
            hitAreaCallback: Phaser.Geom.Rectangle.Contains,
            draggable: true
        });

        // Add a hover effect to the plot sprite of the container(for some reason Utility.addTintOnHover doesn't work here)
        this.on('pointerover', () => {
            if(Utility.isDeleteMode()) {
                this.plotSprite.setTint(0xff0000);
            }
            else {
                this.plotSprite.setTint(0xdddddd);
            }
        });

        this.on('pointerout', () => {
            this.plotSprite.clearTint();
        });

        this.scene.input.on('dragstart', function (pointer, gameObject) {
            gameObject.lastValidPosition = {x: gameObject.x, y: gameObject.y};
        });


        // Check if the plot is overlapping with another plot
        // Reset to last valid position if it is
        this.scene.input.on('dragend', (pointer, gameObject) => {
            if(gameObject instanceof Plot) {
                let overlapped = false;
                for(let plot of this.scene.farm.plots){
                    if(plot !== gameObject && plot.placed === true) {
                        let gameObjBounds = gameObject.plotSprite.getBounds();
                        let plotBounds = plot.plotSprite.getBounds();
            
                        if (Phaser.Geom.Intersects.RectangleToRectangle(gameObjBounds, plotBounds)) {
                            gameObject.x = gameObject.lastValidPosition.x;
                            gameObject.y = gameObject.lastValidPosition.y;
                            overlapped = true;
                            break;
                        }
                    }
                }
                if(!overlapped) {
                    gameObject.lastValidPosition = {x: gameObject.x, y: gameObject.y};
                }
            }
        });


        this.on('pointerdown', () => {
            if(Utility.isDeleteMode() && this.crop === "nothing") {
                this.wasDeleted = true;
                this.setVisible(false); // make the sprite invisible
                this.setActive(false); // make the sprite inactive
                this.setPosition(2000, 2000); // move it off-screen
                this.placed = false;
                return;
            }
            if(!Utility.isEditMode() && !Utility.getWorkingState()) {
                // if occupied prompt for harvest, if unoccupied, open start task menu.
                if (this.occupied) {
                    if (this.scene.selector.plotSelected == this.plotId) {
                        this.scene.events.emit("editingTask");
                    }
                    else {
                        this.select();
                        this.scene.farm.tasks[this.scene.selector.plotSelected].updateTaskScreen();
                        this.scene.pomodoro.loadTask();
                        //console.log("found plot but no task" , err.type)
                        Utility.setPlotReady(true);
                    }
                }
                else {
                    console.log("attempting to create task");
                    //show menu
                    this.select();
                    this.scene.events.emit("creatingTask");
                    // listened to by the scene class
                }
            }
        });
        

        if(!this.placed) {
            this.setVisible(false); // make the sprite invisible
            this.setActive(false); // make the sprite inactive
            this.setPosition(2000, 2000); // move it off-screen
        }
    }

    select() {
        this.scene.selector.setPosition(this.x, this.y);
        this.scene.selector.plotSelected = this.plotId;
        this.scene.selector.setVisible(true);
        try {
            if (this.occupied && !this.scene.farm.tasks[this.scene.farm.findSelectedTaskIndex()].completed){
                this.scene.events.emit('plotSelected');
                Utility.setPlotReady(true);
            }
            else {
                this.scene.events.emit('hideButtons');
            }
        }
        catch (error) {
            console.log("no attached task found")
            this.harvest(true)
        }
    }

    setupCrops(cropType) {
        this.crop = cropType;
        this.plantCrops();
        this.scene.farm.savePlot(this)
        //this.playGrowth();
    }

    resetPlot() {
        this.growthStage = 0;
        this.growthStep = 0;
        this.occupied = false;
        for (let cropSprite of this.cropSprites) {
            cropSprite.destroy();
        }
        this.crop = "nothing";
        this.cropSprites = [];
    }

    plantCrops() {
        this.occupied = true;
        let xoff = -35;
        let yoff = -40;
        this.gridSize = 5;
        if (this.crop === "pumpkin") {
            this.gridSize = 3;
            xoff = -30;
            yoff = -30;
        } else if (this.crop === "tulip"){
            this.gridSize = 6;
            xoff = -40;
            yoff = -42;
        }
        let cellWidth = this.plotSprite.width / this.gridSize;
        let cellHeight = this.plotSprite.height / this.gridSize;

        //Place crops
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                let x = col * cellWidth + cellWidth / 2;
                let y = row * cellHeight + cellHeight / 2;
                //If setOrigin is not 0,0 or 1,1 then when the plot container is moved the crop sprites will look wrong
                let crop = this.scene.add.sprite(x + xoff, y + yoff, this.crop + "Growth").setOrigin(1, 1).play(this.crop + "Anim");
                crop.stop();
                for (let i = 0; i < this.growthStage; i++) {
                    crop.anims.nextFrame();
                }
                if (this.crop== "tulip" && crop.anims.getFrameName() >= 10) {
                    let frame = Phaser.Math.Between(0, 5);
                    for (let j = 0; j < frame; j++){
                        crop.anims.nextFrame();
                    }
                }
                this.cropSprites.push(crop);
                //Add the crop sprite to the plot container
                this.add(crop);
            }
        }
        //Used for growth
        this.maxFrame = this.cropSprites[0].anims.getTotalFrames() - 1;
        if (this.crop == "tulip") {
            this.maxFrame -= 5;
        } 
    }

    playGrowth() {

        console.log("started growing");
        let workTime = this.scene.pomodoro.workTime;
        let steps = this.cropSprites.length * (this.maxFrame-this.growthStage) - this.growthStep;
        
        let time = -50 + 1000 * (this.scene.pomodoro.timer1.remainingTime + this.scene.pomodoro.noOfPomodoros * workTime);
        let interval = Math.floor(time/steps);

        console.log(interval ,steps, this.scene.pomodoro.noOfPomodoros + 1);

        //repeating function to grow crops individually
        this.tick = setInterval(() => {
            this.scene.farm.tasks[this.scene.selector.plotSelected].updateElapsedTime(interval);
            this.progressCrops(); 
        }, interval);
    }

    progressCrops() {
        //progress tracking
        if (this.growthStep === this.cropSprites.length) {
            this.growthStep = 0;
            this.growthStage++;

            //send current state and time to database to save growthStage
        }
        if (this.growthStage >= this.maxFrame) {
            //crops finished

            //todo: prompt to harvest
            clearInterval(this.tick);
            console.log("crops finished!");
            //alert(`Crops finished growing in: ${this.plotId}`);
            return;
        }
        this.growSelectedCrop(this.findCrop()) //find and grow one of the crops
        this.stepGrowth();
        this.scene.farm.savePlot(this)
        this.scene.farm.saveTask(this.scene.farm.tasks[this.scene.farm.findSelectedTaskIndex()])
        }

    findCrop() {
        //find a crop and grow it by 1.

        //check if any crops are left too far behind by the growthStage
        for (let j = 1; j <= this.cropSprites.length; j++) {
            if (this.cropSprites[j-1].anims.getFrameName() <= this.growthStage - 2) {
                console.log("crop left behind");
                return (j-1);
            }
        }

        //random number
        let rand = Phaser.Math.Between(0, (this.cropSprites.length-1));

        let upordown = Phaser.Math.Between(0, 1); // makes it seem more random when cycling through.

        //crop selection logic
        for (let i = 0; i < this.cropSprites.length; i++) {
            let frameNum = parseInt(this.cropSprites[rand].anims.getFrameName());
            if (frameNum > this.growthStage + 1 || frameNum >= this.maxFrame) {
                if (upordown) {
                    rand++;
                } else {
                    rand--;
                } //cycle through crops to find one to actually increment

                //reset random if out of range of list
                if (rand == this.cropSprites.length) {
                    rand = 0;
                }
                else if (rand < 0) {
                    rand = this.cropSprites.length - 1;
                }
            } 
            else {return (rand);} //viable crop found
        }
        console.log("no crop found expect an error after this");
    }
    growSelectedCrop(index) {
        let frameNum = this.cropSprites[index].anims.getFrameName();
        console.log("1st",frameNum, frameNum >= this.maxFrame);
        //actually increment the frame of the crop
        if (this.cropSprites.length != 0) { //here for safety's sake
            let frame_jump = 1;
            if (this.crop == "tulip") {
                if (frameNum == this.maxFrame - 1) {
                    frame_jump = Math.floor(Math.random() * 6 ) + 1;
                }
            }
            if (frameNum < this.maxFrame) {
                for (let i = 0; i < frame_jump; i++) {
                    this.cropSprites[index].anims.nextFrame();
                    //console.log("grownCrop");
            }
        }
            console.log(frameNum, frameNum >= this.maxFrame);
        }
    }

    stepGrowth() {
        this.growthStep++;
    }

    pauseGrowth() {
        if (this.tick) {
            clearInterval(this.tick);
            console.log("Paused growing");
        }
    }

    finishCrops() {
        console.log("trying to finish crops");
        while (this.growthStage != this.maxFrame) {
            this.progressCrops();
        }
        this.scene.farm.savePlot(this)
    }

    harvest(invalid) {
        //todo: remove this once we 'lock' the plots when in pomodoro mode.
        if (this.tick) {
            clearInterval(this.tick);
        }
        
        if (!invalid) {
            this.scene.farm.updateCoins(this.calculateCoins());
        }
        //remove crops
        for (let cropSprite of this.cropSprites) {
            cropSprite.destroy();
        }
        this.crop = "nothing";
        this.growthStage = 0;
        this.growthStep = 0;
        this.cropSprites = [];
        this.occupied = false;

        this.scene.events.emit('hideButtons');
    }

    calculateCoins() {
        let multiplier = 1;
        let completed = this.scene.farm.tasks[this.scene.farm.findSelectedTaskIndex()].completed;
        if(completed) {
            multiplier = 1.2;
        }
        let elapsedTime = this.scene.farm.tasks[this.scene.farm.findSelectedTaskIndex()].elapsedTime;
        switch(this.crop) {
            case "sunflower":
                return Math.floor(elapsedTime * 100 * multiplier);
            case "carrot":
                return  Math.floor(elapsedTime * 100 * 1.2 * multiplier);
            case "tulip":
                return  Math.floor(elapsedTime * 100 * 1.4 * multiplier);
            case "pumpkin":
                return  Math.floor(elapsedTime * 100 * 1.6 * multiplier);
        }
    }
}


class Decoration extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.texture);

        // Set the type of this furniture
        this.type = config.type;

        // Store a reference to the scene
        this.scene = config.scene;

        // Whether or not the furniture is currently placed on the scene
        this.placed = config.placed;

        this.wasDeleted = false;

        // Enable input for this object
        this.setInteractive({ draggable: true });

        // Add a hover effect to the furniture
        Utility.addTintOnHover(this);

        // Add this object to the scene
        this.scene.add.existing(this);

        if(!this.placed) {
            this.setVisible(false); // make the sprite invisible
            this.setActive(false); // make the sprite inactive
            this.setPosition(2000, 2000); // move it off-screen
        }

        // Add a pointerdown event listener
        this.on('pointerdown', this.handleClick, this);
    }

    handleClick() {
        if (Utility.isDeleteMode()) {
            this.wasDeleted = true;
            this.setVisible(false); // make the sprite invisible
            this.setActive(false); // make the sprite inactive
            this.setPosition(2000, 2000); // move it off-screen
            this.placed = false;
        }
    }
}

class Farmhouse extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.texture);

        console.log(config.texture)
        // Set the type of this furniture
        this.level = config.level;

        // Store a reference to the scene
        this.scene = config.scene;

        // Whether or not the furniture is currently placed on the scene
        this.placed = true;

        this.wasDeleted = false;

        this.setDepth(1)

        // Enable input for this object
        this.setInteractive({ draggable: true });

        // Add a hover effect to the furniture
        Utility.addTintOnHover(this);

        // Add this object to the scene
        console.log(this.x, this.y)
        console.log(this)
        this.scene.add.existing(this);
        console.log("should have added")
        this.setVisible(true)

        // Add a pointerdown event listener
        this.on('pointerdown', this.handleClick, this);

        if(this.level === 2) {
            this.anims.play('level2farmhouseAnimation');
        }
    }

    handleClick() {
        if(this.level !== 1) {
            let insideFarmhouseScene = this.scene.scene.get('InsideFarmhouseScene');
            insideFarmhouseScene.toggleHideScene(this.scene);
            insideFarmhouseScene.toggleHideSubtasks();
        }
        else {
            Utility.toggleMenu(this.scene, "upgradeHouseMenu");
        }
    }

    // Upgrade the farmhouse to the next level
    upgrade() {
        this.level++;
        this.setTexture('level' + this.level + 'farmhouse');
        this.anims.play('level' + this.level + 'farmhouseAnimation');
        this.saveHouseState()
    }
    saveHouseState() {
        AccessUserData.amendHouseState({usernameId: this.scene.farm.userName, x: this.x, y: this.y, farmHouseLevel: this.level});
    }
}