export class ExportImage {
    constructor() {
        this.canvas = document.querySelector('canvas');
        if (!this.canvas) {
            console.error('Canvas element not found!');
            return;
        }
        this.ctx = this.canvas.getContext('2d');
        this.exportImagePop = null;
    }

    downloadImage() {
        const link = document.createElement('a');
        link.download = 'image.png';
        link.href = this.canvas.toDataURL();
        link.click();
    }

    copyImageToClipboard() {
        this.canvas.toBlob((blob) => {
            navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
                .then(() => {
                    alert('Image copied to clipboard');
                })
                .catch((err) => {
                    console.error('Failed to copy image: ', err);
                });
        });
    }

    render() {
        this.exportImagePop = document.createElement('div');
        this.exportImagePop.classList.add(  'fixed', 'top-1/2', 'left-1/2', 'transform', '-translate-x-1/2', '-translate-y-1/2',
        'flex', 'flex-col', 'justify-between', 'items-center',
        'rounded-md', 'bg-gray-600','bg-opacity-50', 'shadow-lg',
        'w-[850px]', 'h-[430px]', 'z-[9999]', 'p-4','text-white');

        this.exportImagePop.innerHTML = `
        <div class='w-[450px] h-full'>
        <img id="preview-image" src="${this.canvas.toDataURL()}" alt="Preview" class="w-full h-full object-contain" />
    </div>
    <div class='w-[150px] h-full flex flex-col justify-center items-center'>
        <h1>Export Image</h1>
        <ul class='flex justify-center items-center gap-2'>
            <li>
                <button id='download'>PNG</button>
            </li>
            <li>
                <button id='copy'>Copy to Clipboard</button>
            </li>
        </ul>
    </div>`
;

        // Add event listeners to the buttons
        this.exportImagePop.querySelector('#download').addEventListener('click', () => this.downloadImage());
        this.exportImagePop.querySelector('#copy').addEventListener('click', () => this.copyImageToClipboard());

        // Append the popup to the body
        document.body.appendChild(this.exportImagePop);
    }

    close() {
        if (this.exportImagePop) {
            document.body.removeChild(this.exportImagePop);
            this.exportImagePop = null;
        }
    }
}