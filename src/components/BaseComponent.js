export class BaseComponent {

    constructor(config = {}) {
        this.element = null;
        this.state = {};
        this.template = '';
        this.eventListeners = {};
        this.initialize(config);
    }

    initialize(config) {
    
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.innerHTML = this.template;
        this.element = wrapper.firstElementChild;
        this.setupEventListeners();
        return this.element;
    }

    setupEventListeners() {

    }

    updateState(newState) {
        this.state = {
            ...this.state,
            ...newState
        };
        this.onStateUpdate();
    }

    onStateUpdate() {

    }

}