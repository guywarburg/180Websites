$(document).ready(function(){

  var size = 10;
  var offset = size / 2;
  var balls = [];

  var width;
  var height;
  var maxSpeed = 3;

  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  function ball(x, y){
    this.posX = x - c.offsetLeft;
    this.posY = y - c.offsetTop;
    this.speedX = Math.floor(Math.random() * maxSpeed) + 1;
    this.speedY = Math.floor(Math.random() * maxSpeed) + 1;
    
    this.move =  function(){
      if( this.posX < offset || this.posX > (width - offset))
        this.speedX = -this.speedX; 
      if( this.posY < offset || this.posY > (height - offset)) 
        this.speedY = -this.speedY; 
      
      this.posX += this.speedX; 
      this.posY += this.speedY;
      this.draw();
    }
    this.draw = function(){
      console.log('x: ' + this.posX + ', y: ' + this.posY);
      ctx.beginPath();
      ctx.arc(this.posX, this.posY, 10, 0, 2*Math.PI);
      ctx.fill();
    }
  }
  
  width = window.innerWidth;
  height = window.innerHeight;

  $('#myCanvas').attr({'height': window.innerHeight, 'width': window.innerWidth});

  $('#myCanvas').click(function(event){
    balls.push(new ball(event.pageX, event.pageY));
    setInterval(function(){
      ctx.clearRect(0, 0, width, height);
      for(var i = 0; i < balls.length; i++) {
        balls[i].move();
      }
    }, 30);
  });
})