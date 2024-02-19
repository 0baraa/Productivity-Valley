import FarmScene from "./FarmScene.js";
import InsideFarmhouseScene from "./InsideFarmhouseScene.js";
import MarketScene from "./MarketScene.js";


const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 1200,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // Top down game, no gravity
        }
    },
    scene: [FarmScene, InsideFarmhouseScene, MarketScene],
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let game = new Phaser.Game(config);