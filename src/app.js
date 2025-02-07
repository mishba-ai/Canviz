import { Toolbar } from './features/toolbar/toolbar.js';
import { createCanvas } from './utils/canvas.js';

export function createApp() {
    return {
        mount: (selector) => {
            const rootElement = document.querySelector(selector);
            if (rootElement) {
                const toolbar = new Toolbar();
                toolbar.render(rootElement);

                createCanvas(rootElement);
            }
        }
    };
}
