import { Dropdown } from "./Dropdown.js";

const SHAPES = [
    { label: 'Circle', value: 'circle' },
    { label: 'Square', value: 'square' },
    { label: 'Triangle', value: 'triangle' },
    { label: 'Arrow', value: 'arrow' },
    { label: 'Rectangle', value: 'rectangle' },
    { label: 'Image', value: 'image' },
];
const squareicon = "../../../assets/shapes/square.svg"
export class ShapeTools {
    constructor(onSelectShape) {
        //create shape tools dropdown
        this.dropdown = new Dropdown({
            buttonSVG: squareicon,
            buttonClasses: 'px-4 py-2 bg-blue-500 text-white rounded',
            items: SHAPES,
            onSelect: onSelectShape

        });
    }

    render() {
        return this.dropdown.render();
    }
}
