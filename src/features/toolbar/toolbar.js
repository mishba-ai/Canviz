import { CreationTools } from '../../components/Dropdown/CreationTools.js';
import { ShapeTools } from '../../components/Dropdown/ShapeTools.js';
import { TextTool } from "../../features/toolbar/Text.js"
import { MoveTools } from '../../components/Dropdown/MoveTools.js';
import { ImageTool } from './ImageTool.js'
import { AITool } from './AITool.js';

export class Toolbar {
  constructor(onSelectShape, onSelectTool, onSelectText, onSelectMove, onSelectImage, onSelectAI) {
      this.moveTools = new MoveTools(onSelectMove);
      this.shapeTools = new ShapeTools(onSelectShape);
      this.CreationTools = new CreationTools(onSelectTool);
      this.TextTool = new TextTool(onSelectText);
      this.ImageTool = new ImageTool(onSelectImage);
      this.AITool = new AITool(onSelectAI);

      this.setupToolCoordination();
  }

  setupToolCoordination() {
      // Listen for both dropdown and tool activation events
      document.addEventListener('dropdown-activated', (e) => {
          // Deactivate text tool if it's active
          if (this.TextTool.isActive) {
              const textElement = document.getElementById('text-tool');
              if (textElement) {
                  this.TextTool.deactivate(textElement);
              }
          }
      });

      document.addEventListener('tool-activated', (e) => {
          // Deactivate all dropdowns
          const dropdowns = [
              this.moveTools.dropdown,
              this.shapeTools.dropdown,
              this.CreationTools.dropdown,
              this.ImageTool.dropdown,
              this.AITool.dropdown
          ];

          dropdowns.forEach(dropdown => {
              if (dropdown && dropdown.isIconActive) {
                  dropdown.setActiveState(false);
              }
          });
      });
  }

  render(container) {
      const toolbarElement = document.createElement('div');
      toolbarElement.id = 'toolbar';
      toolbarElement.className = 'flex bg-zinc-800 absolute bottom-3 max-w-[350px] h-12 items-center left-[50%] border border-zinc-700 translate-x-[-50%] rounded-xl z-10 w-full left-1/2';

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