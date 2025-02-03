import { DarkMode } from './utils/Darkmode.js'

export function createApp() {
  // const canvas = new Canvas();
  // const toolbar = new Toolbar();
  // const colorPicker = new Colorpicker();
  const darkmode = new DarkMode()

  // Set up event listeners, state management, and other application logic
  // canvas.setup();
  // toolbar.setup();
  // colorPicker.setup();
  // darkmode.setup()

  return {
    mount: (selector) => {
      // Mount the application to the DOM
      const rootElement = document.querySelector(selector);
      if (rootElement) {
        // rootElement.appendChild(canvas.canvas);
        // rootElement.appendChild(toolbar.element);
        // rootElement.appendChild(colorPicker.element);
        // rootElement.appendChild(darkmode.toggleButton); // Add the dark mode toggle button

      }
    },
  };
}