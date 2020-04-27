let r, g, b;

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);
  fill(255);
  textSize(32);
}

function draw(){
  r = int(accelerationX*25);
  g = int(accelerationY*25);
  b = int(accelerationZ*25);
  background(r, g, b);
  text("x: " + r, 20, 50);
  text("y: " + g, 20, 80);
  text("z: " + b, 20, 110);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
