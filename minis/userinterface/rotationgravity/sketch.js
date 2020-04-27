let balls = [];
let gravity;

function setup(){
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("sketch");
  frameRate(60);
  colorMode(HSB);
  gravity = createVector(0,0);
  angleMode(DEGREES);
}

function draw(){
  background(0);
  for(let i=0; i<balls.length; i++){
    balls[i].display();
  }

  // read the rotation values in a specific order
  gravity.z = map(rotationZ, 0, 180, 0, 1);
  gravity.x = map(rotationX, 0, 180, 0, 1);
  gravity.y = map(rotationY, 0, 180, 0, 1);
}

function mousePressed(){
  balls.push(new Ball());
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}



class Ball{
  constructor(){
    this.pos = createVector(mouseX, mouseY);
    this.vec = createVector(0,0);
    this.r = 25;
    this.d = this.r * 2;
    this.c = color(random(360), 100, 100);
  }

  display(){
    circle(this.pos.x, this.pos.y, this.d);
    this.pos.add(this.vec); // add vector to position
    this.vec.add(gravity);  // add gravity to vector

    // bounce off left and right sides
    if(this.pos.x < this.r){
      this.pos.x = this.r;
      this.vec.x *= -1;
    } else if(this.pos.x > width-this.r){
      this.pos.x = width-this.r;
      this.vec.x *= -1;
    }

    // bounce off top and bottom
    if(this.pos.y < this.r){
      this.pos.y = this.r;
      this.vec.y *= -1;
    } else if(this.pos.y > height-this.r){
      this.pos.y = height-this.r;
      this.vec.y *= -1;
    }
  }
}
