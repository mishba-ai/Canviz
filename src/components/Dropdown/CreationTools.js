import { Dropdown } from "./Dropdown.js";
const pencil_i = "../../../assets/icons/pencil.svg"
const pen_i = "../../../assets/icons/pen.svg"
export class CreationTools {
    constructor(onSelectTool) {
        this.currentTool = 'pen'; //default tool
        this.tools = {
            'Pen': { 
                icon: pen_i,
                label: 'Pen',
                action: this.handleSelectTool.bind(this)
            },
            'Pencil': {
                icon: pencil_i,
                label: 'Pencil',
                action: this.handleSelectTool.bind(this)
            }
        };

        this.dropdown = new Dropdown({
            id:'creation-tools',
            buttonSVG: pen_i,
            buttonClasses: 'bg-gray-700 text-white rounded',
            items: [
                { value: 'pen', label: 'Pen', icon: pen_i, shortcut: '(P)' },
                { value: 'pencil', label: 'Pencil', icon: pencil_i, shortcut: '(shift+P)' },
            ],
            onSelect: (value) => {
                this.handleToolSelection(selected);
                if (onSelectTool) {
                    onSelectTool(selected)
                }
            }
        });
        // Set up keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    handleToolSelection(Selected) {
        const tool = Selected.value;
        const icon = Selected.icon;

        //update current tool
        this.currentTool = tool;

        //update the dropdown button icon
        const selectedIconElement = this.dropdown.element.querySelector('.selected-icon');
        if (selectedIconElement && icon) {
            selectedIconElement.src = icon
        }

        // Execute tool-specific action
        if (this.tools[tool]) {
            this.tools[tool].action(tool);
        }

        console.log('Selected move tool:', tool);

    }


    handleSelectTool(tool) {
        //deactivate all tools first
        object.keys(this.tools).forEach(toolKey => {

        });

        //Activate the selected tool
        switch (tool) {
            case 'Pen':
                //
                this.initializePenTool();
                break;
            case 'Pencil':
                //
                this.initializePencilTool();
                break;
        }

    }

    initializePenTool() {
        //
    }

    initializePencilTool() {
        //
    }


    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            // Check for 'p' key
            if (e.key.toLowerCase() === 'p') {
                if (e.shiftKey) {
                    // Shift + p: Select Pencil
                    this.handleToolSelection({ value: 'Pencil', icon: pencil_i });
                } else {
                    // p: Select Pen
                    this.handleToolSelection({ value: 'Pen', icon: pen_i });
                }
            }
        })
    }
    render() {
        return this.dropdown.render();
    }
}