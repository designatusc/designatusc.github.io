function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);
}

function draw(){
  background(255);
  background(220, 50);
  fill('magenta');
  ellipse(width / 2, height / 2, accelerationZ);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
