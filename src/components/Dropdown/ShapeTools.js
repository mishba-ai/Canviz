import { Dropdown } from "./Dropdown";

export class ShapeTools {
    constructor(onSelectShape) {
        //create shape tools dropdown
        this.dropdown = new Dropdown({
            buttonText: 'Shapes',
            buttonClasses: 'px-4 py-2 bg-blue-500 text-white rounded',
            items: [
                { label: 'Circle', value: 'circle' },
                { label: 'Square', value: 'square' },
                { label: 'Triangle', value: 'triangle' },
                { label: 'Arrow', value: 'arrow' },
                { label: 'Rectangle', value: 'rectangle' },
                { label: 'Image', value: 'image' },
            ],
            onSelect: onSelectShape

        });
    }

    render() {
        return this.dropdown.render();
    }
}

