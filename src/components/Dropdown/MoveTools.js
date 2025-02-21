import { Dropdown } from "./Dropdown.js";
import { TextSelector } from "../../features/toolbar/tools/Object_Text_selector.js";
import { CanvasManager } from "../../features/toolbar/tools/canvas/CanvasManager.js";
const move_cursor = "../../../assets/icons/cursor_arr.svg";
const hand_tool = "../../../assets/icons/handtool.svg";

export class MoveTools {
    constructor(onSelectMove) {
        this.currentTool = 'Move'; // Default tool 
        this.tools = {
            'Move': {
                icon: move_cursor,
                label: 'Select',
                action: this.handleSelectTool.bind(this)
            },
            'HandTool': {
                icon: hand_tool,
                label: 'Drag',
                action: this.handleSelectTool.bind(this)
            }
        };

        this.dropdown = new Dropdown({
            id: 'move-tools',
            buttonSVG: move_cursor, // Default icon
            buttonText: '',
            items: [
                {
                    value: 'Move',
                    label: 'Select',
                    icon: move_cursor,
                    shortcut: '(V)'
                },
                {
                    value: 'HandTool',
                    label: 'Drag',
                    icon: hand_tool,
                    shortcut: '(H)'
                }
            ],
            onSelect: (selected) => {
                this.handleToolSelection(selected);
                if (onSelectMove) {
                    onSelectMove(selected);
                }
            }
        });

        // Set up keyboard shortcuts
        this.setupKeyboardShortcuts();
    }


    handleToolSelection(selected) {
        const tool = selected.value;
        const icon = selected.icon;

        // Cleanup previous tool before switching
        this.cleanupCurrentTool();
        // Update current tool
        this.currentTool = tool;

        // Update the dropdown button icon
        const selectedIconElement = this.dropdown.element.querySelector('.selected-icon');
        if (selectedIconElement && icon) {
            selectedIconElement.src = icon;
        }

        // Execute tool-specific action
        if (this.tools[tool]) {
            this.tools[tool].action(tool);
        }

        console.log('Selected move tool:', tool);
    }
    cleanupCurrentTool() {
        // Cleanup based on current tool
        if (this.currentTool === 'Move') {
            this.deactivatePanning();
        } else if (this.currentTool === 'HandTool') {
            this.deactivateTextSelection();
        }
    }

    handleSelectTool(tool) {
        // Deactivate all tools first
        Object.keys(this.tools).forEach(toolKey => {
            // Remove any active states or cleanup if needed
        });

        // Activate the selected tool
        switch (tool) {
            case 'Move':
                this.deactivatePanning()
                // Initialize text selection functionality
                this.initializeTextSelection();
                break;
            case 'HandTool':
                this.deactivateTextSelection()
                // Initialize hand tool (drag) functionality
                this.initializeHandTool();
                break;
        }
    }

    

    initializeTextSelection() {
        
            // Create new TextSelector instance if not exists
            if (!this.textSelector && document.querySelector('canvas')) {
                const canvas = document.querySelector('canvas');
                this.textSelector = new TextSelector(canvas);
                 // Enable text selection events
            canvas.style.cursor = 'crosshair';
            }

    }

    deactivateTextSelection() {
        // Clean up text selector if exists
        if (this.textSelector) {
            this.textSelector.cleanup(); // Assuming TextSelector has a cleanup method
            this.textSelector = null;
            const canvas = document.querySelector('canvas');
            if(canvas){
                canvas.style.cursor = 'default'
            }
        }
    }


    initializeHandTool() {

        // Initialize hand tool functionality
        if (!this.canvasManager && document.querySelector('canvas')) {
           
                const canvas = document.querySelector('canvas');
                this.canvasManager = new CanvasManager(canvas);
            this.canvasManager.enablePanning()
        }

    }

    deactivatePanning(){
        if (this.canvasManager) {
            this.canvasManager.disablePanning();
            const canvas = document.querySelector('canvas');
            if (canvas) {
                canvas.style.cursor = 'default';
            }
        }
    }
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            switch (e.key.toLowerCase()) {
                case 'v':
                    this.handleToolSelection({ value: 'Move', icon: move_cursor });
                    break;
                case 'h':
                    this.handleToolSelection({ value: 'HandTool', icon: hand_tool });
                    break;
            }
        });
    }

    render() {
        const element = this.dropdown.render();
        // After rendering, initialize the default selection again
        requestAnimationFrame(() => {
            const defaultSelection = {
                value: 'Move',
                icon: move_cursor,
                label: 'Select'
            };

            this.handleToolSelection(defaultSelection);
            this.dropdown.setActiveState(true);
        });

        return element;
    }
}