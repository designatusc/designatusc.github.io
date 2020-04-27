let balls = [];
let gravity;
let lastball = 0;
let delay = 200;

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
  gravity.x = map(rotationY, 0, 180, 0, 1);
  gravity.y = map(rotationX, 0, 180, 0, 1);

  fill(255);
  text("x: " + gravity.x, 20, 50);
  text("y: " + gravity.y, 20, 80);
  text("z: " + gravity.z, 20, 110);
}

function mousePressed(){
  if(millis() - lastball > delay){
    balls.push(new Ball());
    lastball = millis();
  }
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
    fill(this.c);
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

    // add damping to vectors to make them slow over time.
    this.vec.mult(0.98);
  }
}
