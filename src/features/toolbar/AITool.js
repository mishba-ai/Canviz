const AI_icon = "../../assets/icons/AI.svg";

export class AITool{
    constructor(){
        this.isActive = false;
        this.canvasClickHandler = null;
    
    }

    render(){
        const AI_Tool = document.createElement('div');
        AI_Tool.id = 'image-tool';
        AI_Tool.className = 'flex items-center justify-center w-8 h-8  hover:bg-zinc-700 rounded-lg cursor-pointer transition-colors ';

        const icon = document.createElement('img');
        icon.src = AI_icon;
        icon.alt = 'Text Tool';
        icon.className = 'w-5 h-5 ';

        AI_Tool.appendChild(icon);

         // Toggle text mode on button click
         AI_Tool.addEventListener('click', () => {
            this.toggleTextMode(AI_Tool);
        });

        return AI_Tool;
    }
}