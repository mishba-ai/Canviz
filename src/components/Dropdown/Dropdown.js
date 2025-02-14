import { BaseComponent } from "../BaseComponent.js";
const arr_icon = "../../../assets/icons/d_arrow.svg";

export class Dropdown extends BaseComponent {
    initialize(config) {
        this.items = config.items || [];
        this.position = config.position || 'bottom-right';
        this.onSelect = config.onSelect || (() => { });
        this.isOpen = false;
        this.buttonSVG = config.buttonSVG || '';
        this.buttonText = config.buttonText || '';
        this.selectedIcon = config.buttonSVG || ''; // Track currently selected icon
        this.template = `
            <div class='relative inline-flex items-center gap-1'>
                <div class="flex items-center rounded-md bg-[#4cc9f0] mx-3  transition-colors">
                    <div class="cursor-pointer hover:bg-[#363636] w-8 h-8 flex rounded-md items-center justify-center bg-red-400">
                        ${this.buttonSVG ? `<img src="${this.buttonSVG}" alt="icon" class="w-5 h-5  selected-icon" />` : ''}
                    </div>
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
        const arrowIcon = this.element.querySelector('.arrow-icon');
        const menu = this.element.querySelector('.dropdown-menu');
        const selectedIconElement = this.element.querySelector('.selected-icon');

        // Only open dropdown when arrow icon is clicked
        arrowIcon.addEventListener('click', (e) => {
            e.stopPropagation();
            this.isOpen = !this.isOpen;
            menu.classList.toggle('hidden');
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
                    icon: selectedIcon
                });

                this.closeMenu();
            });
        });

        document.addEventListener('click', () => this.closeMenu());
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