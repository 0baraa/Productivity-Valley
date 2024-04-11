import Utility from "./Utility.js";

export default class MarketScene extends Phaser.Scene { 
    constructor() {
        super({ key: 'MarketScene' });
    }

    preload() {
        const loadStatic = (key, file) => this.load.image(key, STATIC_URL + file);

        loadStatic('marketBackground', 'assets/market-background.png');
        loadStatic('mountains-market', 'assets/mountains-market.png');
        loadStatic('farmSign', 'assets/farm-sign.png');
        loadStatic('cropShop', 'assets/market/market_stall_seeds.png');
        loadStatic('furnitureShop', 'assets/market/furniture-shop.png');
        loadStatic('decorationShop', 'assets/market/decoration-shop.png');
        loadStatic('plotShop', 'assets/market/plots-shop.png');

    }

    create () {
        // Hide edit button
        let editButton = document.getElementById('edit-button');
        editButton.style.display = 'none';

        this.farm = this.scene.get('FarmScene').farm;

        this.allFurniture = [
            { type: 'bookshelf', price: 100 },
            { type: 'carpet1', price: 100 },
            { type: 'chair', price: 100 },
            { type: 'couch', price: 100 },
            { type: 'fridge', price: 100 },
            { type: 'grandfather-clock', price: 100 },
            { type: 'kitchen-sink', price: 100 },
            { type: 'lamp', price: 100 },
            { type: 'table', price: 100 },
            { type: 'bathtub', price: 100 },
            { type: 'toilet', price: 100 },
            { type: 'bookshelf2', price: 100 },
            { type: 'coatrack', price: 100 },
            { type: 'mirror', price: 100 },
            { type: 'cooker', price: 100 },
            { type: 'plant', price: 100 },
            { type: 'roundtable', price: 100 },
            { type: 'sink', price: 100 },
            { type: 'smallbookshelf', price: 100 },
            { type: 'smallcouch', price: 100 },
            { type: 'table2', price: 100 },
            { type: 'vinylplayer', price: 100 },
            { type: 'fireplace', price: 100 }
        ];

        this.allDecorations = [
            { type: 'snowman', price: 100 },
            { type: 'gnome', price: 100 },
        ];

        //Set camera zoom to 2x as canvas size of farmhouse interior is 320px wide, rather than 640px
        this.cameras.main.setZoom(2);

        this.add.image(320, 583, 'marketBackground');
        this.add.image(320, 559, 'mountains-market');
        //instantiate all the shops
        this.cropShop = new Shop({scene: this, farm: this.farm, x:360, y:580, sprite:'cropShop'});

        this.furnitureShop = this.add.sprite(438, 610, 'furnitureShop');
        this.furnitureShop.setInteractive();
        Utility.addTintOnHover(this.furnitureShop);


        this.furnitureShop.on('pointerdown', () => {
            let furnitureContainer = document.getElementById('furniture-shop-container');


            let userFurniture = []
            for(let furniture of this.farm.furniture) {
                userFurniture.push(furniture.type);
            }

            // lockedFurniture contains furniture which the user does not currently own
            let lockedFurniture = this.allFurniture.filter(furniture => !userFurniture.includes(furniture.type));

            for(let furniture of lockedFurniture) {
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
                furnitureButton.classList.add('price-button');
                furnitureButton.id = furniture.type + '-shop-button';
                furnitureButton.textContent = furniture.price;

                buttonDiv.appendChild(furnitureButton);
                furnitureDiv.appendChild(furnitureImg);
                furnitureDiv.appendChild(buttonDiv);
                furnitureContainer.appendChild(furnitureDiv);
            }

            for(let furniture of lockedFurniture) {
                let furnitureButton = document.getElementById(furniture.type + '-shop-button');
                if(furnitureButton) [
                    furnitureButton.onclick = () => {
                        // if this.farm.coins >= furniture.price (using true for testing)
                        if(this.farm.getCoins() >= furniture.price) {
                            this.farm.updateCoins(-furniture.price);
                            let insideFarmhouseScene = this.scene.get('InsideFarmhouseScene');
                            let farmScene = this.scene.get('FarmScene');
                            farmScene.farm.addFurnitureToInventory(insideFarmhouseScene, furniture.type);
                            let furnitureShopContainer = document.getElementById('furniture-shop-container');
                            while (furnitureShopContainer.firstChild) {
                                furnitureShopContainer.removeChild(furnitureShopContainer.firstChild);
                            }

                            Utility.toggleMenu(this, 'furnitureShopMenu');
                        }
                    }
                ]
            }

            Utility.toggleMenu(this, 'furnitureShopMenu');

        });

        this.decorationsShop = this.add.sprite(280, 600, 'decorationShop');
        this.decorationsShop.setInteractive();
        Utility.addTintOnHover(this.decorationsShop);

        this.decorationsShop.on('pointerdown', () => {
            let decorationContainer = document.getElementById('decoration-shop-container');

            let userDecorations = []
            for(let decoration of this.farm.decorations) {
                userDecorations.push(decoration.type);
            }

            // lockedDecorations contains decorations which the user does not currently own
            let lockedDecorations = this.allDecorations.filter(decoration => !userDecorations.includes(decoration.type));

            for(let decoration of lockedDecorations) {
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
                decorationButton.classList.add('price-button');
                decorationButton.id = decoration.type + '-shop-button';
                decorationButton.textContent = decoration.price;

                buttonDiv.appendChild(decorationButton);
                decorationDiv.appendChild(decorationImg);
                decorationDiv.appendChild(buttonDiv);
                decorationContainer.appendChild(decorationDiv);
            }

            for(let decoration of lockedDecorations) {
                let decorationButton = document.getElementById(decoration.type + '-shop-button');
                if(decorationButton) {
                    decorationButton.onclick = () => {
                        // if this.farm.coins >= decoration.price (using true for testing)
                        if(this.farm.getCoins() >= decoration.price) {
                            this.farm.updateCoins(-decoration.price);
                            let farmScene = this.scene.get('FarmScene');
                            farmScene.farm.addDecorationToInventory(farmScene, decoration.type);
                            let decorationShopContainer = document.getElementById('decoration-shop-container');
                            while (decorationShopContainer.firstChild) {
                                decorationShopContainer.removeChild(decorationShopContainer.firstChild);
                            }

                            Utility.toggleMenu(this, 'decorationShopMenu');
                        }
                    }
                }
            }

            Utility.toggleMenu(this, 'decorationShopMenu');

        });

        this.plotShop = this.add.sprite(320, 650, 'plotShop');
        this.plotShop.setInteractive();
        Utility.addTintOnHover(this.plotShop);

        this.plotShop.on('pointerdown', () => {
            let plotContainer = document.getElementById('plots-shop-container');

            let numOfLockedPlots = 8 - this.farm.plots.length;

            for(let i = 0; i < numOfLockedPlots; i++) {
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
                plotButton.classList.add('price-button');
                plotButton.id = 'plot' + i + '-shop-button';
                plotButton.textContent = 250;

                buttonDiv.appendChild(plotButton);
                plotDiv.appendChild(plotImg);
                plotDiv.appendChild(buttonDiv);
                plotContainer.appendChild(plotDiv);
            }

            for(let i = 0; i < numOfLockedPlots; i++) {
                let plotButton = document.getElementById('plot' + i + '-shop-button');
                if(plotButton) {
                    plotButton.onclick = () => {
                        // if this.farm.coins >= 250 (using true for testing)
                        if(this.farm.getCoins() >= 250) {
                            this.farm.updateCoins(-250);
                            let farmScene = this.scene.get('FarmScene');
                            farmScene.farm.addPlotToInventory(farmScene);
                            let plotShopContainer = document.getElementById('plots-shop-container');
                            while (plotShopContainer.firstChild) {
                                plotShopContainer.removeChild(plotShopContainer.firstChild);
                            }

                            Utility.toggleMenu(this, 'plotShopMenu');
                        }
                    }
                }
            }


            Utility.toggleMenu(this, 'plotShopMenu');
        });







        this.farmSign = this.add.sprite(200, 610, 'farmSign');
        this.farmSign.setInteractive();
        Utility.addTintOnHover(this.farmSign);

        //Swtich to farm scene when door is clicked
        this.farmSign.on('pointerdown', () => {
            this.scene.stop();
            // Show edit button
            editButton.style.display = 'inline';
            //Re-enable input for farm scene
            this.scene.get('FarmScene').input.enabled = true;
        });
    }
}

class Shop extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene,config.x,config.y,config.sprite);

        this.setInteractive();
        Utility.addTintOnHover(this);
        const self = this;
        this.farm = config.farm;
        this.on('pointerdown', () => {
            Utility.toggleMenu(config.scene, config.sprite);
            //let table = document.querySelector("menu-container.shop-menu");
            if(config.sprite == "cropShop"){
                this.table = document.getElementById('seed-menu');
                this.setSeeds();
                this.updateAffordability();
            }
            else {
                this.table = document.getElementById('empty-shop-table');
            }
            this.table.style.display = "block";

            let taskExitButton = document.getElementById('shop-exit-button');
            const exitHandler = function(event) {
                console.log(event);
                Utility.toggleMenu(config.scene, config.sprite);
                self.table.style.display = "none";
                self.removeItemListeners();
                self.displayedItems = [];
                taskExitButton.removeEventListener("mousedown", exitHandler);
            }
            taskExitButton.addEventListener("mousedown", exitHandler);
        })
        config.scene.add.existing(this);
    }

    setSeeds() {
        let data = Utility.getUserData();
        this.displayedItems = [];
        //create buycrop methods using class driven items
        for (let i = 0; i < cropsOwned.length; i++) {
            if(parseInt(cropsOwned[i][1]) >= 0) {
                this.displayedItems.push(new Item(cropsOwned[i][0]));

                //set price to be lower
            }
            else {
                this.displayedItems.push(new Item(cropsOwned[i][0], 3));
                //set price to be higher
            }
        }

    }

    updateAffordability() {
        const self = this;
        let coins = this.farm.getCoins();
        let buyListener = function thingy() {}
        for (let i = 0; i < this.displayedItems.length; i++) {
            
                buyListener = function thingy(event) {
                self.buyCropEvent(event,self.displayedItems[i].price)
                }
            if (this.displayedItems[i].price <= coins) {
                this.displayedItems[i].button.onclick = buyListener;
                this.displayedItems[i].button.style.cursor = "pointer";
                this.displayedItems[i].button.style.backgroundColor = "#d39f20";
                }
                else {
                this.displayedItems[i].button.onclick = null;
                this.displayedItems[i].button.style.cursor = "default";
                this.displayedItems[i].button.style.backgroundColor = "grey";
            }
        }
    }

    removeItemListeners() {
        const self = this;
        for (let i = 0; i < this.displayedItems.length; i++) {
            this.displayedItems[i].button.onclick = null;
        }
    }

    buyCropEvent(event,price) {
        let crop = event.target.className;
        if (event.target.className.slice(4) == "coin") {
            crop.slice(5)
        }
        console.log(crop);
        //console.log("bought " + crop + " x" + event.target.id + " for " + price + " coins");
        this.farm.updateCoins(-price);
        this.farm.addCropToInventory(crop);
        //this.removeItemListeners();
        this.updateAffordability();
    }
}

class Item {
    // represents a seedbag from the html
    constructor(name, multiplier) {
        const self = this;
        console.log(name);
        this.name = name;
        this.multiplier = multiplier || 1;
        this.button = document.getElementById(this.name+"-button");
        this.buttonPrice = this.button.getElementsByTagName("span")[0];
        this.price = 0;
        console.log(this.price , this.buttonPrice);
        if (this.button) {
            if (this.multiplier != 1 && this.buttonPrice.innerText <= 50) {
                this.buttonPrice.innerText = this.buttonPrice.innerText * this.multiplier;
            }
            this.price = this.buttonPrice.innerText;
            console.log(this.price)
        }
    }
}