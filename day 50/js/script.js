// Variables
var c = document.getElementById('myCanvas');
var ctx = c.getContext("2d");       // context without alpha channel.
var idata = ctx.createImageData(c.width, c.height); // create image data
var size = 10;

// Canvas Array representation
var board = [];
var next = [];
for(var i = 0; i < c.width / size; i++){
    board[i] = [];
    next[i] = [];
}

// Init random screen
function init(){
    for(var i = 0; i < c.width / size; i++){
        for(var j = 0; j < c.height / size; j++){
            board[i][j] = Math.random() < 0.5 ? 0 : 1;
            newColorPixel(i, j, idata, board, size);
        }
        next[i] = board[i].slice(0);
    }
    ctx.putImageData(idata, 0, 0);
}

// color and place imagedata according to array representation.
function colorDataImage(arr, ctx, idata){
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[i].length; j++){
            newColorPixel(i, j, idata, arr, size);
        }
    }
    ctx.putImageData(idata, 0, 0);
}

// colors all pixels in a cell of size 'size'
// sets the color according to representation in array
function newColorPixel(i, j, dataImage, arr, size) {
    // set color
    var color;
    if(arr[i][j] === 1){
        color = 0; // alive = black
    } else {
        color = 255; // dead = white
    }
    // define cell size and iterate throught all pixels and assign color.
    var x = i * size;
    var stopX = x + size;

    for(x; x < stopX; x++){
        var y = j * size;
        var stopY = y + size;
        for(y; y < stopY; y++){
            tmp = ((dataImage.width * y) + x) * 4;
            
            dataImage.data[tmp] = color; // r
            dataImage.data[tmp + 1] = color; // g
            dataImage.data[tmp + 2] = color; // b
            dataImage.data[tmp + 3] = 255; // alpha - always set to full opacity.
        }
    }
}

// Full Cellular Automata functionality
function nextGen(ctx, idata) {
    // iterate through array
    for(var x = 1; x < (c.width / size)-1; x++){
        for(var y = 1; y < (c.height / size)-1; y++){
            
            var neighbors = 0;
            // Test neighbors for each cell
            for(var i = -1; i <= 1; i++){
                for(var j =-1; j <=1; j++){
                    neighbors +=  board[x + i][y + j];
                }
            }

            neighbors -= board[x][y];

            // set new value according to rules
            if((board[x][y] === 1) && (neighbors <  2)){ 
                next[x][y] = 0;
            } else if((board[x][y] === 1) && (neighbors >  3)){
                next[x][y] = 0;
            } else if((board[x][y] === 0) && (neighbors === 3)){
                next[x][y] = 1;
            } else{
                var temp = board[x][y];
                next[x][y] = temp;
            }
        }
    }
    // assing next array to board array and put to canvas
    for(var i = 1; i < (c.width / size)-1; i++){
        board[i] = next[i].slice(0);
    }
    colorDataImage(board, ctx, idata);
}

window.onload = function(){
    init();

    // Animation Frame
    setTimeout(function(){
        (function loop() {
        nextGen(ctx, idata);
        requestAnimationFrame(loop)
        })()
    }, 1000);
}
/*** Test modules ***/

// Long loop --- slow deploy

// setTimeout(function(){
//     for(var i = 0; i < 1000; i++){
//         setTimeout(function(){
//             nextGen(ctx, idata)
//         }, 1000*i);
//     }
// }, 3000);

// Iterate by click

// $(document).ready(function(){
//     $('#myCanvas').click(function(){
//         nextGen(ctx, idata);
//     });
// })