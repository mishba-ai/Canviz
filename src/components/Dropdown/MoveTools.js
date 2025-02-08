import { Dropdown } from "./Dropdown.js";

const pen = "../../../assets/icons/pen.svg"
export class MoveTools {
    constructor(onSelectTool) {
        this.dropdown = new Dropdown({
            buttonSVG: pen,
            buttonClasses: 'bg-gray-100 text-white rounded',
            items: [
                { value: 'select', label: 'Select' },
                { value: 'drag', label: 'Drag' },
                { value: 'rotate', label: 'Rotate' }
            ],
            onSelect: (value) => {
                console.log('Selected move tool:', value);
                // Add your move tool logic here
            }
        });
    }

    render() {
        return this.dropdown.render();
    }
}