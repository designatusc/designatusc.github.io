var gradient;
var menu;
var drawImg;
var pg;
var rot = 0;
var startX, startY;
var lineWeight = 1;
var lineSpacing = 5;

function preload(){
  gradient = loadImage("../designatusc_gradient.png");
}

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);
  stroke(0);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  drawLines();
  drawImg = createGraphics(width, height);
  menu = new Menu(gradient);
}


function draw(){
  background(255);
  drawImg.background(255);
  drawImg.push();
  drawImg.imageMode(CENTER);
  drawImg.translate(width/2, height/2);
  drawImg.image(pg, 0, 0);
  drawImg.rotate(rot);
  drawImg.image(pg, 0, 0);
  drawImg.pop();
  imageMode(CORNER);
  image(drawImg, 0, 0, width, height);
  menu.draw();
}

function drawLines(){
  var size = sqrt(sq(width) + sq(height));
  pg = createGraphics(size, size);
  pg.stroke(0);
  pg.strokeWeight(lineWeight);
  for(var x=0; x<pg.width; x+=lineSpacing){
    pg.line(x, 0, x, pg.height);
  }
}

function keyPressed(){
  if(keyCode == UP_ARROW){
    lineWeight++;
    drawLines();
  } else if(keyCode == DOWN_ARROW){
    if(lineWeight > 1){
      lineWeight--;
      drawLines();
    }
  } else if(keyCode == RIGHT_ARROW){
    lineSpacing++;
    drawLines();
  } else if(keyCode == LEFT_ARROW){
    if(lineSpacing > 1){
      lineSpacing--;
      drawLines();
    }
  } else if(keyCode == ENTER || keyCode == RETURN){
    saveImage();
  }
}

function mousePressed(){
  if(menu.isOver()){
    menu.mousePressed();
  } else {
    startX = mouseX;
    startY = mouseY;
  }
}

function mouseReleased(){
  if(menu.isOver()){
    menu.mouseReleased();
  }
}

function mouseDragged(){
  if(!menu.isOver()){
    rot += (mouseX - pmouseX) * 0.001;
  }
}

function mouseMoved(){
  if(menu != undefined){
    if(mouseY > height - menu.height){
      menu.expand();
    } else {
      menu.contract();
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
