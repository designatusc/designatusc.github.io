var gradient;
var menu;
var img;
var bwImg;
var drawImg;
var maxSize = 100;
var dotSize = 10;
var maxDotSize = 50;
var particles = [];

function preload(){
  gradient = loadImage("../designatusc_gradient.png");
  img = loadImage("milesdavis.jpg");
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
  drawImg.noStroke();
  //drawImg.background(255);
  menu = new Menu(gradient);
  menu.addButton(100, 50, 100, 30, "Save", saveImage);

  var sourceAR = img.height / img.width;
  var windowAR = height / width;
  if(sourceAR < windowAR){
    img.resize(0,height);
  } else {
    img.resize(width,0);
  }
  
  // copy and convert to bw
  bwImg = createGraphics(width, height);
  bwImg.background(255);
  bwImg.imageMode(CENTER);
  bwImg.image(img, width/2, height/2);
  bwImg.filter(GRAY);
}

function draw(){
  background(255);
  imageMode(CENTER);
  bwImg.loadPixels();
  for(var i=0; i<particles.length; i++){
    particles[i].draw();
  }
  image(bwImg, width/2, height/2);
  image(drawImg, width/2, height/2, width, height);
  // stroke(0);
  // noFill();
  // ellipse(mouseX, mouseY, dotSize, dotSize);
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
  if(menu.isOver()){
    // menu.mousePressed();
  } else {
    var p = new Particle(drawImg, mouseX, mouseY, bwImg);
    particles.push(p);
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  drawImg = createGraphics(width, height);
  drawImg.background(255);
}




function Particle(ctx, x, y, img){
  this.ctx = ctx;
  this.pos = createVector(x, y);
  this.img = img;
  this.imgIndex = (y * img.width + x) * 4;
  this.c = 0;
  this.d = 0;
  this.getColor();
}

Particle.prototype = {
  constructor:Particle,

  draw:function(){
    this.ctx.fill(255);
    //this.ctx.ellipse(this.pos.x, this.pos.y, this.d, this.d);
    this.ctx.rect(this.pos.x, this.pos.y, this.d, this.d);
  },

  getColor:function(){
    //this.c = this.img.pixels[this.imgIndex];
    this.c = this.img.get(this.pos.x, this.pos.y);
    //console.log(this.c);
    this.d = (brightness(this.c) / 255) * maxDotSize;
  }
}
