export class shapeCircle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { willReadFrequently: true });
    this.snapshot = null;
    this.isDrawing = false;
    this.prevMouseX = 0;
    this.prevMouseY = 0;

    // bind methods to this instance 
    this.startDrawing = this.startDrawing.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    this.drawCirc = this.drawCirc.bind(this);

    this.addEventListeners();
  }

  addEventListeners() {
    this.canvas.addEventListener('mousedown', this.startDrawing);
    this.canvas.addEventListener('mouseup', this.stopDrawing);
    this.canvas.addEventListener('mousemove', this.drawCirc);
    this.canvas.addEventListener('mouseLeave', this.stopDrawing);
  }

  removeEventListeners() {
    this.canvas.removeEventListener('mousedown', this.startDrawing);
    this.canvas.removeEventListener('mouseup', this.stopDrawing);
    this.canvas.removeEventListener('mousemove', this.drawCirc);
    this.canvas.removeEventListener('mouseLeave', this.stopDrawing);
  }

  startDrawing(e) {
    this.isDrawing = true;
    this.prevMouseX = e.offsetX; //offsetX is the x coordinate of the mouse pointer relative to the canvas
    this.prevMouseY = e.offsetY; //offsetY is the y coordinate of the mouse pointer relative to the canvas
    // Save the current canvas state for drawing preview
    this.snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  drawCirc(e) {
    if (!this.isDrawing) return;

    // Restore the canvas to its state before drawing preview
    this.ctx.putImageData(this.snapshot, 0, 0);

    // Check if fill is enabled
    const fillColor = document.getElementById('fillColor')
    const fillEnabled ='fillColor'?.checked || false;

    // Set drawing styles
    this.ctx.strokeStyle = document.getElementById('strokeColor')?.value || '#ffffff';
    this.ctx.fillStyle = document.getElementById('fillColor')?.value || '#ffffff';
    this.ctx.lineWidth = parseInt(document.getElementById('strokeWidth')?.value || '2');
    this.ctx.lineCap = 'round';

    // Draw the circle
    
    this.ctx.beginPath(); // creating new path to draw circle
    // getting radius for circle acccording to the mouse pointer
    let radius = Math.sqrt(
      Math.pow(this.prevMouseX - e.offsetX, 2) + Math.pow(this.prevMouseY - e.offsetX, 2)
    );
    this.ctx.arc(this.prevMouseX, this.prevMouseY, radius, 0, 2 * Math.PI);
    fillColor ? this.ctx.fill() : this.ctx.stroke();
  };

  stopDrawing(){
    this.isDrawing = false;
  }
}




