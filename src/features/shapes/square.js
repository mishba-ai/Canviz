export class shapeSquare {

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', { willReadFrequently: true }); //willreadfrequently is used to improve performance
        this.snapshot = null; //snapshot is used to save the canvas state before drawing preview

        this.isDrawing = false;
        this.prevMouseX = 0;
        this.prevMouseY = 0;

        // bind methods to this instance 
        this.startDrawing = this.startDrawing.bind(this);
        this.stopDrawing = this.stopDrawing.bind(this);
        this.drawRect = this.drawRect.bind(this);

        this.addEventListeners();
    }

    addEventListeners() {
        this.canvas.addEventListener('mousedown', this.startDrawing);
        this.canvas.addEventListener('mouseup', this.stopDrawing);
        this.canvas.addEventListener('mousemove', this.drawRect);
        this.canvas.addEventListener('mouseleave', this.stopDrawing);
    }

    removeEventListeners() {
        this.canvas.removeEventListener('mousedown', this.startDrawing);
        this.canvas.removeEventListener('mousemove', this.drawRect);
        this.canvas.removeEventListener('mouseup', this.stopDrawing);
        this.canvas.removeEventListener('mouseleave', this.stopDrawing);

    }

    startDrawing(e) {
        this.isDrawing = true;
        this.prevMouseX = e.offsetX;
        this.prevMouseY = e.offsetY;

        // Save the current canvas state for drawing preview
        this.snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }

    drawRect(e) {
        if (!this.isDrawing) return;



        // Restore the canvas to its state before drawing preview
        this.ctx.putImageData(this.snapshot, 0, 0);

        // Check if fill is enabled
        const fillColor = document.getElementById('fillColor');
        const fillEnabled = fillColor?.checked || false;

        // Set drawing styles
        this.ctx.strokeStyle = document.getElementById('strokeColor')?.value || '#ffffff';
        this.ctx.fillStyle = document.getElementById('fillColor')?.value || '#ffffff';
        this.ctx.lineWidth = parseInt(document.getElementById('strokeWidth')?.value || '2');
        this.ctx.lineCap = 'round';

        const width = e.offsetX - this.prevMouseX;
        const height = e.offsetY - this.prevMouseY;

        // Restore the canvas to its state before drawing preview
        this.ctx.putImageData(this.snapshot, 0, 0);

        if (!fillEnabled) {
            // creating circle according to the mouse pointer
            this.ctx.strokeRect(
                this.prevMouseX,
                this.prevMouseY,
                width,
                height
            );
        }
        else {
            this.ctx.fillRect(
                this.prevMouseX,
                this.prevMouseY,
                width,
                height
            )
        };
    };
    stopDrawing() {
        if (!this.isDrawing) return;
        this.isDrawing = false;

        //commit the rectangle to the permanent canvas
        // This final draw ensures the rectangle stays on the canvas
        const canvas = this.canvas;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        //get the current rectangle properties 
        const width = this.currentX - this.prevMouseX;
        const height = this.currentY - this.prevMouseY;

        //apply the actual drawing to the canvas 
        //the rectanfle drawn  during mousemove was just a preview

        const fillEnabled = document.getElementById('fillColor')?.checked || false;

        if (!fillEnabled) {
            ctx.strokeRect(
                this.prevMouseX,
                this.prevMouseY,
                width,
                height
            );
        } else {
            ctx.fillRect(
                this.prevMouseX,
                this.prevMouseY,
                width,
                height
            );
        }

    }
}