colorpicker.addEventListener("change",() => {
    // passing picked color value from color picker to last color btn background
    colorpicker.parentElement.style.background = colorpicker.value;
    colorpicker.parentElement.click()
  })