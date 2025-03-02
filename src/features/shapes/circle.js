
export class shapeCircle{
    drawCirc = (e) => {
    ctx.beginPath(); // creating new path to draw circle
    // getting radius for circle acccording to the mouse pointer
    let radius = Math.sqrt(
      Math.pow(prevMouseX - e.offsetX, 2) + Math.pow(prevMouseY - e.offsetX, 2)
    );
    ctx.arc(prevMouseX, prevMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked ? ctx.fill() : ctx.stroke();
  };
}

  


  