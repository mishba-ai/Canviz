export class shapeArrow {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d', { willReadFrequently: true });
      this.snapshot = null;
      
      this.isDrawing = false;
      this.startX = 0;
      this.startY = 0;
      
      // bind methods to this instance
      this.startDrawing = this.startDrawing.bind(this);
      this.stopDrawing = this.stopDrawing.bind(this);
      this.drawArrow = this.drawArrow.bind(this);
      
      this.addEventListeners();
    }
    
    addEventListeners() {
      this.canvas.addEventListener('mousedown', this.startDrawing);
      this.canvas.addEventListener('mouseup', this.stopDrawing);
      this.canvas.addEventListener('mousemove', this.drawArrow);
      this.canvas.addEventListener('mouseleave', this.stopDrawing);
    }
    
    removeEventListeners() {
      this.canvas.removeEventListener('mousedown', this.startDrawing);
      this.canvas.removeEventListener('mouseup', this.stopDrawing);
      this.canvas.removeEventListener('mousemove', this.drawArrow);
      this.canvas.removeEventListener('mouseleave', this.stopDrawing);
    }
    
    startDrawing(e) {
      this.isDrawing = true;
      this.startX = e.offsetX;
      this.startY = e.offsetY;
      // Save the current canvas state for drawing preview
      this.snapshot = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    }
    
    drawArrow(e) {
      if (!this.isDrawing) return;
      
      // Restore the canvas to its state before drawing preview
      this.ctx.putImageData(this.snapshot, 0, 0);
      
      const endX = e.offsetX;
      const endY = e.offsetY;
      
      // Set drawing styles
      this.ctx.strokeStyle = document.getElementById('strokeColor')?.value || '#ffffff';
      this.ctx.fillStyle = document.getElementById('fillColor')?.value || '#ffffff';
      this.ctx.lineWidth = parseInt(document.getElementById('strokeWidth')?.value || '2');
      this.ctx.lineCap = 'round';
      
      // Check if fill is enabled (for arrowhead)
      const fillEnabled = document.getElementById('fillColor')?.checked || false;
      
      // Calculate arrow properties
      const dx = endX - this.startX;
      const dy = endY - this.startY;
      const angle = Math.atan2(dy, dx);
      const length = Math.sqrt(dx * dx + dy * dy);
      
      // Set arrowhead size based on line length, but with min/max limits
      const headLength = Math.min(Math.max(length * 0.2, 10), 30);
      const headWidth = headLength * 0.6;
      
      // Draw the arrow line
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(endX, endY);
      this.ctx.stroke();
      
      // Draw the arrowhead
      this.ctx.beginPath();
      this.ctx.moveTo(endX, endY);
      this.ctx.lineTo(
        endX - headLength * Math.cos(angle - Math.PI/6),
        endY - headLength * Math.sin(angle - Math.PI/6)
      );
      this.ctx.lineTo(
        endX - headLength * Math.cos(angle) * 0.5,
        endY - headLength * Math.sin(angle) * 0.5
      );
      this.ctx.lineTo(
        endX - headLength * Math.cos(angle + Math.PI/6),
        endY - headLength * Math.sin(angle + Math.PI/6)
      );
      this.ctx.closePath();
      
      // Fill or stroke the arrowhead
      if (fillEnabled) {
        this.ctx.fill();
      } else {
        this.ctx.stroke();
      }
    }
    
    stopDrawing() {
      this.isDrawing = false;
    }
  }