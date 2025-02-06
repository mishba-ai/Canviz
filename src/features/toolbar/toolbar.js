import { MoveTools } from '../../components/Dropdown/MoveTools.js';
import { ShapeTools } from '../../components/Dropdown/ShapeTools.js';

export class Toolbar {
  constructor(onSelectShape, onSelectTool) {
    this.shapeTools = new ShapeTools(onSelectShape);
    this.moveTools = new MoveTools(onSelectTool);
  }

  render(container) {
    const toolbarElement = document.createElement('div');
    toolbarElement.id = 'toolbar';
    toolbarElement.className = 'flex space-x-4 p-4 bg-gray-100';

    toolbarElement.appendChild(this.shapeTools.render());
    toolbarElement.appendChild(this.moveTools.render());

    if (container) {
      container.appendChild(toolbarElement);
    }

    return toolbarElement;
  }
}