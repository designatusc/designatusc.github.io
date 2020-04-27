var colors = [];

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);

  colors.push(color(255,0,0));
  colors.push(color(255,255,0));
  colors.push(color(0,255,0));
  colors.push(color(0,255,255));
  colors.push(color(0,0,255));
  colors.push(color(255,0,255));
}


function draw(){
  colorMode(HSB);
  background(0);
  stroke(255);
  strokeWeight(5);

  for(var i=1; i<touches.length; i++){
    line(touches[i].x, touches[i].y, touches[i-1].x, touches[i-1].y);
  }
  for(var i=0; i<touches.length; i++){
    var c = i;
    if(i >= colors.length){
      c = c % colors.length;
    }
    fill(colors[c]);
    ellipse(touches[i].x, touches[i].y, 100, 100);
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}
