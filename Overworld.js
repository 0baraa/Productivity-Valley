class Overworld{
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init(){
        const image = new Image();
        image.onload = () => {
            this.ctx.drawImage(image, 0, 0)
        };
        image.src = "/assets/test/github-imagel.png";

        const fence = new Image();
        fence.onload = () => {
            this.ctx.drawImage(fence, 0, 0)
        };
        fence.src = "/assets/test/fence-post-back.png";
    }
}