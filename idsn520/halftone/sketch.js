var img;
var maxSize = 100;
var maxDotSize = 10;
var maxDotRadius = 5;
var processing = false;

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  canvas.drop(gotFile);
  frameRate(30);
  rectMode(CENTER);
  ellipseMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  textSize(18);
  noStroke();
  background(255);
}


function draw(){
  if(img != undefined){
    //image(img,0,0);
    //drawHalftone();
    //noLoop();
  } else {
    background(255);
    text("Drag and drop an image into this window.", width/2, height/2);
  }
}

function drawHalftone(){
  background(255);
  var doubleDotSize = maxDotSize*2;
  fill(0);

  //var pg = createGraphics(maxDotSize,maxDotSize);
  //pg.noStroke();
  //pg.fill(0);

  for(var y=0; y<img.height; y++){
    for(var x=0; x<img.width-1; x++){
      var c = img.get(x, y);
      var b = brightness(c);  // we'll see about this shit.

      push();
      translate(x*maxDotSize, y*maxDotSize);

      var size = maxDotRadius - (maxDotRadius * (b/100.0));
      print(size);
      //pg.background(255);
      //pg.ellipse(maxDotSize/2, maxDotSize/2, size, size);
      //image(pg, 0, 0);

      for(var i=0; i<20-(b/5); i++){
        rect(random(10)-5,random(10)-5, size, size);
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

      pop();
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
