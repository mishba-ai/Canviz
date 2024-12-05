// app.ts
import { Canvas } from './components/Canvas';
import { Toolbar } from './components/Toolbar';
import { Colorpicker } from './components/Colorpicker';

export function createApp() {
  const canvas = new Canvas();
  const toolbar = new Toolbar();
  const colorPicker = new Colorpicker();

  // Set up event listeners, state management, and other application logic
  canvas.setup();
  toolbar.setup();
  colorPicker.setup();

  return {
    mount: (selector: string) => {
      // Mount the application to the DOM
      const rootElement = document.querySelector(selector);
      if (rootElement) {
        rootElement.appendChild(canvas.element);
        rootElement.appendChild(toolbar.element);
        rootElement.appendChild(colorPicker.element);
      }
    },
  };
}