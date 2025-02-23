export class ExportImage {
    constructor() {
        this.canvas = document.querySelector('canvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.exportImagePop = null;
        this.currentBackground = 'transparent';
    }

    async captureCanvasWithText() {
        // Create a temporary canvas
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = this.canvas.width;
        tempCanvas.height = this.canvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        // First draw the background if not transparent
        if (this.currentBackground !== 'transparent') {
            tempCtx.fillStyle = this.currentBackground;
            tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        }

        // Draw the original canvas content
        tempCtx.drawImage(this.canvas, 0, 0);

        // Find all text elements (contentEditable divs)
        const textElements = document.querySelectorAll('[contenteditable="true"]');

        // Draw each text element onto the canvas
        textElements.forEach(textElement => {
            if (textElement.textContent.trim()) {
                const style = window.getComputedStyle(textElement);
                const rect = textElement.getBoundingClientRect();
                const canvasRect = this.canvas.getBoundingClientRect();

                // Calculate position relative to canvas
                const x = rect.left - canvasRect.left;
                const y = rect.top - canvasRect.top + parseInt(style.fontSize); // Adjust for baseline

                // Set text styles
                tempCtx.font = `${style.fontSize} ${style.fontFamily} `;
                // Determine text color based on background
                if (this.currentBackground === 'black') {
                    tempCtx.fillStyle = 'white';
                } else {
                    // For white or transparent background, use black
                    tempCtx.fillStyle = 'black';
                } 
                tempCtx.textAlign = 'left';
                tempCtx.textBaseline = 'top';

                // Draw text
                tempCtx.fillText(textElement.textContent, x, y);
            }
        });

        return tempCanvas;
    }

    async getCanvasDataURL() {
        const mergedCanvas = await this.captureCanvasWithText();
        return mergedCanvas.toDataURL('image/png');
    }

    async downloadImage() {
        const link = document.createElement('a');
        link.download = 'canvas-image.png';
        link.href = await this.getCanvasDataURL();
        link.click();
    }

    async copyImageToClipboard() {
        try {
            const imageUrl = await this.getCanvasDataURL();
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            await navigator.clipboard.write([
                new ClipboardItem({
                    'image/png': blob
                })
            ]);
            alert('Image copied to clipboard');
        } catch (err) {
            console.error('Failed to copy image: ', err);
        }
    }

    async updatePreview(background) {
        this.currentBackground = background;
        const previewImage = this.exportImagePop.querySelector('#preview-image');
        if (previewImage) {
            previewImage.src = await this.getCanvasDataURL();
        }
    }

    render() {
        // Close existing popup if it exists
        this.close();

        // Create new popup
        this.exportImagePop = document.createElement('div');
        this.exportImagePop.classList.add(
            'fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2',
            'flex', 'flex-col', 'justify-between', 'items-center',
            'rounded-md', 'bg-white', 'shadow-lg',
            'w-[600px]', 'h-[500px]', 'z-[9999]', 'p-4'
        );

        this.exportImagePop.innerHTML = `
            <div class="absolute top-2 right-2">
                <button class="close-btn text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>
            <div class='w-full h-[350px] mb-4 relative'>
                <!-- Checkered background to show transparency -->
                <div class="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAYdEVYdFRpdGxlAENhbnZhcyBCYWNrZ3JvdW5krnbEGAAAABd0RVh0QXV0aG9yAFJhc211cyBBbmRlcnNlbgsTAOEAAAAZdEVYdENyZWF0aW9uIFRpbWUAVGh1IDUgSnVuIDIwMTMPylf7AAAAB3RJTUUH3QYFCTMvoRRlhAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAQSURBVDiNY/z//z8DAwMDAAkPAwOuST1VAAAAAElFTkSuQmCC')]"></div>
                <img id="preview-image" src="" alt="Preview" class="relative w-full h-full object-contain" />
            </div>
            <div class='w-full flex flex-col items-center gap-4'>
                <h2 class="text-xl font-semibold">Export Image</h2>
                <div class="flex items-center gap-4 mb-4">
                    <label class="flex items-center gap-2">
                        <input type="radio" name="background" value="transparent" checked>
                        Transparent
                    </label>
                    <label class="flex items-center gap-2">
                        <input type="radio" name="background" value="black">
                        Black
                    </label>
                    <label class="flex items-center gap-2">
                        <input type="radio" name="background" value="white">
                        White
                    </label>
                </div>
                <div class='flex justify-center items-center gap-4'>
                    <button id='download' 
                            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        Download PNG
                    </button>
                    <button id='copy' 
                            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
                        Copy to Clipboard
                    </button>
                </div>
            </div>
        `;

        // Add overlay
        const overlay = document.createElement('div');
        overlay.classList.add(
            'fixed', 'inset-0', 'bg-black', 'bg-opacity-50', 'z-[9998]'
        );
        document.body.appendChild(overlay);

        // Add event listeners
        const downloadBtn = this.exportImagePop.querySelector('#download');
        const copyBtn = this.exportImagePop.querySelector('#copy');
        const closeBtn = this.exportImagePop.querySelector('.close-btn');
        const backgroundInputs = this.exportImagePop.querySelectorAll('input[name="background"]');

        downloadBtn.addEventListener('click', () => this.downloadImage());
        copyBtn.addEventListener('click', () => this.copyImageToClipboard());
        closeBtn.addEventListener('click', () => this.close());
        overlay.addEventListener('click', () => this.close());

        // Add background change listeners
        backgroundInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.updatePreview(e.target.value);
            });
        });

        // Initialize preview
        this.updatePreview('transparent');

        // Append the popup
        document.body.appendChild(this.exportImagePop);
    }

    close() {
        if (this.exportImagePop) {
            this.exportImagePop.remove();
            this.exportImagePop = null;

            // Remove overlay if it exists
            const overlay = document.querySelector('.bg-black.bg-opacity-50');
            if (overlay) overlay.remove();
        }
    }
}