// Text.js
const text_icon = "../../assets/icons/text.svg";

export class TextTool {
    constructor() {
        this.isActive = false;
        this.currentTextBox = null;
        this.canvasClickHandler = null;
    }

    render() {
        const textElement = document.createElement('div');
        textElement.id = 'text-tool';
        textElement.className = 'flex items-center justify-center w-10 h-10  hover:bg-zinc-700 rounded-lg cursor-pointer transition-colors ';

        const icon = document.createElement('img');
        icon.src = text_icon;
        icon.alt = 'Text Tool';
        icon.className = 'w-5 h-5 ';

        textElement.appendChild(icon);
        
        // Toggle text mode on button click
        textElement.addEventListener('click', () => {
            this.toggleTextMode(textElement);
        });

        return textElement;
    }

    toggleTextMode(buttonElement) {
        this.isActive = !this.isActive;
        buttonElement.classList.toggle('bg-zinc-700', this.isActive);
        
        
        if (this.isActive) {
            this.enableTextMode();
        } else {
            this.disableTextMode();
        }
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
        if (this.currentTextBox) {
            this.finalizeTextBox();
        }
    }

    handleCanvasClick(event) {
        if (!this.isActive) return;

        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Only create new text box if we don't have one active
        if (!this.currentTextBox) {
            this.createTextInput(x, y);
        }
    }

    createTextInput(x, y) {
        // Remove any existing text box first
        if (this.currentTextBox) {
            this.finalizeTextBox();
        }

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
                this.finalizeTextBox();
            }
            if (e.key === 'Escape') {
                this.removeTextBox();
            }
            e.stopPropagation();
        });

        textBox.addEventListener('blur', () => {
            if (textBox.textContent.trim() === '') {
                this.removeTextBox();
            } else {
                this.finalizeTextBox();
            }
        });

        // Add to DOM
        const canvasParent = document.querySelector('canvas').parentElement;
        canvasParent.appendChild(textBox);
        this.currentTextBox = textBox;
        textBox.focus();
    }

    finalizeTextBox() {
        if (!this.currentTextBox) return;

        const text = this.currentTextBox.textContent.trim();
        if (text) { 
            const position = {
                x: parseFloat(this.currentTextBox.style.left),
                y: parseFloat(this.currentTextBox.style.top)
            };

            const canvas = document.querySelector('canvas');
            const ctx = canvas.getContext('2d');
            const style = window.getComputedStyle(this.currentTextBox);
            
            ctx.font = `${style.fontSize} ${style.fontFamily}`;
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(text, position.x, position.y);
        }

        this.removeTextBox();
    }

    removeTextBox() {
        if (this.currentTextBox) {
            this.currentTextBox.remove();
            this.currentTextBox = null;
        }
    }
}