import { BaseComponent } from "../BaseComponent.js";
const arr_icon = "../../../assets/icons/d_arrow.svg";

export class Dropdown extends BaseComponent {

    constructor(config) {
        super(config);
        this.id = config.id || `dropdown-${Math.random().toString(36).substring(2, 9)}`;
    }

    initialize(config) {
        this.items = config.items || [];
        this.position = config.position || 'bottom-right';
        this.onSelect = config.onSelect || (() => { });
        this.isOpen = false;
        this.buttonSVG = config.buttonSVG || '';
        this.buttonText = config.buttonText || '';
        this.selectedIcon = config.buttonSVG || ''; // Track currently selected icon  
        this.isIconActive = false;

        this.template = `
            <div class='relative inline-flex items-center ' data-dropdown-id="${this.id}">
                <div class="flex items-center rounded-md bg-transparent  transition-colors">
                    <button class="cursor-pointer hover:bg-[#363636] w-8 h-8 flex rounded-md items-center justify-center bg-transparent icon-container">
                        ${this.buttonSVG ? `<img src="${this.buttonSVG}" alt="icon" class="w-5 h-5  selected-icon" />` : ''}
                    </button>
                    <span class="text-sm text-white">${this.buttonText}</span>
                    <div class="hover:bg-[#363636] w-3 h-8 arrow-icon flex items-center cursor-pointer justify-center ">
                       <img src="${arr_icon}" alt="dropdown" class="w-2  h-2 mt-0.5  hover:bg-[#363636] " />
                    </div>
                </div>
                
                <div class="absolute ${this.getPositionClasses()} hidden min-w-[200px] bg-[#1C1C1C] border border-[#333333] rounded-lg shadow-xl z-50 mt-2 py-2 dropdown-menu">
                    ${this.generateMenuItems()}
                </div>
            </div>
        `;
    }

    generateMenuItems() {
        return this.items.map(item => `
            <div class="flex justify-between items-center px-4 py-2 hover:bg-[#2A2A2A] cursor-pointer transition-colors"
                 data-value="${item.value}"
                 data-icon="${item.icon || ''}">
                <div class="flex items-center gap-1">
                    ${item.icon ? `<img src="${item.icon}" class="w-4 h-4" />` : ''}
                    <span class="text-sm text-white">${item.label}</span>
                </div>
                ${item.shortcut ? `<span class="text-xs text-[#888888]">${item.shortcut}</span>` : ''}
            </div>
        `).join('');
    }

    getPositionClasses() {
        return {
            'top-left': 'top-0 left-0',
            'top-right': 'top-0 right-0',
            'bottom-left': 'bottom-0 left-0',
            'bottom-right': 'bottom-0 right-0',
        }[this.position] || 'bottom-0 right-0';
    }

    setupEventListeners() {
        const dropdown_indicator = this.element.querySelector('.arrow-icon');
        const menu = this.element.querySelector('.dropdown-menu');
        const selectedIconElement = this.element.querySelector('.selected-icon');
        const iconContainer = this.element.querySelector('.icon-container');

        //handle icon container click
        iconContainer.addEventListener('click', (e) => {
            e.stopPropagation();
            
            // Only set active if it's currently inactive
            if (!this.isIconActive) {
                this.setActiveState(true);
            }

             // This ensures clicking the icon activates the tool functionality
        const currentValue = this.element.querySelector('[data-value].active')?.dataset.value;
        if (currentValue) {
            // Simulate selecting the current item
            this.onSelect({
                value: currentValue,
                icon: this.selectedIcon
            });
        } else {
            // If no item is active, select the first one
            const firstItem = this.element.querySelector('[data-value]');
            if (firstItem) {
                this.onSelect({
                    value: firstItem.dataset.value,
                    icon: firstItem.dataset.icon
                });
            }
        }
        });

        // Only open dropdown when arrow icon is clicked 
        dropdown_indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            this.isOpen = !this.isOpen;
            menu.classList.toggle('hidden');

            //  set active state when clicking the elemnt from the dropdown
            this.setActiveState(true);
        });

        this.element.querySelectorAll('[data-value]').forEach(item => {
            item.addEventListener('click', (e) => {
                const selectedValue = e.currentTarget.dataset.value;
                const selectedIcon = e.currentTarget.dataset.icon;

                // Update the displayed icon
                if (selectedIconElement && selectedIcon) {
                    selectedIconElement.src = selectedIcon;
                    this.selectedIcon = selectedIcon;
                }
                this.onSelect({
                    value: selectedValue,
                    icon: selectedIcon, // Pass the selected icon to the onSelect callback

                });

                this.closeMenu();
            });
        });

        // Listen for dropdown-activated events
        document.addEventListener('dropdown-activated', (e) => {
            if (e.detail.dropdownId !== this.id) {
                this.setActiveState(false);

            }
        });

        // / Listen for tool activation events
        document.addEventListener('tool-activated', (e) => {
            if (this.isIconActive) {
                this.setActiveState(false);
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', () => {
            this.closeMenu();
        });
    }


    setActiveState(active) {
        this.isIconActive = active;
        const iconContainer = this.element.querySelector('.icon-container');

        if (active) {
            iconContainer.classList.add('bg-zinc-700');
            // Emit dropdown activation event if becoming active
            const event = new CustomEvent('dropdown-activated', {
                bubbles: true,
                detail: { dropdownId: this.id }
            });

            this.element.dispatchEvent(event);
        } else {
            iconContainer.classList.remove('bg-zinc-700');
            iconContainer.classList.add('bg-transparent');
            this.closeMenu() //close menu when deactivate
        }
    }
    closeMenu() {
        if (this.isOpen) {
            this.isOpen = false;
            this.element.querySelector('.dropdown-menu').classList.add('hidden');
        }
    }

    // Method to get current selected icon
    getSelectedIcon() {
        return this.selectedIcon;
    }
}