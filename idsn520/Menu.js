
function saveImage(){
  save(drawImg, "drawing.png");
}

function Menu(gradient){
  this.gradient = gradient;
  this.x = 0;
  this.y = 0;
  this.height = 100;
  this.expanding = false;
  this.contracting = false;
  this.visible = false;
  this.slideTimer = new Timer(300);
  // TODO: create add button function
  this.saveButton = new Button(100, 50, 100, 30, "Save", saveImage);
  this.interfaceElements = [];
  this.interfaceElements.push(this.saveButton);
}

Menu.prototype = {
  constructor:Menu,

  draw:function(){
    this.handleSliding();
    push();
    translate(this.x, height + this.y);
    image(this.gradient, 0, -10, width, 10);
    noStroke();
    fill(0);
    rect(width/2, -25, 200, 30, 10, 10, 0, 0);
    rect(width/2, this.height/2, width, this.height);
    strokeWeight(1);
    stroke(70);
    line(width/2 - 90, -30, width/2 + 90, -30);
    line(width/2 - 90, -25, width/2 + 90, -25);
    line(width/2 - 90, -20, width/2 + 90, -20);
    this.drawInterface();
    pop();
  },

  drawInterface:function(){
    for(var i=0; i<this.interfaceElements.length; i++){
      this.interfaceElements[i].draw()
    }
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
  },

  isOver:function(){
    if(mouseY > height - this.height){
      return true;
    }
    return false;
  },

  mousePressed:function(){
    var mx = mouseX;
    var my = mouseY - (height - this.height);
    for(var i=0; i<this.interfaceElements.length; i++){
      if(this.interfaceElements[i].isOver(mx, my)){
        this.interfaceElements[i].mousePressed(mx, my)
      }
    }
  },

  mouseReleased:function(){
    var mx = mouseX;
    var my = mouseY - (height - this.height);
    for(var i=0; i<this.interfaceElements.length; i++){
      if(this.interfaceElements[i].isOver(mx, my)){
        this.interfaceElements[i].mouseReleased(mx, my)
      }
    }
  }
}



function Button(x, y, w, h, label, callback){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.bgc = color(50,50,50);
  this.fgc = color(255);
  this.label = label;
  this.callback = callback;
}

Button.prototype = {
  constructor:Button,

  draw:function(){
    noStroke();
    textSize(14);
    fill(this.bgc);
    rect(this.x, this.y, this.w, this.h);
    fill(this.fgc);
    text(this.label, this.x, this.y);
  },

  isOver:function(mx, my){
    if(mx > this.x - this.w/2 && mx < this.x + this.w/2){
      if(my > this.y - this.h/2 && my < this.y + this.h/2){
        return true;
      }
    }
    return false;
  },

  mousePressed:function(mx, my){
    if(this.isOver(mx, my)){
      this.callback();
    }
  },

  mouseReleased:function(mx, my){

  }
}
