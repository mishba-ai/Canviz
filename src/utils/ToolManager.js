//state management 

export class ToolManager {
    constructor() {
        this.activeDropdown = null;
        this.activeTool = null;
        this.tools = new Map();
        this.setupEventListeners();
    }

    registerTool(toolId, tool) {
        this.tools.set(toolId, tool);
    }

    setupEventListeners() {
        //listen for dropdown activation
        document.addEventListener('dropdown-activated', (e) => {
            const { dropdownId } = e.detail;
            // Deactivate previous dropdown if different
            if (this.activeDropdown && this.activeDropdown !== dropdownId) {
                const prevDropdown = this.tools.get(this.activeDropdown);
                if (prevDropdown?.dropdown) {
                    prevDropdown.dropdown.setActiveState(false);
                }
            }

            // Deactivate active tool if exists
            if (this.activeTool) {
                const tool = this.tools.get(this.activeTool);
                if (tool?.deactivate) {
                    const toolElement = document.getElementById(this.activeTool);
                    tool.deactivate(toolElement);
                }
            }

            this.activeDropdown = dropdownId;
        });

        // Listen for tool activation
        document.addEventListener('tool-activated', (e) => {
            const { toolId } = e.detail;

            // Deactivate active dropdown if exists
            if (this.activeDropdown) {
                const dropdown = this.tools.get(this.activeDropdown);
                if (dropdown?.dropdown) {
                    dropdown.dropdown.setActiveState(false);
                }
                this.activeDropdown = null;
            }

            // Deactivate previous tool if different
            if (this.activeTool && this.activeTool !== toolId) {
                const prevTool = this.tools.get(this.activeTool);
                if (prevTool?.deactivate) {
                    const toolElement = document.getElementById(this.activeTool);
                    prevTool.deactivate(toolElement);
                }
            }

            this.activeTool = toolId;
        });
    }
}