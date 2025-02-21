export class CanvasManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.isPanning = false; // Toggle panning mode
        this.state = {
            scale: 1, // Current zoom scale
            offsetX: 0, // Horizontal translation
            offsetY: 0, // Vertical translation
            isDragging: false, // Whether the canvas is being dragged
            startX: 0, // Initial mouse X position when dragging starts
            startY: 0, // Initial mouse Y position when dragging starts
        };
        this.initialize();
    }

    initialize() {
        this.setupEventListeners();
        this.render();
    }

    setupEventListeners() {
        // Panning (left-click and drag)
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('mouseleave', this.handleMouseUp.bind(this)); // Stop dragging if mouse leaves canvas

        // Zooming (mouse wheel)
        this.canvas.addEventListener('wheel', this.handleWheel.bind(this), { passive: false });
    }

    enablePanning() {
        this.isPanning = true;
        this.canvas.style.cursor = 'grab';
    }

    disablePanning() {
        this.isPanning = false;
        this.canvas.style.cursor = 'default';
        this.state.isDragging = false;
    }

    handleMouseDown(e) {
        if (!this.isPanning || e.button !== 0) return; // Only left-click for panning

        this.state.isDragging = true;
        this.state.startX = e.clientX - this.state.offsetX;
        this.state.startY = e.clientY - this.state.offsetY;
        this.canvas.style.cursor = 'grabbing';
    }

    handleMouseMove(e) {
        if (!this.state.isDragging || !this.isPanning) return;

        // Update the canvas offset based on mouse movement
        this.state.offsetX = e.clientX - this.state.startX;
        this.state.offsetY = e.clientY - this.state.startY;
        this.render();
    }

    handleMouseUp(e) {
        if (!this.isPanning) return;

        this.state.isDragging = false;
        this.canvas.style.cursor = 'grab';
    }

    handleWheel(e) {
        e.preventDefault();

        // Get the mouse position relative to the canvas
        const rect = this.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Calculate the point under the mouse before zooming
        const pointXBeforeZoom = (mouseX - this.state.offsetX) / this.state.scale;
        const pointYBeforeZoom = (mouseY - this.state.offsetY) / this.state.scale;

        // Adjust the scale based on wheel direction
        const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1; // Zoom out if scrolling down, zoom in if scrolling up
        this.state.scale *= zoomFactor;

        // Apply zoom limits (e.g., between 0.1x and 10x)
        this.state.scale = Math.min(Math.max(0.1, this.state.scale), 10);

        // Adjust the offset to keep the mouse pointer as the zoom focal point
        this.state.offsetX = mouseX - pointXBeforeZoom * this.state.scale;
        this.state.offsetY = mouseY - pointYBeforeZoom * this.state.scale;

        this.render();
    }

    render() {
        // Clear the canvas
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Apply the current transformations (scale and translation)
        this.ctx.setTransform(
            this.state.scale, 0,
            0, this.state.scale,
            this.state.offsetX, this.state.offsetY
        );

        // Draw any existing content here (e.g., shapes, images, etc.)
        // This will automatically be affected by the pan and zoom transformations.
    }

    // Helper method to convert screen coordinates to canvas coordinates
    getCanvasPoint(screenX, screenY) {
        return {
            x: (screenX - this.state.offsetX) / this.state.scale,
            y: (screenY - this.state.offsetY) / this.state.scale
        };
    }
}