//import UserData from "../../connection/UserData.js"
//""
// 在togglemenu中了chart
export default class Utility {
    static editMode = false;
    static deleteMode = false;
    static working = false;
    static isPlotReady = false;

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

        switch(menu) {
            case "taskMenu":
                dialogContainer = document.querySelector('.menu-container.task-menu');
                dialog = document.querySelector('.menu.task-menu');
                break;
            case "taskSettings":
                dialogContainer = document.querySelector('.menu-container.task-menu');
                dialog = document.querySelector('.menu.task-menu');
                break;
            case "cropShop":
                dialogContainer = document.querySelector('.menu-container.shop-menu');
                dialog = document.querySelector('.menu.shop-menu');
                break;
            case "furnitureMenu":
                dialogContainer = document.querySelector('.menu-container.furniture-menu');
                dialog = document.querySelector('.menu.furniture-menu');
                break;
            case "decorationPlotMenu":
                dialogContainer = document.querySelector('.menu-container.decoration-plot-menu');
                dialog = document.querySelector('.menu.decoration-plot-menu');
                break;
            case "furnitureShopMenu":
                dialogContainer = document.querySelector('.menu-container.furniture-shop-menu');
                dialog = document.querySelector('.menu.furniture-shop-menu');
                break;
            case "decorationShopMenu":
                dialogContainer = document.querySelector('.menu-container.decoration-shop-menu');
                dialog = document.querySelector('.menu.decoration-shop-menu');
                break;
            case "plotShopMenu":
                dialogContainer = document.querySelector('.menu-container.plots-shop-menu');
                dialog = document.querySelector('.menu.plots-shop-menu');
                break;
            case "settingsMenu":
                dialogContainer = document.querySelector('.menu-container.settings-menu');
                dialog = document.querySelector('.menu.settings-menu');
                break;
            case "homeMenu":
                dialogContainer = document.querySelector('.menu-container.home-menu');
                dialog = document.querySelector('.menu.home-menu');
                break;
            case "window":
                dialogContainer = document.querySelector('.menu-container.chart-menu');
                dialog = document.querySelector('.menu.chart-menu');
                break;
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

    static throwConfirmationScreen (scene, action, prompt, promptNote) {
        let dialogContainer = document.querySelector('.menu-container.confirmation');
        let dialog = document.querySelector('.menu.confirmation');
        let acceptButton = document.getElementById('accept-confirmation');
        let denyButton = document.getElementById('deny-confirmation');
        let messagePara = document.getElementById('confirmation-message');
        let notePara = document.getElementById('confirmation-note');
        const closeWindow = (event) => {
            acceptButton.removeEventListener('click', closeWindow);
            denyButton.removeEventListener('click', closeWindow);
            dialogContainer.style.display = 'none';
            dialog.close();
            scene.sys.game.input.enabled = true;
            if (event.srcElement.id == "accept-confirmation") {
                if (action == "harvestCrops") {
                    scene.events.emit(action);
                }
                else if (action = "deleteAccount") {
                    //this.deleteAccount();
                    this.chuckUserOut();
                }
            }
        }
        messagePara.innerHTML = prompt;
        notePara.innerHTML = promptNote;
        dialogContainer.style.display = 'block';
        dialog.showModal();
        scene.sys.game.input.enabled = false;
        acceptButton.addEventListener('click', closeWindow);
        denyButton.addEventListener('click', closeWindow);
    }

    static chuckUserOut() {
        window.location.href = "../landing.html";
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
                {crop:"tulip", count: -1}
            ],

            "plots": [
              {"plotId": 0, "crop": "sunflower", "growthStage": 10, "growthStep": 12, "x": 176, "y": 616, "placed": true},
              {"plotId": 1, "crop": "tulip", "growthStage": 9, "growthStep": 12, "x": 272, "y": 616, "placed": true},
              {"plotId": 2, "crop": "carrot",  "growthStage": 1, "growthStep": 2, "x": 368, "y": 616, "placed": true},
              {"plotId": 3, "crop": "nothing", "growthStage": 0, "growthStep": 0, "x": 464, "y": 616, "placed": true},
            ],
            "tasks": [
                {"plotId": 0, "taskName": "Maths Homework", "pomodoros": 3, "completed": true, "subtasks": ["week 7", "week 8"]},
                {"plotId": 1, "taskName": "Operating Systems CW", "pomodoros": 3, "completed": true, "subtasks": ["download files", "start work", "catch up on notes bruh"], "subtasksCompleted": [true,false,false]},
                {"plotId": 2, "taskName": "go to bed", "pomodoros": 1, "completed": false, "subtasks": ["tidy desk", "brush teeth", "get changed", "go piss girl"], "subtasksCompleted": [true,false,false,false]},
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
            "farmhouse":
                {"level": 1, "x": 70, "y": 570}
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

    static updateTaskProgress(plotID, step) {

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

    static getWorkingState() {
        return this.working;
    }
    static setWorkingState(state) {
        this.working = state;
    }

    static plotReady() {
        return this.isPlotReady;
    }
    static setPlotReady(state) {
        this.isPlotReady = state;
    }
}
