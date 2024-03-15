import Utility from "./Utility.js";

export default class MarketScene extends Phaser.Scene { 
    constructor() {
        super({ key: 'MarketScene' });
    }


    preload () {
        this.load.image('marketBackground', '../assets/market-background.png');
        this.load.image('farmSign', '../assets/farm-sign.png');
        this.load.image('cropShop', '../assets/market/market_stall_seeds.png');
    }


    create () {
        
        //Set camera zoom to 2x as canvas size of farmhouse interior is 320px wide, rather than 640px
        this.cameras.main.setZoom(2);

        this.add.image(320, 600, 'marketBackground');

        //instantiate all the shops
        this.cropShop = new Shop({scene: this, x:320, y:600, sprite:'cropShop'});

        //this.furnitureShop = new Shop({scene: this, x: 400, y: 620, sprite:'furnitureShop'});

        this.farmSign = this.add.sprite(200, 630, 'farmSign');
        this.farmSign.setInteractive();
        Utility.addTintOnHover(this.farmSign);

        //Swtich to farm scene when door is clicked
        this.farmSign.on('pointerdown', () => {
            this.scene.stop();
            //Re-enable input for farm scene
            this.scene.get('FarmScene').input.enabled = true;
        });
    }
    buyCropShop(crop,amount,price) {
        this.cropShop.buy(crop,amount,price);
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

    removeItemListeners() {
        for (let i; i < this.displayedItems.length; i++) {
            for (let j; j < this.displayedItems[i].buttons.length; j++) {
                this.displayedItems[i].buttons[j].removeEventListener("click", this.displayedItems[i].buyCrop);
            }
        }
    }

    buy(crop, amount, price) {
        console.log("bought " + crop + " x" + amount + " for " + price + " coins");
        console.log(this.displayedItems);
        Utility.buySeeds(crop, amount, price)
        //this.removeItemListeners();
        for (let item in this.displayedItems) {
            item.updateAffordabilityOptions();
        }
    }
    
}

class Item {
    // represents a seedbag from the html
    constructor(name, type) {
        const self = this;
        this.name = name;
        this.buttons = document.getElementsByClassName(this.name+"-"+type);
        this.price_tags = document.getElementsByClassName(this.name+"-price");
        this.prices = [];
        for (let i = 0; i < this.buttons.length; i++) {
            this.prices.push(this.price_tags[i].innerHTML);
            this.updateAffordabilityOptions();
        }
    }

    updateAffordabilityOptions() {
        //sets affordability of all seeds
        let data = Utility.getUserData();
        const self = this;
        for (let i = 0; i < this.buttons.length; i++) {
            if(this.prices[i] <= data.coins) {
                this.buttons[i].addEventListener("click", function buyListener (event) {console.log("clicked");self.buyCrop(event,self.prices[i])});
                this.buttons[i].disabled == false;
            }
            else {
                this.buttons[i].disabled == true;
                this.buttons[i].removeEventListener("click", function buyListener (event) {self.buyCrop(event,self.prices[i])});
            }
        }
    }

    buyCrop(event,price) {
        Utility.buySeeds(event.target.className,event.target.id,price);

    }
}