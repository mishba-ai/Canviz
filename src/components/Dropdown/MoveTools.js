import { Dropdown } from "./Dropdown";

export class MoveTools {
    constructor(onSelectTool) {
        this.dropdown = new Dropdown({
            buttonText: 'Move',
            buttonClasses: 'px-4 py-2 bg-gray-500 text-white rounded',
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