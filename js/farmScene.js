let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 1200,
    pixelArt: true,
    scene: {
        preload: preload,
        create: create
    },
    scale: {
        mode: Phaser.Scale.ENVELOP,
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
};

let game = new Phaser.Game(config);

function preload ()
{
    // this.load.bitmapFont('pixelFont', '../fonts/dogicabitmap.png', '../fonts/dogicabitmap.xml');

    this.load.image('farmBackground', '../assets/farm-background.png');
    this.load.spritesheet('farmhouseSpritesheet', '../assets/farmhouse-animation.png', { frameWidth: 80, frameHeight: 128 });
    this.load.image('cloud1', '../assets/cloud1.png');
    this.load.image('cloud2', '../assets/cloud2.png');
    this.load.image('cloud3', '../assets/cloud3.png');
}

function create ()
{




    this.add.image(320, 600, 'farmBackground');

    this.anims.create({
        key: 'farmhouseAnimation',
        frames: this.anims.generateFrameNumbers('farmhouseSpritesheet', { start: 0, end: 4 }),
        frameRate: 6,
        repeat: -1 // Repeat indefinitely
    });


    let farmhouse = this.add.sprite(128, 624, 'farmhouseSpritesheet');
    farmhouse.anims.play('farmhouseAnimation');
    farmhouse.setInteractive();

    this.add.image(280, 440, 'cloud1');
    this.add.image(140, 460, 'cloud2');
    this.add.image(500, 510, 'cloud3');


    // this.add.bitmapText(150, 500, 'pixelFont', 'Hello, world!', 32);




    //When F key is pressed toggle fullscreen
    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F).on('down', function (event) {
        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen();
        }
        else {
            document.exitFullscreen();
        }
    });








    farmhouse.on('pointerdown', function () {
        alert('Farmhouse clicked');
    });
    
    farmhouse.on('pointerover', function () {
        farmhouse.setTint(0xdddddd); // Set tint to light grey
        
    });
    
    farmhouse.on('pointerout', function () {
        // Remove white outline
        farmhouse.clearTint(); // Clear tint
    });

    
}



