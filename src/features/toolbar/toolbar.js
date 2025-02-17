import { CreationTools } from '../../components/Dropdown/CreationTools.js';
import { ShapeTools } from '../../components/Dropdown/ShapeTools.js';
import { TextTool } from "../../features/toolbar/Text.js"
import { MoveTools } from '../../components/Dropdown/MoveTools.js';
import { ImageTool } from './ImageTool.js'
import { AITool } from './AITool.js';
import { ToolManager } from '../../utils/ToolManager.js';

export class Toolbar {
  constructor(onSelectShape, onSelectTool, onSelectText, onSelectMove, onSelectImage, onSelectAI) {
    this.toolmanager = new ToolManager();
    
    //initialize tools
    this.moveTools = new MoveTools(onSelectMove);
      this.shapeTools = new ShapeTools(onSelectShape);
      this.CreationTools = new CreationTools(onSelectTool);
      this.TextTool = new TextTool(onSelectText);
      this.ImageTool = new ImageTool(onSelectImage);
      this.AITool = new AITool(onSelectAI);
      
//register tools with manager
      this.registerTools();
  }

  registerTools(){
    //register dropdowns
    this.toolmanager.registerTool('move-tools',this.moveTools);
    this.toolmanager.registerTool('shape-tools',this.shapeTools);
    this.toolmanager.registerTool('creation-tools',this.CreationTools);
    this.toolmanager.registerTool('image-tool',this.ImageTool);
    this.toolmanager.registerTool('ai-tool',this.AITool);

     // Register individual tools
     this.toolmanager.registerTool('text-tool', this.TextTool);

  }


  render(container) {
      const toolbarElement = document.createElement('div');
      toolbarElement.id = 'toolbar';
      toolbarElement.className = 'flex bg-zinc-800 absolute bottom-3 max-w-[350px] h-12 items-center left-[50%] border border-zinc-700 translate-x-[-50%] rounded-xl z-10 w-full left-1/2';

      //add tools to toolbar
      toolbarElement.appendChild(this.moveTools.render());
      toolbarElement.appendChild(this.shapeTools.render());
      toolbarElement.appendChild(this.CreationTools.render());
      toolbarElement.appendChild(this.TextTool.render());
      toolbarElement.appendChild(this.ImageTool.render());
      toolbarElement.appendChild(this.AITool.render());

      if (container) {
          container.appendChild(toolbarElement);
      }

      return toolbarElement;
  }
}