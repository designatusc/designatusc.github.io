
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
  //this.saveButton = new Button(100, 50, 100, 30, "Save", saveImage);
  this.interfaceElements = [];
  //this.interfaceElements.push(this.saveButton);
}

Menu.prototype = {
  constructor:Menu,

  addButton:function(x, y, w, h, label, callback){
    this.interfaceElements.push( new Button(x, y, w, h, label, callback) );
  },

  addColorBox:function(x, y, w, h, c, callback){
    var cb = new ColorBox(x,y,w,h,c);
    var cs = new ColorSelection(width/2, -height/2, width/2, width/2, callback);
    cb.addColorSelector(cs);
    cs.addColorBox(cb);
    this.interfaceElements.push(cb);
    this.interfaceElements.push(cs);
  },

  addRadioButtons:function(x, y, label, callback){
    var rb = new RadioButtons(x, y, label, callback);
    this.interfaceElements.push(rb);
    return rb;
  },

  addSlider:function(x, y, w, h, label, min, max, value, callback){
    this.interfaceElements.push( new Slider(x, y, w, h, label, min, max, value, callback) );
  },

  draw:function(){
    rectMode(CENTER);
    imageMode(CORNER);
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
    var mx = mouseX;
    var my = mouseY - (height - this.height);
    //var my = mouseY - this.y;
    for(var i=0; i<this.interfaceElements.length; i++){
      if(this.interfaceElements[i].visible){
        //console.log(mouseX, mouseY);
        if(this.interfaceElements[i].isOver(mx, my)){
          return true;
        }
      }
    }
    return false;
  },

  mousePressed:function(){
    var mx = mouseX;
    var my = mouseY - (height - this.height);
    //var my = mouseY - this.y;
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
  },

  mouseDragged:function(){
    var mx = mouseX;
    var my = mouseY - (height - this.height);
    for(var i=0; i<this.interfaceElements.length; i++){
      if(this.interfaceElements[i].isOver(mx, my)){
        this.interfaceElements[i].mouseDragged(mx, my)
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
    // does nothing
  },

  mouseDragged:function(mx, my){
    // does nothing
  }
}




function RadioButtons(x, y, label, callback){
  this.x = x;
  this.y = y;
  this.label = label;
  this.callback = callback;
  this.boxes = [];
}

RadioButtons.prototype = {
  constructor:RadioButtons,

  draw:function(){
    for(var i=0; i<this.boxes.length; i++){
      this.boxes[i].draw();
    }
  },

  addButton:function(id, boxlabel, selected){
    this.boxes.push( new RadioButtonBox(this.x, this.y + (this.boxes.length * 30), 20, 20, id, boxlabel, selected, this.buttonPressed) );
  },

  isOver:function(mx, my){
    for(var i=0; i<this.boxes.length; i++){
      if(this.boxes[i].isOver(mx, my)){
        return true;
      }
    }
    return false;
  },

  mousePressed:function(mx, my){
    var selected = -1;
    for(var i=0; i<this.boxes.length; i++){
      if(this.boxes[i].isOver(mx, my)){
        this.boxes[i].mousePressed(mx, my);
        selected = i;
        this.callback(i);
      }
    }

    // deselect all other radio button boxes
    for(var i=0; i<this.boxes.length; i++){
      if(this.boxes[i].id != selected){
        this.boxes[i].selected = false;
      }
    }
  },

  mouseReleased:function(mx, my){
    // does nothing
  },

  mouseDragged:function(mx, my){
    // does nothing
  }
}




function RadioButtonBox(x, y, w, h, id, label, selected, callback){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.bgc = color(50,50,50);
  this.fgc = color(255);
  this.id = id;
  this.label = label;
  this.selected = selected;
  this.callback = callback;
}

RadioButtonBox.prototype = {
  constructor:RadioButtonBox,

  draw:function(){
    if(this.selected){
      fill(this.fgc);
    } else {
      fill(this.bgc);
    }
    rect(this.x, this.y, this.w, this.h);
    fill(this.fgc);
    text(this.label, this.x + this.w, this.y);
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
    this.selected = true;
    //this.callback(this.id);
  }
}




function Slider(x, y, w, h, label, min, max, value, callback){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.bgc = color(50,50,50);
  this.fgc = color(255);
  this.label = label;
  this.min = min;
  this.max = max;
  this.value = value;
  this.pos = ((value - min) / (max-min)) * w;
  this.callback = callback;
}

Slider.prototype = {
  constructor:Slider,

  draw:function(){
    noStroke();
    fill(this.bgc);
    rect(this.x, this.y, this.w, 5);
    fill(this.fgc);
    rect(this.x - (this.w/2) + this.pos, this.y, 10, this.h);
    textAlign(LEFT);
    text(this.label +" "+ int(this.value), this.x + (this.w/2) + 20, this.y);
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
      this.changeValue(mx);
    }
  },

  mouseReleased:function(mx, my){
    // does nothing
  },

  mouseDragged:function(mx, my){
    if(this.isOver(mx, my)){
      this.changeValue(mx);
    }
  },

  changeValue:function(mx){
    this.pos = mx - (this.x - this.w/2);
    this.value = ((this.pos / this.w) * (this.max-this.min)) + this.min;
    this.callback(this.value);
  }
}




function ColorBox(x, y, w, h, c){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;
}

ColorBox.prototype = {
  constructor:ColorBox,

  addColorSelector:function(cs){
    this.cs = cs;
  },

  colorSelected:function(c){
    this.c = c;
  },

  draw:function(){
    stroke(255);
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);

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
    this.cs.visible = true;
  },

  mouseReleased:function(mx, my){
    // does nothing
  },

  mouseDragged:function(mx, my){
    // does nothing
  }
}





function ColorSelection(x, y, w, h, callback){
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.callback = callback;
  this.gradient = createGraphics(w, h);
  this.gradient.background(255);
  this.gradient.colorMode(HSB, w);
  for(var x=0; x<w; x++){
    var c = this.gradient.color(x, w, w);
    this.gradient.stroke(c);
    this.gradient.line(x, 0, x, h);
  }
  for(var y=0; y<h; y++){
    var c = this.gradient.color(0, 0, w, w-y);
    this.gradient.stroke(c);
    this.gradient.line(0, y, w, y);
  }
  this.gradient.colorMode(RGB, 255);
  this.visible = false;
}

ColorSelection.prototype = {
  constructor:ColorSelection,

  addColorBox:function(cb){
    this.cb = cb;
  },

  draw:function(){
    if(this.visible){
      fill(0);
      noStroke();
      rect(this.x, this.y, this.w+40, this.h+40);
      imageMode(CENTER);
      image(this.gradient, this.x, this.y, this.w, this.h);
    }
  },

  isOver:function(mx, my){
    //console.log(mx, my, this.x, this.y);
    // FIXME: kludge positioning solution
    my -= 100;
    if(mx > this.x - this.w/2 && mx < this.x + this.w/2){
      if(my > this.y - this.h/2 && my < this.y + this.h/2){
        //console.log("selecting color");
        return true;
      }
    }
    return false;
  },

  mousePressed:function(mx, my){
    // FIXME: kludge positioning solution
    if(this.visible){
      my -= 100;
      var cx = int(this.w/2 + (mx - this.x));
      var cy = int(this.h/2 + (my - this.y));
      //console.log(cx, cy);
      var c = this.gradient.get(cx, cy);
      var newc = color(c[0], c[1], c[2], c[3]);
      this.callback(newc);
      this.cb.colorSelected(newc);
    }
  },

  mouseReleased:function(mx, my){
    // does nothing
  },

  mouseDragged:function(mx, my){
    // does nothing
  }
}
