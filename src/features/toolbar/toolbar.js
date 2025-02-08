import { MoveTools } from '../../components/Dropdown/MoveTools.js';
import { ShapeTools } from '../../components/Dropdown/ShapeTools.js';
import { TextTool} from "../../features/toolbar/Text.js"

export class Toolbar {
  constructor(onSelectShape, onSelectTool,onSelectText) {
    this.shapeTools = new ShapeTools(onSelectShape);
    this.moveTools = new MoveTools(onSelectTool);
    this.TextTool = new TextTool(onSelectText)
  }

  render(container) {
    const toolbarElement = document.createElement('div');
    toolbarElement.id = 'toolbar';
    toolbarElement.className = 'flex space-x-  bg-zinc-800 absolute bottom-3 max-w-[600px] h-12  left-[50%] border border-zinc-700 translate-x-[-50%] rounded-xl z-10 w-full left-1/2 ';

    toolbarElement.appendChild(this.shapeTools.render());
    toolbarElement.appendChild(this.moveTools.render());
    toolbarElement.appendChild(this.TextTool.render());
    if (container) {
      container.appendChild(toolbarElement);
    }

    return toolbarElement;
  }
}