class CanvasState {
    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.scale = 1;
        this.offsetX = 0;
        this.offsetY = 0;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
    }

    //apply transformatons to the canvas context
    applyTransformations(){
        this.ctx.save();
        this.ctx.translate(this.offsetX, this.offsetY);
        this.ctx.scale(this.scale, this.scale);    }

    // reset transformations
    reserTransformations(){
        this.ctx.restore();
    }

    //convert screen coordinates to canvas coordinates
    getTransformedPoint(x,y){
        return {
            x: (x - this.offsetX) / this.scale,
            y: (y - this.offsetY) / this.scale,
        };
    }
}