var gradient;
var menu;
var drawImg;
var lineWeight = 5;
var startX, startY;
var endX, endY;
var drawing = false;
var constrain = false;
var freedraw = false;
var drawMode = 0;
var capMode = 0;

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
  textSize(18);
  noStroke();
  constrain = false;
  drawImg = createGraphics(width, height);
  drawImg.background(255);
  menu = new Menu(gradient);
  menu.addButton(100, 50, 100, 30, "Save", saveImage);
  menu.addSlider(300, 50, 200, 30, "Line Weight:", 1, 50, lineWeight, changeLineWeight);
  var rb = menu.addRadioButtons(550, 50, "Drawing Mode:", changeDrawingMode)
  rb.addButton(0, "Lines", true);
  rb.addButton(1, "Free", false);
  var rb2 = menu.addRadioButtons(700, 50, "End Cap Mode:", changeCapMode)
  rb2.addButton(0, "Round", true);
  rb2.addButton(1, "Square", false);
}

function changeCapMode(mode){
  capMode = mode;
  if(mode == 0){
    strokeCap(ROUND);
    drawImg.strokeCap(ROUND);
  } else {
    strokeCap(SQUARE);
    drawImg.strokeCap(SQUARE);
  }
}

function changeDrawingMode(mode){
  drawMode = mode;
}

function changeLineWeight(size){
  lineWeight = size;
}

function draw(){
  background(255);
  image(drawImg, 0, 0, width, height);
  if(drawing){
    stroke(255,0,0);
    noFill();
    strokeWeight(lineWeight);
    endX = mouseX;
    endY = mouseY;
    if(drawMode == 1){
      startX = pmouseX;
      startY = pmouseY;
      drawImg.stroke(0);
      drawImg.strokeWeight(lineWeight);
      drawImg.line(startX, startY, endX, endY);
    } else {
      if(constrain){
        angle = atan2(endY - startY, endX - startX);
        if(angle > 2.7475 || angle < -2.7475){          // left
          endY = startY;
        } else if(angle >= -2.7475 && angle < -1.9625){ // upper left
          endY = startY + (endX - startX);
        } else if(angle >= -1.9625 && angle < -1.1775){ // up
          endX = startX;
        } else if(angle >= -1.1775 && angle < -0.3925){ // upper right
          endY = startY - (endX - startX);
        } else if(angle >= -0.3925 && angle < 0.3925){  // right
          endY = startY;
        } else if(angle >= 0.3925 && angle < 1.1775){   // lower right
          endY = startY + (endX - startX);
        } else if(angle >= 1.1775 && angle < 1.9625){   // down
          endX = startX;
        } else if(angle >= 1.9625 && angle < 2.7475){   // lower left
          endY = startY - (endX - startX);
        }
      }
      line(startX, startY, endX, endY);
    }
  }
  menu.draw();
}

function keyPressed(){
  if(keyCode == 187){
    lineWeight++;
  } else if(keyCode == 189){
    if(lineWeight > 1){
      lineWeight--;
    }
  } else if(keyCode == SHIFT){
    constrain = true;
  } else if(key == "1"){
    strokeCap(SQUARE);
    drawImg.strokeCap(SQUARE);
  } else if(key == "2"){
    strokeCap(ROUND);
    drawImg.strokeCap(ROUND);
  } else if(keyCode == ENTER || keyCode == RETURN){
    save(drawImg, "lines.png");
  }
}

function keyReleased(){
  if(keyCode == SHIFT){
    constrain = false;
  }
}

function mousePressed(){
  if(menu.isOver()){
    menu.mousePressed();
  } else {
    drawing = true;
    startX = mouseX;
    startY = mouseY;
  }
}

function mouseReleased(){
  menu.mouseReleased();
  drawing = false;
  //endX = mouseX;
  //endY = mouseY;
  if(!menu.isOver()){
    if(drawMode == 0){
      drawImg.stroke(0);
      drawImg.strokeWeight(lineWeight);
      drawImg.line(startX, startY, endX, endY);
    }
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
