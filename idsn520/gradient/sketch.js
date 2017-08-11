var gradient;
var menu;
var drawImg;
var lineWeight = 5;
var startX, startY;
var endX, endY;
var drawing = false;
var constrain = false;
var freedraw = false;
var colors, positions;

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
  colors = [color(255,0,0), color(0,0,255)];
  positions = [0, 1];
  menu = new Menu(gradient);
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
    if(freedraw){
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

function drawGradient(ctx, colorValues, colorStops){
  // draws a gradient between startX/startY and endX/endY
  var start = createVector(startX, startY);
  var end = createVector(endX, endY);
  var dist = p5.Vector.dist(end, start);
  var vec = createVector(endX-startX, endY-startY);
  vec.normalize();
  var perpVec = vec.copy();
  perpVec.rotate(HALF_PI);
  var numLines = dist / lineWeight;
  // draw square above gradient
  ctx.noStroke();
  ctx.fill(getColor(0, colorValues, colorStops));
  ctx.beginShape();
  ctx.vertex(startX - (perpVec.x * width), startY - (perpVec.y * width));
  ctx.vertex(startX + (perpVec.x * width), startY + (perpVec.y * width));
  ctx.vertex(startX + (perpVec.x * width) - (vec.x * width), startY + (perpVec.y * width) - (vec.y * width));
  ctx.vertex(startX - (perpVec.x * width) - (vec.x * width), startY - (perpVec.y * width) - (vec.y * width));
  ctx.endShape(CLOSE);
  // draw square below gradient
  ctx.fill(getColor(0.99, colorValues, colorStops));
  ctx.beginShape();
  ctx.vertex(endX - (perpVec.x * width), endY - (perpVec.y * width));
  ctx.vertex(endX + (perpVec.x * width), endY + (perpVec.y * width));
  ctx.vertex(endX + (perpVec.x * width) + (vec.x * width), endY + (perpVec.y * width) + (vec.y * width));
  ctx.vertex(endX - (perpVec.x * width) + (vec.x * width), endY - (perpVec.y * width) + (vec.y * width));
  ctx.endShape(CLOSE);
  // draw gradient
  ctx.strokeWeight(lineWeight+1);
  for(var i=0; i<numLines; i++){
    var xpos = start.x + ((vec.x * lineWeight) * i);
    var ypos = start.y + ((vec.y * lineWeight) * i);
    // ctx.fill(0);
    // ctx.point(xpos, ypos);
    ctx.stroke(getColor(i/numLines, colorValues, colorStops));
    ctx.line(xpos - (perpVec.x * width), ypos - (perpVec.y * width), xpos + (perpVec.x * width), ypos + (perpVec.y * width));
  }
}

function getColor(pos, colorValues, colorStops){
  // return lerpColor based on gradient
  // colorValues is an array of color values.
  // colorStops is an array of color stops from 0 to 1.
  var firstPos = colorStops[0];
  var firstColor = colorValues[0];
  var lastPos = colorStops[0];
  var lastColor = colorValues[0];
  for(var i=0; i<colorStops.length; i++){
    if(colorStops[i] > pos){  // first color stop past position
      lastPos = colorStops[i];
      lastColor = colorValues[i];
      var posRange = lastPos - firstPos;
      var posDiff = pos - firstPos;
      var normPos = posDiff / posRange;
      var c = lerpColor(firstColor, lastColor, normPos);
      return c;
    } else {
      firstPos = colorStops[i];
      firstColor = colorValues[i];
    }
  }
  return colorValues[colorValues.length-1];
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
  drawGradient(drawImg, colors, positions);
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
}
