export class shapeTriangle {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { readFileFrequently: true });
    this.snapshot = null;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.isDrawing = false;

    //bind 
    this.startDrawing = this.startDrawing.bind(this);
    this.stopDrawing = this.stopDrawing.bind(this);
    this.drawtri = this.drawtri.bind(this);

    this.addEventListeners()
  }

  addEventListeners() {
    this.canvas.addEventListener('mousedown', this.startDrawing);
    this.canvas.addEventListener('mouseup', this.stopDrawing);
    this.canvas.addEventListener('mousemove', this.drawtri);
    this.canvas.addEventListener('mouseLeave', this.stopDrawing);
  }

  removeEventListeners() {
    this.canvas.removeEventListener('mousemove', this.drawtri);
    this.canvas.removeEventListener('mousedown', this.startDrawing);
    this.canvas.removeEventListener('mouseup', this.stopDrawing);
    this.canvas.removeEventListener('mouseLeave', this.stopDrawing);
  }

  startDrawing(e) {
    this.isDrawing = true;
    this.prevMouseX = e.offsetX;
    this.prevMouseY = e.offsetY;

    this.snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
  };

  drawtri(e) {
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


    this.ctx.beginPath();
    this.ctx.moveTo(this.prevMouseX, this.prevMouseY); //moving triangle to the mouse pointer
    this.ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
    this.ctx.lineTo(this.prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
    this.ctx.closePath(); // closing path of a traingle so the third line draw automatically
    fillEnabled ? this.ctx.fill() : this.ctx.stroke();
  }

  stopDrawing(){
    this.isDrawing = false;
  }

}


