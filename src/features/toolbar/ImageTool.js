const image_icon = "../../assets/icons/image.svg";

export class ImageTool{
    constructor(){
        this.isActive = false;
        this.canvasClickHandler = null;
    
    }

    render(){
        const Image_Tool = document.createElement('div');
        Image_Tool.id = 'image-tool';
        Image_Tool.className = 'flex items-center justify-center w-8 h-8  hover:bg-zinc-700 rounded-lg cursor-pointer transition-colors ';

        const icon = document.createElement('img');
        icon.src = image_icon;
        icon.alt = 'Text Tool';
        icon.className = 'w-5 h-5 ';

        Image_Tool.appendChild(icon);

         // Toggle text mode on button click
         Image_Tool.addEventListener('click', () => {
            this.toggleTextMode(Image_Tool);
        });

        return Image_Tool;
    }
}