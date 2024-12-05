// darkmode.ts
// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark');
}

// Event listener for the toggle button
document.getElementById('darkModeToggle')?.addEventListener('click', toggleDarkMode);  
