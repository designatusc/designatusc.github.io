var pg;

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(30);
  stroke(0);
  imageMode(CENTER);

  var size = sqrt(sq(width) + sq(height));
  pg = createGraphics(size, size)
  pg.stroke(0);
  for(var x=0; x<pg.width; x+=5){
    pg.line(x, 0, x, pg.height);
  }
}


function draw(){
  background(255);
  translate(width/2, height/2);
  image(pg, 0, 0);
  rotate(mouseX/mouseY);
  image(pg, 0, 0);
  // for(var x=0; x<width; x+=5){
  //   line(x, 0, x, height);
  // }

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
