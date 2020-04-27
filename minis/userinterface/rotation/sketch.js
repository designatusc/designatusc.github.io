let r, g, b;

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);
  fill(255);
  textSize(32);
}

function draw(){
  r = int(rotationX);
  g = int(rotationY);
  b = int(rotationZ);
  background(r, g, b);
  text("x: " + r, 20, 50);
  text("y: " + g, 20, 80);
  text("z: " + b, 20, 110);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
