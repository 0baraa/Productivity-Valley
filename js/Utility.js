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
}