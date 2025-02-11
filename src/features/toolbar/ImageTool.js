const image_icon = "../../assets/icons/image.svg";

export class ImageTool {
    constructor(onImageUpload) {
        this.isActive = false;
        this.canvasClickHandler = null;
        this.onImageUpload = onImageUpload;
        this.currentImage = null;
    }

    render() {
        const Image_Tool = document.createElement('div');
        Image_Tool.id = 'image-tool';
        Image_Tool.className = 'flex items-center justify-center w-8 h-8 hover:bg-zinc-700 rounded-lg cursor-pointer transition-colors ';

        const icon = document.createElement('img');
        icon.src = image_icon;
        icon.alt = 'Image Tool';
        icon.className = 'w-5 h-5 ';

        Image_Tool.appendChild(icon);

        Image_Tool.addEventListener('click', () => {
            this.toggleImageMode(Image_Tool);
        });

        return Image_Tool;
    }

    toggleImageMode(buttonElement) {
        this.isActive = !this.isActive;
        buttonElement.classList.toggle('bg-zinc-700', this.isActive);

        if (this.isActive) {
            this.enableImageMode();
        } else {
            this.disableImageMode();
        }
    }

    enableImageMode() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';

        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                this.handleImageUpload(file);
            }
            this.disableImageMode();
        });

        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    }

    disableImageMode() {
        this.isActive = false;
        const buttonElement = document.getElementById('image-tool');
        if (buttonElement) {
            buttonElement.classList.remove('bg-zinc-700');
        }
    }

    handleImageUpload(file) {
        const reader = new FileReader();

        reader.onload = (event) => {
            const imageUrl = event.target.result;
            this.currentImage = new Image();
            this.currentImage.src = imageUrl;

            this.currentImage.onload = () => {
                this.drawImageOnCanvas(this.currentImage);
                if (this.onImageUpload) {
                    this.onImageUpload(imageUrl);
                }
            };
        };

        reader.readAsDataURL(file);
    }

    drawImageOnCanvas(image) {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        
        // Calculate dimensions while maintaining aspect ratio
        let width = image.width;
        let height = image.height;
        const maxWidth = canvas.width * 0.8; // 80% of canvas width
        const maxHeight = canvas.height * 0.8; // 80% of canvas height

        if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
        }

        // Center the image on canvas
        const x = (canvas.width - width) / 2;
        const y = (canvas.height - height) / 2;

        // Save the current canvas state
        ctx.save();

        // Draw the image
        ctx.drawImage(image, x, y, width, height);

        // Restore the canvas state
        ctx.restore();
    }
}