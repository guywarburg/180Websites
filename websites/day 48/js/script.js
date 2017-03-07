// const h = 500;
// const w = 700;
// const colors = ['#fff', '#000', '#aaa'];

// var ctx = document.getElementById('myCanvas').getContext("2d");

// function colorRect(x, y, size){
//     var fill = Math.floor(Math.random() * 3);
//     ctx.fillStyle = colors[fill];
//     ctx.fillRect(x, y, size, size);
// }

// function myInterval(x,y, size, speed){
//     setInterval(function(){
//         colorRect(x, y, size);
//     }, speed);
    
// }

// function colorCanvas(){
//     for(var i = 0; i < w; i += 1){
//         for(var j = 0; j < h; j += 1){
//             colorRect(i, j, 1);
//         }
//     }
// }

// window.onload = function(){
//     setInterval(function(){
//         colorCanvas();
//     }, 50);
// }


var c = document.getElementById('myCanvas');
var ctx = c.getContext("2d", {alpha: false});       // context without alpha channel.
var idata = ctx.createImageData(c.width, c.height); // create image data
var buffer32 = new Uint32Array(idata.data.buffer);  // get 32-bit view

(function loop() {
  noise(ctx);
  requestAnimationFrame(loop)
})()

function noise(ctx) {
  var len = buffer32.length - 1;
  while(len--) buffer32[len] = Math.random() < 0.5 ? 0 : -1>>0;
  ctx.putImageData(idata, 0, 0);
}