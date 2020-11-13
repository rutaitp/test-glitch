//STEP 4:
let socket = io();

socket.on('connect', () => {
  console.log("Connected!");
});

//create variables for random colors;
let r;
let g;
let b;

function setup(){
  createCanvas(windowWidth, windowHeight);
  background(255);

  //create random rgb values
  r = random(255);
  g = random(255);
  b = random(255);

  //listen for different socket events
  //STEP8: listen for draw data
  socket.on('draw', (data) => {
    // console.log(data);
    //draw
    fill(data.red, data.green, data.blue);
    ellipse(data.x, data.y, 10, 10);
  });

  //STEP 14: listen for color change event
  socket.on('change', (data) => {
    // console.log(data);
    let userId = data.user;

    console.log(userId + " just changed its colors to " + data.red + ", " + data.green + ", " + data.blue);
  });
}

function mouseMoved(){
  //STEP5 & STEP 9:
  let mousePos = {
    x: mouseX,
    y: mouseY,
    "red": r,
    "green": g,
    "blue": b
  };
  socket.emit('drawingData', mousePos);
}

//STEP 10: generate new color when mouse is pressed
function mousePressed(){
  //create new random rgb values
  r = random(255);
  g = random(255);
  b = random(255);

  //STEP11: tell the server about data change
  let obj = {
    "message": "I just changed my color",
    "red": r,
    "green": g,
    "blue": b
  };
  socket.emit('change', obj);
}


