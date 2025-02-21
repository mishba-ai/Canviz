const text_icon = "../../assets/icons/text.svg";

export class TextTool {
    constructor() {
        this.isActive = false;
        this.currentTextBox = null;
        this.textBoxes = new Set(); // Store multiple text boxes
        this.canvasClickHandler = null;
        this.id = 'text-tool';
    }

    render() {
        const textElement = document.createElement('div');
        textElement.id = this.id;
        textElement.className = 'flex items-center justify-center w-8 h-8  hover:bg-zinc-700 rounded-lg cursor-pointer transition-colors ';
        textElement.dataset.toolId = this.id

        const icon = document.createElement('img');
        icon.src = text_icon;
        icon.alt = 'Text Tool';
        icon.className = 'w-5 h-5 ';

        textElement.appendChild(icon);

        // Listen for dropdown activation events
        document.addEventListener('dropdown-activated', (e) => {
            if (this.isActive) {
                this.deactivate(textElement);
            }
        });

        // Toggle text mode on button click
        textElement.addEventListener('click', (e) => {
            e.stopPropagation();

            // Dispatch event to deactivate other tools
            const event = new CustomEvent('tool-activated', {
                bubbles: true,
                detail: { toolId: this.id }
            });
            textElement.dispatchEvent(event);

            // Only activate if not already active
            if (!this.isActive) {
                this.activate(textElement);
            }
        });
        return textElement;
    }

    activate(buttonElement) {
        this.isActive = true;
        buttonElement.classList.add('bg-zinc-700');
        this.enableTextMode();
        console.log('text tool activated ')
    }

    deactivate(buttonElement) {
        this.isActive = false;
        buttonElement.classList.remove('bg-zinc-700');
        this.disableTextMode();
    }

    enableTextMode() {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        // Change cursor to text
        canvas.style.cursor = 'text';

        // Create bound handler that we can later remove
        this.canvasClickHandler = this.handleCanvasClick.bind(this);
        canvas.addEventListener('click', this.canvasClickHandler);
    }

    disableTextMode() {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        // Reset cursor
        canvas.style.cursor = 'default';

        // Remove click handler
        if (this.canvasClickHandler) {
            canvas.removeEventListener('click', this.canvasClickHandler);
            this.canvasClickHandler = null;
        }

        // Finalize any existing text box
        // if (this.currentTextBox) {
        //     this.finalizeTextBox();
        // }
    }

    handleCanvasClick(event) {
        if (!this.isActive) return;

        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Create a new text box at the clicked position
            this.createTextInput(x, y);
        
    }

    createTextInput(x, y) {
        // Remove any existing text box first
        // if (this.currentTextBox) {
        //     this.finalizeTextBox();
        // }

        const textBox = document.createElement('div');
        textBox.contentEditable = true;
        textBox.className = 'absolute p-1 min-w-[20px] min-h-[24px] outline text-white bg-transparent border-none ';
        textBox.style.left = `${x}px`;
        textBox.style.top = `${y}px`;
        textBox.style.transform = 'translate(-50%, -50%)';
        textBox.style.whiteSpace = 'pre-wrap';
        textBox.style.fontSize = '16px';

        // Add placeholder
        textBox.dataset.placeholder = 'Type something...';

        // Add placeholder styles if not already added
        if (!document.querySelector('#text-tool-styles')) {
            const style = document.createElement('style');
            style.id = 'text-tool-styles';
            style.textContent = `
                [contenteditable][data-placeholder]:empty:before {
                    content: attr(data-placeholder);
                    color: #888;
                    cursor: text;
                }
            `;
            document.head.appendChild(style);
        }

        // Event listeners
        textBox.addEventListener('keydown', (e) => {
            if (!this.isActive) {
                e.preventDefault();
                return;
            }

            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.finalizeTextBox(this.currentTextBox);
            }
            if (e.key === 'Escape') {
                this.removeTextBox(this.currentTextBox);
            }
            e.stopPropagation();
        });

        textBox.addEventListener('blur', () => {
            if (document.body.contains(textBox)) {
                if (textBox.textContent.trim() === '') {
                    this.removeTextBox(this.currentTextBox);
                } 
                // else {
                //     this.finalizeTextBox(this.currentTextBox);
                // }
            }
        });

        // Add to DOM
        const canvasParent = document.querySelector('canvas').parentElement;
        canvasParent.appendChild(textBox);
        // this.currentTextBox = textBox;
        this.currentTextBox = textBox;  // Set the current text box

        this.textBoxes.add(textBox); // Add to set of text boxes

        textBox.focus();
    }

    finalizeTextBox(textBox) {
        if (!textBox) return;

        const text = textBox.textContent.trim();
        if (text) {
            const position = {
                x: parseFloat(textBox.style.left),
                y: parseFloat(textBox.style.top)
            };

            const canvas = document.querySelector('canvas');
            const ctx = canvas.getContext('2d');
            const style = window.getComputedStyle(textBox);

            ctx.font = `${style.fontSize} ${style.fontFamily}`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(text, position.x, position.y);
        }

        this.removeTextBox(textBox);
    }

    removeTextBox(textBox) {
        if (textBox) { 
            textBox.remove();
            this.textBoxes.delete(textBox);
            if (this.currentTextBox === textBox) {
                this.currentTextBox = null;
            }
        }
    }
}