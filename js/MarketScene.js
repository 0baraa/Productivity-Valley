import Utility from "./Utility.js";

export default class MarketScene extends Phaser.Scene { 
    constructor() {
        super({ key: 'MarketScene' });
    }


    preload () {
        this.load.image('marketBackground', '../assets/market-background.png');
        this.load.image('mountains-market', '../assets/mountains-market.png');
        this.load.image('farmSign', '../assets/farm-sign.png');
        this.load.image('cropShop', '../assets/market/market_stall_seeds.png');
        this.load.image('furnitureShop', '../assets/market/furnituresale.png')
    }


    create () {
        // Hide edit button
        let editButton = document.getElementById('edit-button');
        editButton.style.display = 'none';

        
        //Set camera zoom to 2x as canvas size of farmhouse interior is 320px wide, rather than 640px
        this.cameras.main.setZoom(2);

        this.add.image(320, 583, 'marketBackground');
        this.add.image(320, 559, 'mountains-market');
        //instantiate all the shops
        this.cropShop = new Shop({scene: this, x:320, y:580, sprite:'cropShop'});

        // this.furnitureShop = new Shop({scene: this, x: 438, y: 610, sprite:'furnitureShop'});
        this.furnitureShop = this.add.sprite(438, 610, 'furnitureShop');
        this.furnitureShop.setInteractive();
        Utility.addTintOnHover(this.furnitureShop);
        this.furnitureShop.on('pointerdown', () => {
            Utility.toggleMenu(this, 'furnitureShopMenu');
        });
        //this.furnitureShop = new Shop({scene: this, x: 400, y: 620, sprite:'furnitureShop'});

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

        let furnitureShopExitButton = document.getElementById('furniture-shop-exit-button');
        furnitureShopExitButton.addEventListener('click', () => {
            // Clear the furniture container
            // let furnitureContainer = document.getElementById('furniture-container');
            // while (furnitureContainer.firstChild) {
            //     furnitureContainer.removeChild(furnitureContainer.firstChild);
            // }
            Utility.toggleMenu(this, "furnitureShopMenu");
        });
    }
}

class Shop extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene,config.x,config.y,config.sprite);

        this.setInteractive();
        Utility.addTintOnHover(this);
        const self = this;
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
        for (let i = 0; i < data.cropsOwned.length; i++) {
            if(parseInt(data.cropsOwned[i].count) >= 0) {
                this.displayedItems.push(new Item(data.cropsOwned[i].crop, "bags"));

                //set price to be lower
            }
            else {
                this.displayedItems.push(new Item(data.cropsOwned[i].crop, "bags"));
                //set price to be higher
            }
        }
        
    }
    
    updateAffordability() {
        const self = this;
        let data = Utility.getUserData();
        let buyListener = function thingy() {}
        for (let i = 0; i < this.displayedItems.length; i++) {
            for (let j = 0; j < this.displayedItems[i].buttons.length; j++) {
                buyListener = function thingy(event) {
                    self.buyCropEvent(event,self.displayedItems[i].prices[j])
                }
                if (this.displayedItems[i].prices[j] <= data.coins) {
                    this.displayedItems[i].buttons[j].onclick = buyListener;
                    this.displayedItems[i].buttons[j].style.cursor = "pointer";
                    this.displayedItems[i].buttons[j].style.backgroundColor = "#d39f20";
                }
                else {
                    this.displayedItems[i].buttons[j].onclick = null;
                    this.displayedItems[i].buttons[j].style.cursor = "default";
                    this.displayedItems[i].buttons[j].style.backgroundColor = "grey";
                }
            }
        }
    }

    removeItemListeners() {
        const self = this;
        for (let i = 0; i < this.displayedItems.length; i++) {
            for (let j = 0; j < this.displayedItems[i].buttons.length; j++) {
                this.displayedItems[i].buttons[j].onclick = null;
            }
        }
    }

    buyCropEvent(event,price) {
        console.log("bought " + event.target.className + " x" + event.target.id + " for " + price + " coins");
        Utility.buySeeds(event.target.className,event.target.id,price);
        this.removeItemListeners();
        this.updateAffordability();
    }
}

class Item {
    // represents a seedbag from the html
    constructor(name, type) {
        const self = this;
        this.name = name;
        this.type = "-" + type || "";
        this.buttons = document.getElementsByClassName(this.name+this.type);
        this.price_tags = document.getElementsByClassName(this.name+"-price");
        this.prices = [];
        for (let i = 0; i < this.buttons.length; i++) {
            this.prices.push(this.price_tags[i].innerHTML);
        }
    }
}