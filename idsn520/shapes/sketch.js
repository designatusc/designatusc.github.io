var gradient;
var menu;
var drawImg;
var dotSize = 10;
var drawing = false;
var constrain = false;
var drawMode = 0; // 0 = rect, 1 = ellipse, 2 = polygon
var createMode;
var startX, startY;
var endX, endY;
var d = 0;  // diameter used for drawing
var canvas;

function preload(){
  gradient = loadImage("../designatusc_gradient.png");
}

function setup(){
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  //context = canvas.getContext('2D');
  frameRate(60);
  createMode = CORNER;
  rectMode(createMode);
  ellipseMode(createMode);
  textAlign(CENTER, CENTER);
  noStroke();
  constrain = false;
  drawImg = createGraphics(width, height);
  drawImg.background(255);
  drawImg.fill(0);
  drawImg.noStroke();
  drawImg.rectMode(createMode);
  drawImg.ellipseMode(createMode);
  menu = new Menu(gradient);
}

function draw(){
  background(255);
  image(drawImg, 0, 0, width, height);
  if(drawing){
    rectMode(createMode);
    ellipseMode(createMode);
    stroke(255,0,0);
    fill(0,0,0,50);
    drawShape(this);
  }
  menu.draw();
}

function drawShape(c){
  endX = mouseX;
  endY = mouseY;
  var w = endX-startX;
  var h = endY-startY;
  if(createMode == CENTER){
    w *= 2;
    h *= 2;
  }
  if(drawMode == 0){              // rectangle
    drawRectangle(c, w, h);
  } else if(drawMode == 1){       // ellipse
    drawEllipse(c, w, h);
  } else if(drawMode == 2){       // polygon

  }
}

function drawEllipse(c, w, h){
  if(createMode == CORNER){
    if(constrain){
      d = Math.sqrt(w*w + h*h);
      if(w < 0 && h >= 0){
        c.ellipse(startX - d, startY, d, d);
      } else if(w < 0 && h < 0){
        c.ellipse(startX - d, startY - d, d, d);
      } else if(w > 0 && h <= 0){
        c.ellipse(startX, startY - d, d, d);
      } else {
        c.ellipse(startX, startY, d, d);
      }
    } else {
      if(w < 0 && h >= 0){
        c.ellipse(startX + w, startY, w, h);
      } else if(w < 0 && h < 0){
        c.ellipse(startX + w, startY + h, w, h);
      } else if(w > 0 && h <= 0){
        c.ellipse(startX, startY + h, w, h);
      } else {
        c.ellipse(startX, startY, w, h);
      }
    }
  } else {
    if(constrain){
      d = Math.sqrt(w*w + h*h);
      c.ellipse(startX, startY, d, d);
    } else {
      c.ellipse(startX, startY, w, h);
    }
  }
}

function drawRectangle(c, w, h){
  if(createMode == CORNER){
    if(constrain){
      d = Math.sqrt(w*w + h*h);
      if(w < 0 && h >= 0){
        c.rect(startX, startY, -d, d);
      } else if(w < 0 && h < 0){
        c.rect(startX, startY, -d, -d);
      } else if(w > 0 && h <= 0){
        c.rect(startX, startY, d, -d);
      } else {
        c.rect(startX, startY, d, d);
      }
    } else {
      c.rect(startX, startY, w, h);
    }
  } else {
    if(constrain){
      d = Math.sqrt(w*w + h*h);
      c.rect(startX, startY, d, d);
    } else {
      c.rect(startX, startY, w, h);
    }
  }
}

function keyPressed(){
  if(keyCode == ENTER || keyCode == RETURN){
    saveImage();
  } else if(keyCode == SHIFT){
      constrain = true;
  } else if(key == "1") {
    drawMode = 0; // rect
  } else if(key == "2") {
    drawMode = 1; // ellipse
  } else if(key == "3") {
    drawMode = 2; // polygon
  } else if(key == "0"){
    if(createMode == CORNER){
      createMode = CENTER;
    } else {
      createMode = CORNER;
    }
    drawImg.rectMode(createMode);
    drawImg.ellipseMode(createMode);
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
  if(menu.isOver()){
    menu.mouseReleased();
  } else {
    drawShape(drawImg);
    drawing = false;
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
  drawImg.fill(0);
  drawImg.noStroke();
  drawImg.rectMode(createMode);
  drawImg.ellipseMode(createMode);
}
