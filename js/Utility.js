export default class Utility {

    static toggleFullscreen() {
        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen();
        }
        else {
            document.exitFullscreen();
        }
    }

    static addTintOnHover(sprite) {
        sprite.on('pointerover', () => {
            sprite.setTint(0xdddddd); // Set tint to light grey
        });
        
        sprite.on('pointerout', () => {
            sprite.clearTint(); // Clear tint
        });
    }

    static toggleMenu(scene, menu) {

        let dialogContainer;
        let dialog;
        
        if(menu === "taskMenu") {
            dialogContainer = document.querySelector('.menu-container.task-menu');
            dialog = document.querySelector('.menu.task-menu');
        }
        // else if (menu === "furnitureMenu") {
        else if (menu == "cropShop") {
            dialogContainer = document.querySelector('.menu-container.shop-menu');
            dialog = document.querySelector('.menu.shop-menu');
        }
    

        
        if (dialog.open) {
            dialogContainer.style.display = 'none';
            dialog.close();
            scene.sys.game.input.enabled = true;
        } 
        else {
            // Change the display style of the dialog's container to 'block'
            dialogContainer.style.display = 'block';
        
            // Show the dialog
            dialog.showModal();

            scene.sys.game.input.enabled = false;
        }
    }

    static getUserData() {
        // Called in create method of FarmScene
        // Fetches user data from the backend
        // Then formats data in appropriate way
        // This data is used to create a PlayerFarm object, which is then displayed
    
    
        // Using mock data for now until backend is implemented
        let data = {
            "coins": 300,
            "cropsOwned": [
                {crop: "tomato", count: 3},
                {crop:"sunflower", count: 1},
                {crop:"carrot", count: 2},
                {crop:"pumpkin", count: -1},
                {crop:"flower", count: -1}
            ],
            "plots": [
              {"id": 1, "crop": "sunflower", "growthStage": 3, "task": "Maths Homework"}, 
              {"id": 2, "crop": "sunflower", "growthStage": 9, "task": "Computation Catchup"}, 
              {"id": 3, "crop": "carrot", "growthStage": 2},
              {"id": 4, "crop": "carrot", "growthStage": 6},
              {"id": 5, "crop": "nothing", "growthStage": 0},
              {"id": 6, "crop": "nothing", "growthStage": 0},
              {"id": 7, "crop": "nothing", "growthStage": 0},
              {"id": 8, "crop": "sunflower", "growthStage": 10}
            ],
            "furniture": [
              {"type": "carpet1", "x": 320, "y": 612},
              {"type": "bookshelf", "x": 281, "y": 580},
              {"type": "fridge", "x": 193, "y": 580},
              {"type": "grandfatherClock", "x": 246, "y": 580},
              {"type": "kitchenSink", "x": 408, "y": 600},
              {"type": "chair", "x": 210, "y": 650},
              {"type": "table", "x": 192, "y": 650},
              {"type": "lamp", "x": 345, "y": 580},
              {"type": "toilet", "x": 452, "y": 658},
              {"type": "bathtub", "x": 370, "y": 660},
              {"type": "fireplace", "x": 221, "y": 565}
            ]
          }
    
          return data;
    }
    static getPlotData() {
        //get plot data specifically
    }
    static getFurnitureData() {
        //get furniture data specifically
    }
    static getCropOwnedData() {
        //get owned crops data
    }

    static setUserData() {}
}