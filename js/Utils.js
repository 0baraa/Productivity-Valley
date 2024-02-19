export default class Utils {

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
}