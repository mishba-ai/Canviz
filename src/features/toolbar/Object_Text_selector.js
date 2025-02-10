export class TextSelector {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.selectedText = null;
        this.isSelecting = false;
        this.startX = 0;
        this.startY = 0;
        this.contextMenu = null;
        
        this.setupEventListeners();
        this.createContextMenu();
    }

    setupEventListeners() {
        this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this));
        this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
        this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this.canvas.addEventListener('contextmenu', this.handleContextMenu.bind(this));
    }

    handleMouseDown(e) {
        const rect = this.canvas.getBoundingClientRect();
        this.startX = e.clientX - rect.left;
        this.startY = e.clientY - rect.top;
        this.isSelecting = true;
    }

    handleMouseMove(e) {
        if (!this.isSelecting) return;

        const rect = this.canvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;

        // Clear previous drawing
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw selection rectangle
        this.ctx.strokeStyle = 'rgba(0, 123, 255, 0.5)';
        this.ctx.fillStyle = 'rgba(0, 123, 255, 0.1)';
        this.ctx.beginPath();
        this.ctx.rect(this.startX, this.startY, currentX - this.startX, currentY - this.startY);
        this.ctx.stroke();
        this.ctx.fill();
    }

    handleMouseUp(e) {
        if (!this.isSelecting) return;

        const rect = this.canvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const endY = e.clientY - rect.top;

        // Store selected region
        this.selectedText = {
            x: Math.min(this.startX, endX),
            y: Math.min(this.startY, endY),
            width: Math.abs(endX - this.startX),
            height: Math.abs(endY - this.startY)
        };

        this.isSelecting = false;
        this.drawSelectionBox();
    }

    drawSelectionBox() {
        if (!this.selectedText) return;

        // Clear previous drawings
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw selection rectangle
        this.ctx.strokeStyle = 'blue';
        this.ctx.lineWidth = 2;
        this.ctx.setLineDash([5, 5]); // Dashed line
        this.ctx.strokeRect(
            this.selectedText.x, 
            this.selectedText.y, 
            this.selectedText.width, 
            this.selectedText.height
        );
        this.ctx.setLineDash([]); // Reset line dash
    }

    createContextMenu() {
        // Create context menu
        this.contextMenu = document.createElement('div');
        this.contextMenu.innerHTML = `
            <div class="absolute bg-zinc-800 text-white rounded-lg shadow-xl border border-zinc-700 overflow-hidden">
                <div class="px-4 py-2 hover:bg-zinc-700 cursor-pointer">Delete</div>
                <div class="px-4 py-2 hover:bg-zinc-700 cursor-pointer">Copy</div>
                <div class="px-4 py-2 hover:bg-zinc-700 cursor-pointer">Resize</div>
            </div>
        `;
        this.contextMenu.classList.add('hidden', 'absolute', 'z-50');
        document.body.appendChild(this.contextMenu);
    }

    handleContextMenu(e) {
        e.preventDefault();
        if (!this.selectedText) return;

        // Position context menu
        this.contextMenu.classList.remove('hidden');
        this.contextMenu.style.left = `${e.pageX}px`;
        this.contextMenu.style.top = `${e.pageY}px`;

        // Add context menu event listeners
        this.setupContextMenuListeners();
    }

    setupContextMenuListeners() {
        const deleteOption = this.contextMenu.children[0].children[0];
        const copyOption = this.contextMenu.children[0].children[1];
        const resizeOption = this.contextMenu.children[0].children[2];

        // Delete option
        deleteOption.onclick = () => {
            this.deleteSelectedText();
            this.hideContextMenu();
        };

        // Copy option
        copyOption.onclick = () => {
            this.copySelectedText();
            this.hideContextMenu();
        };

        // Resize option
        resizeOption.onclick = () => {
            this.resizeSelectedText();
            this.hideContextMenu();
        };

        // Close context menu when clicking outside
        document.addEventListener('click', this.hideContextMenu.bind(this));
    }

    deleteSelectedText() {
        // Clear the selected area
        this.ctx.clearRect(
            this.selectedText.x, 
            this.selectedText.y, 
            this.selectedText.width, 
            this.selectedText.height
        );
        this.selectedText = null;
    }

    copySelectedText() {
        // Implement copy logic
        console.log('Copying selected text');
    }

    resizeSelectedText() {
        // Implement resize logic
        console.log('Resizing selected text');
    }

    hideContextMenu() {
        this.contextMenu.classList.add('hidden');
    }
}

// Usage
const canvas = document.querySelector('canvas');
const textSelector = new TextSelector(canvas);