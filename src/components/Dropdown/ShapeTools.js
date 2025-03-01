import { Dropdown } from "./Dropdown.js";
import { ExportImage } from "../../features/toolbar/tools/ExportImage.js";
const c_icon = '../../../assets/shapes/circle.svg'
const s_icon = '../../../assets/shapes/square.svg'
const t_icon = '../../../assets/shapes/triangle.svg'
const a_icon = '../../../assets/shapes/arrow.svg'
const r_icon = '../../../assets/shapes/rectangle.svg'
const camera_icon = '../../../assets/icons/camera.svg'

const SHAPES = [
    { label: 'Square', value: 'square', icon: s_icon, shortcut: 'S' },
    { label: 'Rectangle', value: 'rectangle', icon: r_icon, shortcut: 'R' },
    { label: 'Circle', value: 'circle', icon: c_icon, shortcut: 'C' },
    { label: 'Square', value: 'square', icon: s_icon, shortcut: 'S' },
    { label: 'Triangle', value: 'triangle', icon: t_icon, shortcut: 'T' },
    { label: 'Arrow', value: 'arrow', icon: a_icon, shortcut: 'A' },
    { label: 'Export Image', value: 'Export Image', icon: camera_icon, shortcut: 'I' }
];
const squareicon = "../../../assets/shapes/square.svg"
export class ShapeTools {
    constructor(onSelectShape) {
        this.currentShape = 'square';
        this.tools = {
            'Circle': {
                icon: c_icon,
                label: 'Circle',
                action: this.handleSelectShape.bind(this),
            },
            'Square': {
                icon: s_icon,
                label: 'Square',
                action: this.handleSelectShape.bind(this),
            },
            'Triangle': {
                icon: t_icon,
                label: 'Triangle',
                action: this.handleSelectShape.bind(this),
            },
            'Arrow': {
                icon: a_icon,
                label: 'Arrow',
                action: this.handleSelectShape.bind(this),
            },
            'Rectangle': {
                icon: r_icon,
                label: 'Rectangle',
                action: this.handleSelectShape.bind(this),
            },
            'Export Image': {
                icon: camera_icon,
                label: 'Export Image',
                action: this.handleSelectShape.bind(this),
            }

        };

        this.exportImage = null;
        //create shape tools dropdown
        this.dropdown = new Dropdown({
            id: 'shape-tools',
            buttonSVG: squareicon,
            buttonClasses: 'bg-gray-700 text-white rounded',
            items: SHAPES,
            onSelect: (selected) => {
                this.handleToolSelection(selected);
                if (onSelectShape) {
                    onSelectShape(selected)
                }
            }
        });
        // Set up keyboard shortcuts
        this.setupKeyboardShortcuts();
    }

    //This method handles the selection of a tool.
    handleToolSelection(selected) {
        const tool = selected.value;
        const icon = selected.icon;

        console.log('Tool selected:', tool); // Log the selected tool

        //update current tool
        this.currentShape = tool;

        //update the dropdown icon
        const selectedIconElement = this.dropdown.element.querySelector('.selected-icon');
        if (selectedIconElement && icon) {
            selectedIconElement.src = icon
        }

        //execute tool-specific action
        if (this.tools[tool]) {
            this.tools[tool].action(tool);
        }


    }

    // This method activates the selected tool and deactivates all others.
    handleSelectShape(tool) {
        console.log('Tool action triggered:', tool); // Log the tool action

        //deactivate all tools first 
        Object.keys(this.tools).forEach(toolKey => {

        });

        //Activate the selected tool
        switch (tool) {
            case 'Circle':
                //
                this.initializeCircleTool();
                break;
            case 'Square':
                //
                this.initializeSquareTool();
                break;
            case 'Triangle':
                //
                this.initializeTriangleTool();
                break;
            case 'Arrow':
                //
                this.initializeArrowTool();
                break;
            case 'Rectangle':
                //
                this.initializeRectangleTool();
                break;
            case 'Export Image':
                console.log('Initializing Camera Tool in switch case'); // Debug log

                this.initializeCameraTool();
                break;
        }

    }

    initializeCircleTool() {
        //
    }

    initializeSquareTool() {
        //
    }

    initializeTriangleTool() {
        //
    }

    initializeArrowTool() {
        //
    }

    initializeRectangleTool() {
        //
    }

    initializeCameraTool() {
        console.log('initializeCameraTool called'); // Debug log
        
        // Create new instance if it doesn't exist
        if (!this.exportImage) {
            console.log('Creating new ExportImage instance'); // Debug log
            this.exportImage = new ExportImage();
        }
        
        // Always call render
        console.log('Calling render on ExportImage'); // Debug log
        this.exportImage.render();
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            //
            switch (e.key.toLowerCase()) {
                case 'c':
                    //
                    this.handleToolSelection({ value: 'Circle', icon: c_icon });
                    break;
                case 's':
                    //
                    this.handleToolSelection({ value: 'Square', icon: s_icon });
                    break;
                case 't':
                    //
                    this.handleToolSelection({ value: 'Triangle', icon: t_icon });
                    break;
                case 'a':
                    //
                    this.handleToolSelection({ value: 'Arrow', icon: a_icon });
                    break;
                case 'r':
                    //
                    this.handleToolSelection({ value: 'Rectangle', icon: r_icon });
                    break;
                case 'i':
                    this.handleToolSelection({ value: 'Export Image', icon: camera_icon });
                    break;
            }
        })
    }
    render() {
        return this.dropdown.render();
    }
}