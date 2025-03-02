const drawtri = (e) => {
    ctx.beginPath();
    ctx.moveTo(prevMouseX, prevMouseY); //moving triangle to the mouse pointer
    ctx.lineTo(e.offsetX, e.offsetY); // creating first line according to the mouse pointer
    ctx.lineTo(prevMouseX * 2 - e.offsetX, e.offsetY); // creating bottom line of triangle
    ctx.closePath(); // closing path of a traingle so the third line draw automatically
    fillColor.checked ? ctx.fill() : ctx.stroke();
  };