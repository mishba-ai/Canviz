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
    toolbarElement.className = 'flex space-x-4 p-4 bg-[#fff] absolute bottom-3 max-w-[650px] h-12  left-[50%] border-gray-200 border translate-x-[-50%] rounded-xl z-10 w-full left-1/2 ';

    toolbarElement.appendChild(this.shapeTools.render());
    toolbarElement.appendChild(this.moveTools.render());

    if (container) {
      container.appendChild(toolbarElement);
    }

    return toolbarElement;
  }
}