import FarmScene from "./farmScene.js";

const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 1200,
    pixelArt: true,
    scene: [FarmScene],
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let game = new Phaser.Game(config);