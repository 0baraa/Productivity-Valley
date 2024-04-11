import Utility from "./Utility.js";

export default class FarmScene extends Phaser.Scene {
    constructor() {
        super({ key: 'FarmScene' });
    }


    preload() {
        this.load.bitmapFont('pixelFont', '../fonts/pixeloperatorbitmap.png', '../fonts/pixeloperatorbitmap.xml');

        this.load.image('farmBackground', '../assets/farm-background.png');
        this.load.image('mountains-large', '../assets/large-mountains.png')
        this.load.image('mountains', '../assets/mountains.png');
        this.load.image('fence', '../assets/fence.png');
        this.load.image('level1farmhouse', '../assets/house/level1farmhouse.png');
        this.load.image('level2farmhouse', '../assets/house/level2farmhouse.png');
        this.load.spritesheet('level2farmhousespritesheet', '../assets/house/level2farmhouseanimation.png', { frameWidth: 80, frameHeight: 128 });
        
        this.load.image('marketSign', '../assets/market-sign.png');
        this.load.image('sun', '../assets/sun.png');
        this.load.image('sun-flares', '../assets/sun-flares.png')
        this.load.image('plot', '../assets/larger_plot.png');
        this.load.image('plotSelect', '../assets/plot_select.png');

        this.load.image('snowman', '../assets/decorations/snowman.png');
        this.load.image('gnome', '../assets/decorations/gnome.png');

        this.load.image('cloud1', '../assets/clouds/cloud1.png');
        this.load.image('cloud2', '../assets/clouds/cloud2.png');
        this.load.image('cloud3', '../assets/clouds/cloud3.png');
        this.load.image('cloud4', '../assets/clouds/cloud4.png');
        this.load.image('cloud5', '../assets/clouds/cloud5.png');
        this.load.image('cloud6', '../assets/clouds/cloud6.png');

        this.load.spritesheet("butterfly1AS", "../assets/animals/butterfly2-as.png", {frameWidth: 16, frameHeight:16 });
        this.load.spritesheet("carrotGrowth", "../assets/crops/carrot-growth-AS.png", { frameWidth: 20, frameHeight: 28 });
        this.load.spritesheet("sunflowerGrowth", "../assets/crops/sunflower-growth-AS.png", { frameWidth: 19, frameHeight: 41 });
        this.load.spritesheet("pumpkinGrowth", "../assets/crops/pumpkin-growth-AS.png", {frameWidth: 33, frameHeight: 39 });
        this.load.spritesheet("tulipGrowth", "../assets/crops/tulip-growth-AS.png", {frameWidth: 10, frameHeight: 22 });

        this.load.image('play-button', '../assets/clock/play-button.png');
        this.load.image('pause-button', '../assets/clock/pause-button.png');
        this.load.image('skip-button', '../assets/clock/skip-button.png');

    }

    create() {
        this.add.image(320, 550, 'farmBackground').setDepth(-2);

        this.add.image(570, 460, 'mountains-large').setScale(2).setAlpha(0);
        this.add.image(320, 520, 'mountains').setDepth(-1);

        this.sun = this.add.sprite(320, 455, 'sun').setDepth(-1);
        this.sun.setInteractive();
        Utility.addTintOnHover(this.sun);
        
        this.clouds = [];
        this.cloudImages = ['cloud1', 'cloud2', 'cloud3', 'cloud4', 'cloud5', 'cloud6'];
        
        //Generate initial cloud
        generateCloud(this);
        
        
        //Generate a new cloud every 5 seconds
        this.time.addEvent({
            delay: 8000,
            callback: () => generateCloud(this),
            loop: true
        });
        
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
                this.scene.launch('MarketScene');
            }
        });
        
        // Calculate the dimensions of the screen for better positioning
        const screenWidth = this.sys.game.config.width;
        const screenHeight = this.sys.game.config.height;
        
        const pomodoroY = screenHeight * 0.185;
        this.sunFlares = this.add.sprite(320, pomodoroY+221, 'sun-flares').setDepth(-1);
        this.pomodoro = new Pomodoro(this, 160, pomodoroY, 75);
        
        let homeButton = document.getElementById("home-icon-container");
        homeButton.addEventListener('click', () => {
            Utility.toggleMenu(this, "homeMenu");
            let homeExitButton = document.getElementById('home-exit-button');
            let homeGuideButton = document.getElementById('quick-guide');
            let saveExitButton = document.getElementById('exit-game')
            let deleteAccountButton = document.getElementById('delete-account');
            const homeClose = () => {
                homeExitButton.removeEventListener('click', homeClose);
                homeGuideButton.removeEventListener('click', showGuide);
                saveExitButton.removeEventListener('click', saveAndExit);
                deleteAccountButton.removeEventListener('click', deleteAccount);
                Utility.toggleMenu(this, "homeMenu");
            }
            const showGuide = () => {
                homeClose();
                Utility.showInfo(this, "homeGuide");
            }
            const saveAndExit = () => {
                homeClose();
                //this.farm.saveFarmState();
                Utility.chuckUserOut();
            }
            const deleteAccount = () => {
                homeClose();
                Utility.throwConfirmationScreen(this, "deleteAccount", "Are you sure you want to delete your account?", "This will permanently delete all your data on our servers. (you can make a new account if you wish)");
            }
            homeExitButton.addEventListener('click', homeClose);
            homeGuideButton.addEventListener('click', showGuide);
            saveExitButton.addEventListener('click', saveAndExit);
            deleteAccountButton.addEventListener('click', deleteAccount);
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
                settingsInfoButton.removeEventListener('click', showInfo);
                //showInfo needs to be added to Utility.js
                Utility.toggleMenu(this, "settingsMenu");
                if (event.type == "submit") {
                    event.preventDefault();
                    //Utility.sendSettingsData();
                    //update pomodoro timer settings;
                    this.pomodoro.updateTimeSettings();

                }
            }
            settingsExitButton.addEventListener('click', settingsClose);
            settingsForm.addEventListener('submit', settingsClose);
        });
        
        //white square around plot that will move to selected plot
        this.selector = new Selector({scene: this, x: -300, y: -100, sprite: "plotSelect"});
        this.selector.setVisible(false);

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
                this.originalFurniture = this.farm.furniture.map(furniture => ({...furniture}));
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
                for (let i = 0; i < this.farm.furniture.length; i++) {
                    this.farm.furniture[i].x = this.originalFurniture[i].x;
                    this.farm.furniture[i].y = this.originalFurniture[i].y;
                    // If the furniture was deleted, place it back
                    if(this.farm.furniture[i].wasDeleted == true) {
                        this.farm.furniture[i].setVisible(true);
                        this.farm.furniture[i].setActive(true);
                        this.farm.furniture[i].placed = true;
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
                let insideFarmhouseScene = this.scene.get('InsideFarmhouseScene');

                let furnitureContainer = document.getElementById('furniture-container');

                for(let furniture of this.farm.furniture){
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
                        furnitureImg.src = './assets/house/furniture/' + furniture.type + '.png';

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

                for(let furniture of this.farm.furniture){
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
                            Utility.toggleMenu(insideFarmhouseScene, "furnitureMenu");
                        };
                    }
                }

                Utility.toggleMenu(insideFarmhouseScene, "furnitureMenu");
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
                        plotImg.src = '../assets/larger_plot.png';

                        let buttonDiv = document.createElement('div');
                        buttonDiv.style.display = 'flex';
                        buttonDiv.style.justifyContent = 'center';

                        let plotButton = document.createElement('button');
                        plotButton.classList.add('furniture-button');
                        plotButton.id = plot.id + '-button';
                        plotButton.textContent = '+';

                        buttonDiv.appendChild(plotButton);
                        plotDiv.appendChild(plotImg);
                        plotDiv.appendChild(buttonDiv);
                        plotContainer.appendChild(plotDiv);
                    }
                }

                for(let plot of this.farm.plots){
                    let plotButton = document.getElementById(plot.id + '-button');
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
                        decorationImg.src = './assets/decorations/' + decoration.type + '.png';

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
                for(let furniture of this.farm.furniture){
                    furniture.wasDeleted = false;
                }
            }
            else {
                for(let plot of this.farm.plots){
                    plot.wasDeleted = false;
                }
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

                    console.log(gameObject.x, gameObject.y);

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

        // Launch the FarmhouseScene (which is hidden at first)
        this.scene.launch('InsideFarmhouseScene');
        // Get the InsideFarmhouseScene instance
        let insideFarmhouseScene = this.scene.get('InsideFarmhouseScene');
        // wait for scene to load then close it
        insideFarmhouseScene.load.on('complete', () => {
            this.farm = new PlayerFarm(this);
        });

        

        this.events.on('pomodoroStarted', this.playPlot, this);
        this.events.on('pomodoroResumed', this.playPlot, this);
        this.events.on('pomodoroPaused', this.pausePlot, this);
        this.events.on('pomodoroSkipped', this.pausePlot, this);
        this.events.on('taskCompleted', this.completePlot, this);

        this.events.on('harvestCrops', this.harvestPlot, this);
        this.events.on('creatingTask', this.createTaskMenu, this);
        this.events.on('editingTask', this.editTaskMenu, this);
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
        if (this.skip == 3) {
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

    playPlot() {
        this.farm.plots[this.selector.plotSelected].playGrowth()
    }

    pausePlot() {
        this.farm.plots[this.selector.plotSelected].pauseGrowth();
    }

    completePlot() {
        this.farm.plots[this.selector.plotSelected].finishCrops();
        this.farm.tasks[this.farm.findSelectedTaskIndex()].completed = true;
    }

    harvestPlot() {
        this.farm.plots[this.selector.plotSelected].harvest();
        this.farm.tasks.splice(this.farm.findSelectedTaskIndex());
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
            let cropChoice = document.getElementById("cropChoice");
            let cropsOwned = Object.values(this.farm.saveCropsOwned());
            let taskable = false;
            for (let i = 0; i < cropsOwned.length; i++) {
                if (cropsOwned[i] >= 0) {
                    cropChoice.options[i].style.display = "display";
                    taskable = true;
                } else {
                    cropChoice.options[i].style.display = "none";
                }
            }
            if (!taskable && this.farm.coins >= 50) {
                this.openAlertWindow("You have no seeds!", "You can buy some from the Market.")
            } else if (!taskable) {
                this.openAlertWindow("You have no seeds!", "But we're very generous and have given you some sunflower seeds. Use it well");
                this.farm.addCropToInventory("sunflower");
            }
            return;
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
       
        let taskTitle = document.getElementById('task-title');
        if (editing) {
            for (let i = 0; i < rowsToHide.length; i++) {
                rowsToHide[i].style.display = "none";
            }
            saveButton.innerHTML = "Save";
            harvestButton.style.display = "block";
            taskTitle.innerHTML = "Edit Task"
            let task = this.farm.tasks[this.farm.findSelectedTaskIndex()];
            if (task.completed) {
                harvestButton.style.backgroundColor = "#72d242";
            }
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
                let taskConfig = {taskName: document.getElementById("taskName").value,
                                  pomodoros: document.getElementById("repetitions").value,
                                  subtasks: subtasksData }
                if (editing) {
                    this.farm.editTask(taskConfig);
                }
                else {
                    this.farm.plots[this.selector.plotSelected].setupCrops();
                    Utility.setPlotReady(true);
                    taskConfig.plotId = this.selector.plotSelected, 
                    this.farm.addTask(taskConfig);
                    taskConfig.crop = document.getElementById("crop").value;
                    taskConfig.growthStage = 0;
                    taskConfig.growthStep = 0;
                    Utility.sendCreatedTaskData(taskConfig);
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
                let finished = this.farm.tasks[this.selector.plotSelected].completed;
                if (event.srcElement.id == "harvest-task"){
                    if (finished) {
                        //if plot is finished just harvest
                        this.events.emit("harvestCrops");
                    }
                    else {
                        let prompt = "Are you sure you want to harvest this plot?"
                        let note = "Warning: this plot is unfinished, and you will only collect half as many coins for your time."
                        Utility.throwConfirmationScreen(this, "harvestCrops", prompt, note);
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
    constructor(scene, x, y, radius, totalTimeInSeconds, elapsedTime, repeatDurationInSeconds, pomodoro, pauseFlag, color) {
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

        // Generate the text
        this.timeString = scene.add.text(this.x + 127, this.y*2 + 15, '', { color: '#000000', fontSize: '14px'});
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
        this.scene.events.emit('timerStarted');
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

    updateCircle() {
        // Calculate angle for timer hand
        let angle = (this.elapsedTime / this.totalTimeInSeconds) * Phaser.Math.PI2 - Phaser.Math.PI2 / 4;

        // Change the fill circle area
        this.fillCircle = new SectorCircle(this.scene, this.x, this.y, this.radius - 30, -90, Phaser.Math.RadToDeg(angle), this.color);
        return angle;
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

        let angle = this.updateCircle();

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
                this.timerEvent.remove();
                this.fillCircle.destroy();
                console.log("Timer completed!");
            }
        }
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
        this.updateTimeSettings();
        this.noOfPomodoros = noOfPomodoros;
        
        this.createButtons();
        this.createHitArea();

        //this.playButton.setVisible(true);

        this.scene.events.on('timerCompleted', this.autoStart, this);

        this.graphics = this.scene.add.graphics();

        this.drawBackCircle();
        this.add(this.graphics);
    }

    setupPomodoro() {
        this.createButtons();
    }

    updateTimeSettings() {
        this.workTime = document.getElementById("workTime").value * 60;
        this.shortBreakTime = document.getElementById("shortBreakTime").value * 60;
        this.longBreakTime = document.getElementById("longBreakTime").value * 60;
        this.longBreakInterval = document.getElementById("longBreakInterval").value;
        this.autoStartBreak = document.getElementById("autoStartBreak").checked;
        this.autoStartPomodoro = document.getElementById("autoStartPomodoro").checked;
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
        this.playButton = this.scene.add.image(this.x + 160, this.y*2 - 10, 'play-button').setScale(.23);
        this.playButton.setDepth(1);
        this.playButton.setVisible(false);
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
            console.log('play button clicked');
            console.log(this.workFlag);
            if (this.timer1 && Utility.plotReady && !Utility.isEditMode()){
                if (this.timer1.remainingTime == 0){
                    this.skipTimer();
                } else {
                    if (this.workFlag) {
                        this.scene.events.emit("pomodoroResumed");
                        Utility.setWorkingState(true);
                    }
                    this.scene.events.emit('timerResumed');
                    this.pauseFlag = false;

                }
            } else if (Utility.plotReady()){
                this.skipTimer();
            }
        });

        this.pauseButton.on('pointerdown', () => {
            console.log('pause button clicked');
            this.scene.events.emit('timerPaused');
            if (this.workFlag) {
                this.scene.events.emit('pomodoroPaused');
                Utility.setWorkingState(false);
            }
            this.pauseFlag = true;
        });

        this.skipButton.on('pointerdown', () => {
            console.log('skip button clicked');
            this.scene.events.emit('timerSkipped');
            if (this.workFlag) {
                this.scene.events.emit('pomodoroSkipped');
                Utility.setWorkingState(false);
            }
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
                Utility.setWorkingState(false);
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

    loadTimer(elapsedTime) {
        if (this.timer1) {
            this.timer1.fillCircle.clear();
            this.timer1.destroy();
            this.timer1.timeString.destroy();
        }
        this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.workTime, elapsedTime, 0, this, this.pauseFlag, 0xffa500);
        this.scene.events.emit("timerPaused");
        this.pauseFlag = true;
        this.workFlag = true;
        this.timer1.updateCircle();
    }

    loadTask() {
        let task = this.scene.farm.tasks[this.scene.farm.findSelectedTaskIndex()];
        let plot = this.scene.farm.plots[this.scene.selector.plotSelected];

        this.noOfPomodoros = task.pomodoros - task.pomodorosCompleted;
        let percentageComplete = (plot.growthStage * plot.cropSprites.length + plot.growthStep) / (plot.maxFrame * plot.cropSprites.length);
        let pomodoros = task.pomodoros * percentageComplete;
        let totalTimeElapsed = this.workTime * task.pomodoros * percentageComplete;
        console.log(totalTimeElapsed);
        if (totalTimeElapsed != 0) {
            this.noOfPomodoros--;
            let timerElapsed = Math.floor(totalTimeElapsed - this.workTime * task.pomodorosCompleted);

            console.log(timerElapsed, totalTimeElapsed, percentageComplete);
            this.loadTimer(timerElapsed);
        }
    }

    skipTimer() {
        if (this.timer1){
            this.timer1.destroy();
        }
        if (this.workFlag) {
            this.scene.farm.tasks[this.scene.farm.findSelectedTaskIndex()].pomodorosCompleted ++;
        }
        this.workFlag = !this.workFlag;
        if (this.workFlag) {
            if (this.noOfPomodoros != 0) {
                Utility.setWorkingState(true);
                this.noOfPomodoros--;
                console.log("pomodoro started");
                this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.workTime, 0, 0, this, this.pauseFlag, 0xffa500);
                this.scene.events.emit('pomodoroStarted');
            } else {
                this.playButton.destroy();
                this.pauseButton.destroy();
                this.skipButton.destroy();
                Utility.setWorkingState(false);
                this.scene.events.emit('taskCompleted');
            }
        } else {
            Utility.setWorkingState(false);
            this.longBreakInterval--;
            if (this.longBreakInterval == 0) {
                this.longBreakInterval = this.initBreakInterval;
                this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.longBreakTime, 0, 0, this, this.pauseFlag, 0x228B22);
            } else {
                this.timer1 = new AnalogTimer(this.scene, this.x, this.y, this.radius, this.shortBreakTime, 0, 0, this, this.pauseFlag, 0x7CFC00);
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
    constructor(scene){
        // load playerstate from database
        this.scene = scene;
        this.coins = 0;
        this.plots = [];
        this.cropsOwned = [];
        this.furniture = [];
        this.decorations = [];
        this.animals = [];
        this.farmhouse = null;
        this.cropsOwned = [];


        let insideFarmhouseScene = this.scene.scene.get('InsideFarmhouseScene');

        let data = Utility.getUserData();
        this.userName = data.userData.usernameId;
        this.loadOwnedCrops(data.cropsOwned);
        this.createPlots(data);
        this.createTasks(data);
        this.createDecorations(data);
        this.createFarmhouse(data.userData);
        this.createFurniture(insideFarmhouseScene, data);
        this.showCoins(data.userData.coins);

    }
    loadOwnedCrops(cropsOwned) {
        this.cropsOwned = cropsOwned;
    }

    createPlots(data) {
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

            // if (along) {
            //     plotX = 165 + (100 * (i));
            //     plotY = 610;
            // } else {
            //     plotX = 165 + (100 * (i % (data.plots.length / 2)));
            //     plotY = 610 + (100 * Math.floor(i / (data.plots.length / 2)));
            // }
            //adjustable plot numbers:


            let plot = new Plot({ scene: this.scene, 
                                x: data.plots[i].x, y: data.plots[i].y, 
                                id: data.plots[i].plotId, crop: data.plots[i].crop, 
                                counter: data.plots[i].growthStage,
                                step: data.plots[i].growthStep,
                                placed: data.plots[i].placed});
            this.plots.push(plot);
        }
    }

    findSelectedTaskIndex() {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].plotId == this.scene.selector.plotSelected) {
                return i;
            }
        }
    }

    createTasks(data) {
        this.tasks = []
        for (let i =0; i < data.tasks.length; i++) {
            this.tasks.push(new Task(data.tasks[i]));
        }
    }
    
    addTask(taskConfig) {
        this.tasks.push(new Task(taskConfig));
    }

    editTask(taskConfig) {
        this.tasks[this.findSelectedTaskIndex()].updateTask(taskConfig);
    }

    createDecorations(data) {
        for(let i = 0; i < data.decorations.length; i++){
            let decoration = new Decoration({scene: this.scene, x: data.decorations[i].x, y: data.decorations[i].y, type: data.decorations[i].type, texture: data.decorations[i].type, placed: data.decorations[i].placed});
            this.decorations.push(decoration);
        }
    }

    createFarmhouse(data) {
        this.farmhouse = new Farmhouse({scene: this.scene, x: data.x, y: data.y, level: data.farmhouseLevel, texture: 'level' + data.farmhouseLevel + 'farmhouse'});
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
    }

    createFurniture(scene, data) {
        for(let i = 0; i < data.furniture.length; i++){
            let furniture = new Furniture({scene: scene, 
                                           x: data.furniture[i].x, 
                                           y: data.furniture[i].y, 
                                           type: data.furniture[i].type, 
                                           texture: data.furniture[i].type,
                                           placed: data.furniture[i].placed});
            this.furniture.push(furniture);
        }
    }

    addFurnitureToInventory(scene, type) {
        let furniture = new Furniture({scene: scene, x: -1000, y: -1000, type: type, texture: type, placed: false});
        this.furniture.push(furniture);
    }

    addDecorationToInventory(scene, type) {
        let decoration = new Decoration({scene: scene, x: -1000, y: -1000, type: type, texture: type, placed: false});
        this.decorations.push(decoration);
    }

    addPlotToInventory(scene) {
        let plot = new Plot({scene: scene, x: -1000, y: -1000, id: this.plots.length, crop: "nothing", counter: 0, placed: false});
        this.plots.push(plot);
    }

    addCropToInventory(cropsIn) {
        console.log(cropsIn.length)
        if (this.cropsOwned[cropsIn] < 0) {
            this.cropsOwned[cropsIn] = 0;
        }
        this.cropsOwned[cropsIn] ++;
        console.log(this.cropsOwned);
    }

    saveCropsOwned() {
        return this.cropsOwned;
    }

    savePlots() {
        let plotsData = [];
        for (let plot in this.plots) {
            let data = {
                usernameId: this.userName,
                plotId: plot.id,
                crop: plot.crop,
                growthStage: plot.growthStage,
                growthStep: plot.growthStep,
                x: plot.x,
                y: plot.y,
                placed: plot.placed
            }
            plotsData.push(data);
        }
        return plotsData;
    }
    saveTasks() {
        let tasksData = [];
        for (let task in this.tasks) {
            let data = {
                usernameId: this.userName,
                plotId: task.plotId,
                taskName: task.name,
                pomodoros: task.pomodoros,
                pomodorosCompleted: task.pomodorosCompleted,
                completed: task.completed,
                subtasks: task.subtasks,
                subtasksCompleted: task.subtasksCompleted,
            }
            tasksData.push(data);
        }
        return tasksData;
    }
    saveFurniture() {
        let furnitureData = [];
        for (let furniture in this.furniture) {
            let data = {
                usernameId: this.userName,
                type: furniture.type,
                x: furniture.x,
                y: furniture.y,
                placed: furniture.placed
            }
            furnitureData.push(data);
        }
        return furnitureData;
    }
    saveDecorations() {
        let decorationData = [];
        for (let decoration in this.decorations) {
            let data = {
                usernameId: this.userName,
                type: decoration.type,
                x: decoration.x,
                y: decoration.y,
                placed: decoration.placed
            }
            decorationData.push(data);
        }
        return decorationData;
    }
    saveCoins() {
        return {usernameId: this.userName, coins: this.coins};
    }

}

class Task {
    constructor(config) {
        this.plotId = config.plotId;
        this.name = config.taskName;
        this.pomodoros = config.pomodoros;
        this.pomodorosCompleted = config.pomodorosCompleted || 0;
        this.subtasks = config.subtasks || [];
        this.subtasksCompleted = config.subtasksCompleted  || [];
        this.completed = config.completed || false;
        if (this.noOfPomodors <= this.pomodorosCompleted) {
            this.completed = true;
        }
        if (this.subtasksCompleted.length == 0) {
            for (let i = 0; i < this.subtasks.length; i++) {
                this.subtasksCompleted.push(false);
            }
        }
    }

    updateTask(config) {
        this.name = config.taskName || this.name;
        if (config.pomodoros <= this.pomodorosCompleted) {
            this.completed = true;
            super.scene.events.emit("taskCompleted");
        }
        this.pomodoros = config.pomodoros || this.pomodoros;
        this.subtasks = config.subtasks || this.subtasks;
        this.subtasksCompleted = config.subtasksCompleted || this.subtasksCompleted;
        this.completed = config.completed || this.completed;
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
        this.id = config.id;
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
                this.setPosition(-1000, -1000); // move it off-screen
                this.placed = false;
                return;
            }
            if(!Utility.isEditMode() && !Utility.getWorkingState()) {
                // if occupied prompt for harvest, if unoccupied, open start task menu.
                if (this.occupied) {
                    if (this.scene.selector.plotSelected == this.id) {
                        this.scene.events.emit("editingTask");
                    }
                    else {
                        this.select();
                        this.scene.pomodoro.loadTask();
                        Utility.setPlotReady(true);
                    }
                }
                else {
                    //show menu
                    this.select();
                    this.scene.events.emit("creatingTask");
                    // listened to by the scene class
                }
            }
        });
        this.scene.add.existing(this);

        if(!this.placed) {
            this.setVisible(false); // make the sprite invisible
            this.setActive(false); // make the sprite inactive
            this.setPosition(-1000, -1000); // move it off-screen
        }
    }

    select() {
        this.scene.selector.setPosition(this.x, this.y);
        this.scene.selector.plotSelected = this.id;
        this.scene.selector.setVisible(true);
    }

    setupCrops() {
        this.crop = document.getElementById('crop').value;
        this.plantCrops();
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
        this.tick = setInterval(() => {this.progressCrops(); }, interval);
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
            //alert(`Crops finished growing in: ${this.id}`);
            return;
        }
        this.growSelectedCrop(this.findCrop()) //find and grow one of the crops
        this.stepGrowth();
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
    }

    harvest() {
        //todo: remove this once we 'lock' the plots when in pomodoro mode.
        if (this.tick) {
            clearInterval(this.tick);
        }
        //calculate coins
        let multiplier = 1;

        if (this.growthStage != this.maxFrame) {
            multiplier = 0.5;
        }
        else {
            multiplier = 1;
        }

        switch (this.crop) {
            case "sunflower":
                this.scene.farm.coins += 10 * 1.2 * this.size * this.size; 
                // scene.coinsText.setText('Coins: ' + scene.farm.coins);
                break;
            case "carrot":
                this.scene.farm.coins += 10 * 1.5 * this.size * this.size;
                // scene.coinsText.setText('Coins: ' + scene.farm.coins);
                break;
            case "tulip":
                this.scene.farm.coins += 5 * this.size * this.size;
            case "pumpkin":
                this.scene.farm.coins += 10 * 2 * this.size * this.size;
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

    }

}



class Furniture extends Phaser.GameObjects.Sprite {
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

        this.setDepth(10);

        // Add this object to the scene
        this.scene.add.existing(this);

        if(!this.placed) {
            this.setVisible(false); // make the sprite invisible
            this.setActive(false); // make the sprite inactive
            this.setPosition(-1000, -1000); // move it off-screen
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
            this.setPosition(-1000, -1000); // move it off-screen
            this.placed = false;
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
            this.setPosition(-1000, -1000); // move it off-screen
        }

        // Add a pointerdown event listener
        this.on('pointerdown', this.handleClick, this);
    }

    handleClick() {
        if (Utility.isDeleteMode()) {
            this.wasDeleted = true;
            this.setVisible(false); // make the sprite invisible
            this.setActive(false); // make the sprite inactive
            this.setPosition(-1000, -1000); // move it off-screen
            this.placed = false;
        }
    }
}

class Farmhouse extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.texture);

        // Set the type of this furniture
        this.level = config.level;

        // Store a reference to the scene
        this.scene = config.scene;

        // Whether or not the furniture is currently placed on the scene
        this.placed = true;

        this.wasDeleted = false;

        // Enable input for this object
        this.setInteractive({ draggable: true });

        // Add a hover effect to the furniture
        Utility.addTintOnHover(this);

        // Add this object to the scene
        this.scene.add.existing(this);


        // Add a pointerdown event listener
        this.on('pointerdown', this.handleClick, this);

        if(this.level === 2) {
            this.anims.play('level2farmhouseAnimation');
        }
    }

    handleClick() {
        let insideFarmhouseScene = this.scene.scene.get('InsideFarmhouseScene');
        insideFarmhouseScene.toggleHideScene(this.scene);
    }

    // Upgrade the farmhouse to the next level
    upgrade() {
        this.level++;
        this.setTexture('level' + this.level + 'farmhouse');
        this.anims.play('level' + this.level + 'farmhouseAnimation');
    }
}