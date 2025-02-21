export class DarkMode {
  constructor() {
    this.init();
  }

 // Modified toggleDarkMode function with error handling
toggleDarkMode = () => {
  try {
    console.log("Toggle Dark Mode clicked");
    
    const html = document.documentElement;
    if (!html) throw new Error('HTML element not found');
    
    const isDarkMode = html.getAttribute('data-theme') === 'dark';
    console.log(`Current theme: ${isDarkMode ? 'dark' : 'light'}`);
    
    const newTheme = isDarkMode ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    console.log(`Theme changed to: ${newTheme}`);
  } catch (error) {
    console.error('Toggle error:', error);
  }
}


  init() {
    // Wait for DOM readiness
    document.addEventListener('DOMContentLoaded', () => {
      const darkModeToggle = document.querySelector("#darkModeToggle");
      if (darkModeToggle) {
        darkModeToggle.addEventListener("click", this.toggleDarkMode);
      }

      // Initialize theme (now DOM-dependent)
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
    });
  }
}
