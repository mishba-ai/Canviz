import { BaseComponent } from "../BaseComponent.js";

export class Dropdown extends BaseComponent {
    initialize(config) {
        this.items = config.items || [];
        this.position = config.position || 'bottom-right';
        this.onSelect = config.onSelect || (() => { });
        this.isOpen = false;
        this.buttonContent = config.buttonContent || ''; // Accept HTML content for the button
        this.buttonImage = config.buttonImage || ''; // Accept image url for the button
        this.buttonText = config.buttonText || '';
        this.buttonSVG = config.buttonSVG || '';

        this.template = `
    <div class='relative inline-block'>
        <button class="${config.buttonClasses}  flex items-center gap-2 px-4 py-2">
           ${this.buttonSVG ? `<img src="${this.buttonSVG}" alt="icon" />` : this.buttonText}
        </button>
        <div class ="absolute ${this.getPositionClasses()} hidden min-w-[200px] bg-[#ffd60a] border rounded shadow-lg z-50 mt-1">
           ${this.generateMenuItems()}
       </div>
    </div>
       
    `;
    }

    generateMenuItems() {
        return this.items.map(item => `
           <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer dropdown-item" data-value="${item.value}" >
             ${item.label}
            </div>
           `).join('');
    }

    getPositionClasses() {
        const positions = {
            'top-left': 'top-0 left-0',
            'top-right': 'top-0 right-0',
            'bottom-left': 'bottom-0 left-0',
            'bottom-right': 'bottom-0 right-0',
        };
        return positions[this.position] || positions['bottom-right']; // Default to bottom-right if invalid position
    }

    setupEventListeners() {
        const button = this.element.querySelector('button');
        const menu = this.element.querySelector('div:nth-child(2)'); // Select the second div which is the menu

        button.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            menu.classList.toggle('hidden');
        });

        this.element.querySelectorAll('.dropdown-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.onSelect(e.target.dataset.value);
                this.isOpen = false;
                menu.classList.add('hidden'); // Close the menu after selection
            });
        });

        //close when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.element.contains(e.target) && this.isOpen) {
                menu.classList.add('hidden');
                this.isOpen = false;

            }
        });
    }

}