var gradient;
var menu;
var drawImg;
var preImg;
var lineWeight = 1;
var hatchNum = 10;
var hatchWidth = 50;
var hatchSpacing = hatchWidth / hatchNum;
var startX, startY;
var endX, endY;
var drawing = false;
var constrain = false;
var freedraw = false;
var fixedAngle = true;
var angle;

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
  angle = QUARTER_PI;
  drawImg = createGraphics(width, height);
  preImg = createGraphics(width, height);
  drawImg.background(255);
  menu = new Menu(gradient);
  menu.addButton(100, 50, 100, 30, "Save", saveImage);
  menu.addSlider(300, 30, 200, 30, "Line Weight:", 0, 5, lineWeight, changeLineWeight);
  menu.addSlider(300, 70, 200, 30, "# of Hatches:", 2, 20, hatchNum, changeHatchNum);
  menu.addSlider(700, 30, 200, 30, "Hatch Width:", 10, 200, hatchWidth, changeHatchWidth);
  menu.addSlider(700, 70, 200, 30, "Hatch Angle:", 0, 360, degrees(angle), changeAngle);
}

function changeAngle(a){
  angle = radians(float(a));
}

function changeHatchNum(size){
  hatchNum = int(size);
  hatchSpacing = hatchWidth / hatchNum;
}

function changeHatchWidth(size){
  hatchWidth = float(size);
  hatchSpacing = hatchWidth / hatchNum;
}

function changeLineWeight(size){
  lineWeight = float(size);
}

function draw(){
  preImg.clear();
  background(255);
  image(drawImg, 0, 0, width, height);
  if(drawing){
    endX = mouseX;
    endY = mouseY;

    // if(constrain){
    //   angle = atan2(endY - startY, endX - startX);
    //   if(angle > 2.7475 || angle < -2.7475){          // left
    //     endY = startY;
    //   } else if(angle >= -2.7475 && angle < -1.9625){ // upper left
    //     endY = startY + (endX - startX);
    //   } else if(angle >= -1.9625 && angle < -1.1775){ // up
    //     endX = startX;
    //   } else if(angle >= -1.1775 && angle < -0.3925){ // upper right
    //     endY = startY - (endX - startX);
    //   } else if(angle >= -0.3925 && angle < 0.3925){  // right
    //     endY = startY;
    //   } else if(angle >= 0.3925 && angle < 1.1775){   // lower right
    //     endY = startY + (endX - startX);
    //   } else if(angle >= 1.1775 && angle < 1.9625){   // down
    //     endX = startX;
    //   } else if(angle >= 1.9625 && angle < 2.7475){   // lower left
    //     endY = startY - (endX - startX);
    //   }
    // }
    if(fixedAngle){
      var start = createVector(startX, startY);
      var end = createVector(endX, endY);
      var dist = p5.Vector.dist(end, start);
      var vec = p5.Vector.fromAngle(angle);
      vec.mult(dist);
      drawHatch(preImg, startX, startY, startX + vec.x, startY + vec.y);
    } else {
      drawHatch(preImg, startX, startY, endX, endY);
    }

  }
  image(preImg, 0, 0, width, height);
  menu.draw();
}

function drawHatch(ctx, x1, y1, x2, y2){
  ctx.strokeWeight(lineWeight);
  var vec = createVector(x2-x1, y2-y1);
  var perpVec = vec.copy();
  perpVec.normalize();
  perpVec.rotate(HALF_PI);
  var xdiff = perpVec.x * (hatchWidth / 2);
  var ydiff = perpVec.y * (hatchWidth / 2);
  for(var i=0; i<hatchNum; i++){
    var xpos1 = x1 - xdiff + perpVec.x * (i * hatchSpacing);
    var ypos1 = y1 - ydiff + perpVec.y * (i * hatchSpacing);
    var xpos2 = x2 - xdiff + perpVec.x * (i * hatchSpacing);
    var ypos2 = y2 - ydiff + perpVec.y * (i * hatchSpacing);
    gradientLine(ctx, xpos1, ypos1, xpos2, ypos2);
  }
}

function gradientLine(ctx, x1, y1, x2, y2) {
  // linear gradient from start to end of line
  var grad = ctx.drawingContext.createLinearGradient(x1, y1, x2, y2);
  var c1 = color(0,0,0,0);
  var c2 = color(0,0,0,255);
  grad.addColorStop(0, c1);
  grad.addColorStop(0.2, c2);
  grad.addColorStop(0.8, c2);
  grad.addColorStop(1, c1);
  ctx.drawingContext.strokeStyle = grad;
  ctx.line(x1, y1, x2, y2);
}

function keyPressed(){
  if(keyCode == 187){
    lineWeight++;
  } else if(keyCode == 189){
    if(lineWeight > 1){
      lineWeight--;
    }
  } else if(keyCode == UP_ARROW){
    hatchNum++;
    hatchSpacing = hatchWidth / hatchNum;
  } else if(keyCode == DOWN_ARROW){
    if(hatchNum > 1){
      hatchNum--;
      hatchSpacing = hatchWidth / hatchNum;
    }
  } else if(keyCode == RIGHT_ARROW){
    hatchWidth++;
    hatchSpacing = hatchWidth / hatchNum;
  } else if(keyCode == LEFT_ARROW){
    if(hatchWidth > 2){
      hatchWidth--;
      hatchSpacing = hatchWidth / hatchNum;
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
  if(fixedAngle){
    var start = createVector(startX, startY);
    var end = createVector(endX, endY);
    var dist = p5.Vector.dist(end, start);
    var vec = p5.Vector.fromAngle(angle);
    vec.mult(dist);
    drawHatch(drawImg, startX, startY, startX + vec.x, startY + vec.y);
  } else {
    drawHatch(drawImg, startX, startY, endX, endY);
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
  if(menu.isOver()){
    menu.mouseDragged();
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  drawImg = createGraphics(width, height);
  preImg = createGraphics(width, height);
  drawImg.background(255);
}
