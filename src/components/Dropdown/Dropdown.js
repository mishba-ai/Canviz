import { BaseComponent } from "../BaseComponent";

export class Dropdown extends BaseComponent {
    initialize(config) {
        this.items = config.items || [];
        this.position = config.position || 'bottom-right';
        this.onSelect = config.onSelect || (() => { });
        this.isOpen = false;

        this.template = `
    <div class='relative inline-block'>
         <button class="${config.buttonClasses}">
            ${config.buttonText}
        </button>
        <div class ="absolute ${this.getPositionClasses()} hidden bg-white-border border rounded shadow-lg z-50">
           ${this.items.map(item => `
           <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer 
           dropdown-item" data-value="${item.value}">
             ${item.label}
            </div>
           `).join('')}
       </div>
    </div>
       
    `;
    }

    getPositionClasses() {
        const positions = {
            'top-left': 'top-0 left-0',
            'top-right': 'top-0 right-0',
            'bottom-left': 'bottom-0 left-0',
            'bottom-right': 'bottom-0 right-0',
        }
    }

    setupEventListeners() {
        const button = this.element.querySelector('button');
        const menu = this.element.querySelector('div');

        button.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            menu.classList.toggle('hidden');
        });

        this.element.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.onSelect(e.target.dataset.value);
                this.isOpen = false;
            });
        });

        //close when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.element.contains(e.target)) {
                this.isOpen = false;
                menu.classList.add('hidden');
                this.isOpen = false;
            }
        });
    }

}




  
  // Add to toolbar
  const toolbar = document.querySelector('#toolbar');
  toolbar.appendChild(shapeToolsDropdown.render());
  toolbar.appendChild(moveToolsDropdown.render());