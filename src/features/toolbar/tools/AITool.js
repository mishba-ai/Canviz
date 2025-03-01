const AI_icon = "../../assets/icons/AI.svg";

export class AITool {
    constructor() {
        this.isActive = false;
        this.canvasClickHandler = null;
        this.id = 'ai-tool';
        this.buttonElement = null;

    }

    render() {
        const AI_Tool = document.createElement('div');
        AI_Tool.id = this.id;
        AI_Tool.className = 'flex items-center justify-center w-8 h-8  hover:bg-zinc-700 rounded-lg cursor-pointer transition-colors ';
        AI_Tool.dataset.toolId = this.id

        const icon = document.createElement('img');
        icon.src = AI_icon;
        icon.alt = 'ai Tool';
        icon.className = 'w-5 h-5 ';

        AI_Tool.appendChild(icon);
 
        this.buttonElement = AI_Tool

        // Listen for dropdown activation events
        document.addEventListener('dropdown-activated', (e) => {
            if (this.isActive) {
                this.deactivate(AI_Tool);
            }
        });

        // Toggle AI mode on button click
        AI_Tool.addEventListener('click', (e) => {
            e.stopPropagation();

            // Dispatch event to deactivate other tools
            const event = new CustomEvent('tool-activated', {
                bubbles: true,
                detail: { toolId: this.id }
            });
            AI_Tool.dispatchEvent(event);

            this.toggleAiTool(AI_Tool);
        });

        return AI_Tool;
    }

    toggleAiTool(buttonElement) {
        this.isActive = !this.isActive;
        buttonElement.classList.toggle('bg-zinc-700', this.isActive);

        if (this.isActive) {
            this.enableAiTool();
        } else {
            this.disableAiTool();
        }
    }

    activate(){
        if (!this.buttonElement) {
            console.error('Button element is not defined for TextTool.');
            return;
        }; // Ensure the button element exists
        this.isActive = true;
        this.buttonElement.classList.add('bg-zinc-700');
        this.enableAiTool();
    }

    deactivate() {
        if (!this.buttonElement) {
            console.error('Button element is not defined for TextTool.');
            return;
        }; 
        // Ensure the button element exists
        this.isActive = false;
        this.buttonElement.classList.remove('bg-zinc-700');
        this.disableAiTool();
    }

    enableAiTool(){
        console.log("activate AITOOL")       

    }

    disableAiTool(){
        console.log("deactivate AITOOL")       
        
    }
}