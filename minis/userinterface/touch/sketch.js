var circles = [];
var circle;
var sparkles = [];
var pressTime;
var clickDelay = 200;
var colors = [];




function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);

  var size = sqrt(sq(width) + sq(height));
  colors.push(color(255,0,0));
  colors.push(color(255,255,0));
  colors.push(color(0,255,0));
  colors.push(color(0,255,255));
  colors.push(color(0,0,255));
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
    fill(colors[i]);
    ellipse(touches[i].x, touches[i].y, 100, 100);
  }

  noStroke();
  // for(var i=circles.length-1; i>=0; i--){
  //   circles[i].draw();
  //   if(circles[i].dead){
  //     circles.splice(i,1);
  //   }
  // }
  //
  // for(var i=sparkles.length-1; i>=0; i--){
  //   sparkles[i].draw();
  //   if(sparkles[i].dead){
  //     sparkles.splice(i,1);
  //   }
  // }
}




function touchStarted(){

}

function touchEnded(){

}

function touchMoved(){

}

function mousePressed(){
  // circle = new Circle(mouseX, mouseY);
  // circles.push(circle);
  // pressTime = millis();
}

function mouseReleased(){
  // circle.expanding = false;
  // circle.contracting = true;
}

function mouseClicked(){
  // sprite shit
  // if(millis() - pressTime < clickDelay){
  //   sparkles.push(new Sparkle(mouseX, mouseY));
  // }
}

function mouseWheel(event){
  // if(event.delta > 0){
  //   rectangles.push(new Rectangle(true));
  // } else {
  //   rectangles.push(new Rectangle(false));
  // }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}






function Circle(x, y){
  this.x = x;
  this.y = y;
  this.d = 0;
  this.td = 100;
  this.pd = 0;
  this.expanding = true;
  this.contracting = false;
  this.dead = false;
  this.h = random(360);
}

Circle.prototype = {
  constructor:Circle,

  draw:function(){
    if(this.expanding){
      this.d += 5;
    } else if(this.contracting){
      this.d -= 5;
      if(this.d <= 0){
        this.contracting = false;
        this.d = 0;
        this.dead = true;
      }
    }
    noFill();
    stroke(this.h, 0, 255);
    strokeWeight(10);
    ellipse(this.x, this.y, this.d, this.d);
  },

  sinProgress:function(p){
    return (1 - (cos(PI * p) / 2 - 0.5)) - 1;
  }
}




function Sparkle(x, y){
  this.x = x;
  this.y = y;
  this.lifespan = 1000;
  this.birth = millis();
  this.dead = false;
  this.segments = random(10,20);
  this.angle = TWO_PI / this.segments;
}

Sparkle.prototype = {
  constructor:Sparkle,

  draw:function(){
    var p = (millis() - this.birth) / this.lifespan;
    if(p >= 1){
      this.dead = true;
    }
    strokeWeight(5 * (1-p));
    stroke(255, 1-p);
    push();
    translate(this.x, this.y);
    rotate(p);
    for(var i=0; i<this.segments; i++){
      rotate(this.angle);
      line(10 + p * 50,0,p * 100,0);
    }
    pop();
  }
}
