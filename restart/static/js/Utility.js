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
            case "alertWindow":
                dialogContainer = document.querySelector('.menu-container.alertWindow');
                dialog = document.querySelector('.menu.alertWindow');
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
            "userData": 
                {"usernameId": "noobmaster69", "coins": 300, "farmhouseLevel": 1, "x": 70, "y": 570},
            "cropsOwned": {
                tomato: -1,
                sunflower: -1,
                carrot: -1,
                pumpkin: -1,
                tulip: -1
            },

            "plots": [
              {"plotId": 0, "crop": "sunflower", "growthStage": 9, "growthStep": 24, "x": 176, "y": 616, "placed": true}, 
              {"plotId": 1, "crop": "tulip", "growthStage": 9, "growthStep": 35, "x": 272, "y": 616, "placed": true}, 
              {"plotId": 2, "crop": "carrot",  "growthStage": 1, "growthStep": 24, "x": 368, "y": 616, "placed": true},
              {"plotId": 3, "crop": "nothing", "growthStage": 0, "growthStep": 0, "x": 464, "y": 616, "placed": true},
            ],
            "tasks": [
                {"plotId": 0, "taskName": "Maths Homework", "pomodoros": 3, "pomodorosCompleted": 3, "completed": true, "subtasks": ["week 7", "week 8"]},
                {"plotId": 1, "taskName": "Operating Systems CW", "pomodoros": 3, "pomodorosCompleted": 2, "completed": false, "subtasks": ["download files", "start work", "catch up on notes bruh"], "subtasksCompleted": [true,false,false]},
                {"plotId": 2, "taskName": "go to bed", "pomodoros": 1, "pomodorosCompleted": 0, "completed": false, "subtasks": ["tidy desk", "brush teeth", "get changed", "go piss girl"], "subtasksCompleted": [true,false,false,false]},
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
            ]
          }

          return this.data;
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
