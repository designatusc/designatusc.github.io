var gradient;
var menu;
var drawImg;
var lineImg;
var lineWeight = 5;
var startX, startY;
var endX, endY;
var drawing = false;
var constrain = false;
var freedraw = false;

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
  lineImg = createGraphics(width, height);
  drawImg.background(255);
  menu = new Menu(gradient);
}

function draw(){
  background(255);
  image(drawImg, 0, 0, width, height);

  drawImg.background(255);
  drawImg.image(lineImg, 0, 0, width, height);
  drawImg.imageMode(CENTER);
  drawImg.push();
  drawImg.translate(width/2, height/2);
  drawImg.scale(-1,1);
  drawImg.image(lineImg, 0, 0, width, height);
  drawImg.pop();
  drawImg.imageMode(CORNER);

  if(drawing){
    stroke(255,0,0);
    noFill();
    strokeWeight(lineWeight);
    endX = mouseX;
    endY = mouseY;
    if(freedraw){
      startX = pmouseX;
      startY = pmouseY;
      lineImg.stroke(0);
      lineImg.strokeWeight(lineWeight);
      lineImg.line(startX, startY, endX, endY);
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
    lineImg.strokeCap(SQUARE);
  } else if(key == "2"){
    strokeCap(ROUND);
    lineImg.strokeCap(ROUND);
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
  if(!freedraw){
    lineImg.stroke(0);
    lineImg.strokeWeight(lineWeight);
    lineImg.line(startX, startY, endX, endY);
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
  drawImg = createGraphics(width, height);
  drawImg.background(255);
  lineImg = createGraphics(width, height);
}
