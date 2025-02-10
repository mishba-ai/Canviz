import { Dropdown } from "./Dropdown.js";

const move_cursor = "../../../assets/icons/cursor_arr.svg"

export class MoveTools {
    constructor(onSelectMove) {
        this.dropdown = new Dropdown({
            buttonSVG: move_cursor,
            buttonClasses: 'bg-gray-700 text-white rounded',
            items: [
                { value: 'Move', label: 'Select' },
                { value: 'HandTool', label: 'Drag' },
            ],
            onSelect: (value) => {
                console.log('Selected move tool:', value);
                // Add your move tool logic here
            }
        })
    }

    render() {
        return this.dropdown.render();
    }

}

