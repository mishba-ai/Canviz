import { CreationTools } from '../../components/Dropdown/CreationTools.js';
import { ShapeTools } from '../../components/Dropdown/ShapeTools.js';
import { TextTool } from "../../features/toolbar/Text.js"
import { MoveTools } from '../../components/Dropdown/MoveTools.js';
import { ImageTool } from './ImageTool.js'
import { AITool } from './AITool.js';

export class Toolbar {
  constructor(onSelectShape, onSelectTool, onSelectText, onSelectMove, onSelectImage ,onSelectAI) {
    this.moveTools = new MoveTools(onSelectMove);
    this.shapeTools = new ShapeTools(onSelectShape);
    this.CreationTools = new CreationTools(onSelectTool);
    this.TextTool = new TextTool(onSelectText)
    this.ImageTool = new ImageTool(onSelectImage)
    this.AITool = new AITool(onSelectAI)
  }

  render(container) {
    const toolbarElement = document.createElement('div');
    toolbarElement.id = 'toolbar';
    toolbarElement.className = 'flex space-x-  bg-zinc-800 absolute bottom-3 max-w-[350px] h-12 items-center  left-[50%] border border-zinc-700 translate-x-[-50%] rounded-xl z-10 w-full left-1/2 ';

    toolbarElement.appendChild(this.moveTools.render());
    toolbarElement.appendChild(this.shapeTools.render());
    toolbarElement.appendChild(this.CreationTools.render());
    toolbarElement.appendChild(this.TextTool.render());
    toolbarElement.appendChild(this.ImageTool.render());
    toolbarElement.appendChild(this.AITool.render())

    if (container) {
      container.appendChild(toolbarElement);
    }

    return toolbarElement;
  }
}