// point class to store mouse coordinates

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

// like jquery selector

function $(selector) {
  elem = document.querySelector(selector);
  return elem;
}

// hide & show functions

function hide(elem) {
  elem.style.display = "none";
}

function show(elem) {
  elem.style.display = "block";
}

function addEventListener(elem, work) {
  elem.addEventListener("click", work);
}

// ***************** important functions ********************

function findDistance() {
  let dis = Math.sqrt(
    Math.pow(currPos.x - startPos.x, 2) + Math.pow(currPos.y - startPos.y, 2)
  );
  return dis;
}

// draw function
function draw(x, y) {
  // context refers to a drawing context object in JavaScript, typically obtained using the getContext("2d") method of a canvas element. It provides various functions for drawing shapes, lines, and text on the canvas.
  context.lineTo(x, y);
  context.stroke();
  context.beginPath();
  context.moveTo(x, y);
}

// function drawing shapes
function drawShapes(x, y) {
  context.putImageData(savedPos, 0, 0); //putImageData is use for drawing shapes on canvas
  context.beginPath(); //beginPath is for starting a new path on canvas

  if (choosedShape == "line") {
    context.moveTo(startPos.x, startPos.y);
    context.lineTo(curpos.x, curpos.y);
  } else if (choosenShape == "rectangle") {
    let w = currPos.x - startPos.x;
    let h = currPos.y - startPos.y;
    context.rect(startPos.x, startPos.y, w, h);
  } else if ((choosenShape = "circle")) {
    let distance = findDistance(startPos, currPos);
    context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI, false);
  } else if (choosenShape == "triangle") {
    context.moveTo(startPos.x + (currPos.x - startPos.x) / 2, startPos.y);
    context.lineTo(startPos.x, currPos.y);
    context.lineTo(currPos.x, currPos.y);
    context.closePath();
  }

  context.stroke();
}




let canvaBox = $(".board");//board is the class of canvas
let board,context;

let startPos;
let currPos;
let savedPos;
let strikes = [];
let undos = [];
let zoom = 1;

let paints,shapesOpen,bgListOpen = false;
let choosenShape = null;
let tool = "pen";

// creating a canvas
function createCanva(){
  //board is the canvas
  board = document.createElement('canvas');
  board.height = canvaBox.clientHeight; //height of canvas
  board.width = canvaBox.clientWidth; //width of canvas
  board.id = "board";//id of canvas
  context = board.getContext('2d');//context is used to draw shapes on canvas
  canvaBox.appendChild(board);//appending canvas to the board
}
createCanva();

//Menu and action buttons ************************

