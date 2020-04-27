function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);
  fill(255);
  textSize(32);
}

function draw(){
  background(accelerationX*25, accelerationY*25, accelerationZ*25);
  text("x: " + accelerationX, 50, 50);
  text("y: " + accelerationY, 50, 80);
  text("z: " + accelerationZ, 50, 110);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
