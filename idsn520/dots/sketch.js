var gradient;
var menu;
var drawImg;
var dotSize = 10;

function preload(){
  gradient = loadImage("../designatusc_gradient.png");
}

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);
  rectMode(CENTER);
  ellipseMode(CENTER);
  textAlign(CENTER, CENTER);
  noStroke();
  drawImg = createGraphics(width, height);
  drawImg.background(255);
  menu = new Menu(gradient);
  menu.addButton(100, 50, 100, 30, "Save", saveImage);
  menu.addSlider(300, 50, 200, 30, "Dot Size:", 1, 50, dotSize, changeDotSize);
}

function changeDotSize(size){
  dotSize = size;
}

function draw(){
  background(255);
  image(drawImg, 0, 0, width, height);
  stroke(0);
  noFill();
  ellipse(mouseX, mouseY, dotSize, dotSize);
  menu.draw();
}

function keyPressed(){
  if(keyCode == 187){
    dotSize++;
  } else if(keyCode == 189){
    if(dotSize > 1){
      dotSize--;
    }
  } else if(keyCode == ENTER || keyCode == RETURN){
    saveImage();
  }
}

function mousePressed(){
  if(menu.isOver()){
    menu.mousePressed();
  } else {
    drawImg.fill(0);
    drawImg.ellipseMode(CENTER);
    drawImg.ellipse(mouseX, mouseY, dotSize, dotSize);
  }
}

function mouseReleased(){
  if(menu.isOver()){
    menu.mouseReleased();
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

function mouseDragged(){
  if(menu != undefined){
    if(mouseY > height - menu.height){
      menu.mouseDragged();
    }
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  drawImg = createGraphics(width, height);
  drawImg.background(255);
}
