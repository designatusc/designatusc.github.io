var img;              // original user submitted image
var halftoneImg;      // P5.Renderer that contains halftone
var maxSize = 100;
var maxDotSize = 10;
var maxDotRadius = 5;
var processing = false;
var gradient;
var menu;

function preload(){
  gradient = loadImage("../designatusc_gradient.png");
}

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  canvas.drop(gotFile);
  frameRate(60);
  halftoneImg = createGraphics(width, height);
  rectMode(CENTER);
  ellipseMode(CENTER);
  //imageMode(CENTER);
  textAlign(CENTER);
  textSize(18);
  noStroke();
  background(255);
  menu = new Menu();
}


function draw(){
  background(255);
  if(img != undefined){
    image(halftoneImg,0,0);
    //drawHalftone();
    //noLoop();
  } else {
    fill(100);
    noStroke();
    text("Drag and drop an image into this window.", width/2, height/2);
  }
  menu.draw();
}

function drawHalftone(){
  halftoneImg.background(255);
  var doubleDotSize = maxDotSize*2;
  halftoneImg.fill(0);

  //var pg = createGraphics(maxDotSize,maxDotSize);
  //pg.noStroke();
  //pg.fill(0);

  for(var y=0; y<img.height; y++){
    for(var x=0; x<img.width-1; x++){
      var c = img.get(x, y);
      var b = brightness(c);  // we'll see about this shit.

      halftoneImg.push();
      halftoneImg.translate(x*maxDotSize, y*maxDotSize);

      var size = maxDotRadius - (maxDotRadius * (b/100.0));
      //print(size);
      //pg.background(255);
      //pg.ellipse(maxDotSize/2, maxDotSize/2, size, size);
      //image(pg, 0, 0);

      for(var i=0; i<20-(b/5); i++){
        halftoneImg.rect(random(10)-5,random(10)-5, size, size);
      }

      // var size = doubleDotSize - (doubleDotSize * (b/100.0));
      // fill(0);
      // ellipse(0,0,size,size);

      // if(b > 50){
      //   // black circle smaller as number is higher
      //   var size = maxDotSize - (((b-50)/50.0) * maxDotSize);
      //   fill(0);
      //   rect(0, 0, size, size);
      // } else {
      //   // white circle smaller as number is lower
      //   var size = (b/50.0) * maxDotSize;
      //   fill(0);
      //   rect(0, 0, maxDotSize, maxDotSize);
      //   fill(255);
      //   rect(0, 0, size, size);
      // }

      halftoneImg.pop();
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

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function gotFile(file){
  if(file.type === 'image'){
    img = loadImage(file.data, imageLoaded);
  }
}

function imageLoaded(){
  if(img.width >= img.height){
    img.resize(maxSize, 0);
    if(height/width < img.height/img.width){
      // screen is wider than image
      maxDotSize = int(height / maxSize);
    } else {
      maxDotSize = int(width / maxSize);
    }
    //maxDotRadius = sqrt(sq(maxDotSize) + sq(maxDotSize));
  } else {
    img.resize(0, maxSize);
  }
  drawHalftone();
}



function Menu(){
  this.x = 0;
  this.y = 0;
  this.height = 100;
  this.expanding = false;
  this.contracting = false;
  this.visible = false;
  this.slideTimer = new Timer(300);
}

Menu.prototype = {
  constructor:Menu,

  draw:function(){
    this.handleSliding();
    push();
    translate(this.x, height + this.y);
    image(gradient, 0, -10, width, 10);
    fill(0);
    rect(width/2, -25, 200, 30, 10, 10, 0, 0);
    rect(width/2, this.height/2, width, this.height);
    stroke(70);
    line(width/2 - 90, -30, width/2 + 90, -30);
    line(width/2 - 90, -25, width/2 + 90, -25);
    line(width/2 - 90, -20, width/2 + 90, -20);
    pop();
  },

  handleSliding:function(){
    if(this.expanding){
      if(this.slideTimer.isFinished()){
        this.y = -this.height;
        this.expanding = false;
        this.visible = true;
      } else {
        this.y = 0 - this.slideTimer.sinProgress() * this.height;
      }
    } else if(this.contracting){
      if(this.slideTimer.isFinished()){
        this.y = 0;
        this.contracting = false;
        this.visible = false;
      } else {
        this.y = (0-this.height) + this.slideTimer.sinProgress() * this.height;
      }
    }
  },

  contract:function(){
    if(!this.contracting && this.visible){
      this.contracting = true;
      this.expanding = false;
      this.slideTimer.start();
    }
  },

  expand:function(){
    if(!this.expanding && !this.visible){
      this.expanding = true;
      this.contracting = false;
      this.slideTimer.start();
    }
  }
}
