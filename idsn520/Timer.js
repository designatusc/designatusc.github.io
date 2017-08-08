function Timer(duration){
  this.duration = duration;
  this.stopped = false;
  this.paused = false;
}

Timer.prototype = {
  constructor: Timer,

  isFinished:function(){
    if(millis() - this.startTime > this.duration){
      this.stopped = true;
      return true;
    }
    return false;
  },

  pause:function(){
    this.paused = false;
    this.stopped = false;
    this.pauseValue = this.progress();
  },

  start:function(){
    this.startTime = millis();
    this.paused = false;
    this.stopped = false;
  },

  stop:function(){
    this.paused = false;
    this.stopped = true;
  },

  progress:function(){
    if(this.stopped){
      return 0;
    } else if(this.paused){
      return this.pauseValue;
    }
    return (millis() - this.startTime) / this.duration;
  },

  rampProgress:function(){
    if(this.stopped){
      return 0;
    } else if(this.paused){
      return this.pauseValue;
    }
    return 1 - sin(HALF_PI + (HALF_PI * this.progress()))
  },

  sinProgress:function(){
    if(this.stopped){
      return 0;
    } else if(this.paused){
      return this.pauseValue;
    }
    return (1 - (cos(PI * this.progress()) / 2 - 0.5)) - 1;
  }
}
