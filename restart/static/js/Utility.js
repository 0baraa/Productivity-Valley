//import UserData from "../../connection/UserData.js"
//""
// 在togglemenu中了chart
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
        else if(menu === "decorationPlotMenu") {
            dialogContainer = document.querySelector('.menu-container.decoration-plot-menu');
            dialog = document.querySelector('.menu.decoration-plot-menu');
        }
        else if(menu === "furnitureShopMenu") {
            dialogContainer = document.querySelector('.menu-container.furniture-shop-menu');
            dialog = document.querySelector('.menu.furniture-shop-menu');
        }

        else if(menu === "window"){
            dialogContainer = document.querySelector('.menu-container.chart-menu');
            dialog = document.querySelector('.menu.chart-menu');
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
        // if (dialog) { // 确保 dialog 不是 undefined 或 null
        //     if (dialog.open) { // 这里假设 dialog 是一个 <dialog> 元素
        //         dialogContainer.style.display = 'none';
        //         dialog.close();
        //         scene.sys.game.input.enabled = true;
        //     } else {
        //         dialogContainer.style.display = 'block';
        //         dialog.showModal(); // 显示 <dialog> 元素
        //         scene.sys.game.input.enabled = false;
        //     }
        // } else {
        //     console.error('Dialog element not found for menu:', menu);
        // }

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
            //plots should have coordinates saved also
            "plots": [
              {"id": 1, "crop": "sunflower", "growthStage": 3, "task": "Maths Homework", "x": 176, "y": 616, "placed": true},
              {"id": 2, "crop": "sunflower", "growthStage": 9, "task": "Computation Catchup", "x": 272, "y": 616, "placed": true},
              {"id": 3, "crop": "carrot", "growthStage": 2, "x": 368, "y": 616, "placed": true},
              {"id": 4, "crop": "nothing", "growthStage": 0, "x": 464, "y": 616, "placed": true},
            ],
            "furniture": [
              {"type": "carpet1", "x": 320, "y": 612, "placed": true},
              {"type": "bookshelf", "x": 281, "y": 580, "placed": true},
              {"type": "coatrack", "x": 350, "y": 580, "placed": true},
              {"type": "plant", "x": 245, "y": 590, "placed": true},
              {"type": "table2", "x": 400, "y": 590, "placed": false}
            ],
            "decorations": [
                {"type": "snowman", "x":50, "y":700, "placed": true}
            ],
            "farmhouse":[
                {"level": 1, "x": 70, "y": 570}
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
