//import UserData from "../../connection/UserData.js"
//""
export default class Utility {
    static editMode = false;
    static deleteMode = false;

    static toggleEditMode() {
        this.editMode = !this.editMode;
    }

    static isEditMode() {
        return this.editMode;
    }

    static toggleDeleteMode() {
        this.deleteMode = !this.deleteMode;
    }

    static isDeleteMode() {
        return this.deleteMode;
    }

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
            if(this.isDeleteMode()) {
                sprite.setTint(0xff0000); // Set tint to red
            }
            else {
                sprite.setTint(0xdddddd); // Set tint to light grey
            }
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
        else if (menu === "cropShop") {
            dialogContainer = document.querySelector('.menu-container.shop-menu');
            dialog = document.querySelector('.menu.shop-menu');
        }
        else if (menu === "furnitureMenu") {
            dialogContainer = document.querySelector('.menu-container.furniture-menu');
            dialog = document.querySelector('.menu.furniture-menu');
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
        this.data = {
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
            //   {"id": 4, "crop": "carrot", "growthStage": 6},
            //   {"id": 5, "crop": "nothing", "growthStage": 0},
            //   {"id": 6, "crop": "nothing", "growthStage": 0},
              {"id": 7, "crop": "nothing", "growthStage": 0},
              {"id": 8, "crop": "sunflower", "growthStage": 10}
            ],
            "furniture": [
              {"type": "carpet1", "x": 320, "y": 612},
              {"type": "bookshelf", "x": 281, "y": 580},
              {"type": "fridge", "x": 193, "y": 580},
              {"type": "grandfather-clock", "x": 246, "y": 580},
              {"type": "kitchen-sink", "x": 408, "y": 600},
              {"type": "chair", "x": 210, "y": 650},
              {"type": "table", "x": 192, "y": 650},
              {"type": "lamp", "x": 345, "y": 580},
              {"type": "toilet", "x": 452, "y": 658},
              {"type": "bathtub", "x": 370, "y": 660},
              {"type": "fireplace", "x": 221, "y": 565}
            ]
          }
    
          return this.data;
    }

    static sendCreatedTaskData() {
        let form = document.getElementById("task-form");
        let taskName = form.taskName.value;
        let time = form.minutes.value;
        let repetitions = form.repetitions.value;
        let crop = form.crop.value;
        let subtaskCheck = document.getElementById("subtasks-query").checked;
        let savePreset = document.getElementById("save-preset").checked;
        let task = {name: taskName, time: time, repetitions: repetitions, crop: crop};
        if (subtaskCheck) {
            //add subtasks to save;
            let subtasks = document.getElementsByClassName("subtask");
            let subtasklist = []
            for (let i = 0; i<subtasks.length; i++) {
                if (subtasks[i].value != "") {
                    subtasklist.push(subtasks[i].value);
                }
            }
            task.subtasks = subtasklist;
        }
        if (savePreset) {
            //save to player's presets.
        }
        console.log(task);

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

    static buySeeds(type, amount, price) {
        //get data from database
        let add = true;
        for (let i = 0; i < this.data.cropsOwned.length; i++) {
            if (type == this.data.cropsOwned[i].type) {
                this.data.cropsOwned[i].count += amount;
                add = false;
            }
        }
        if (add) {
            //update database.
            this.data.cropsOwned.push({crop: type, count: amount});
        }
        this.data.coins -= price;
        console.log(this.data.coins);
    }
}