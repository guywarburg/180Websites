// Canvas variables
var c = document.getElementById('myCanvas');
var ctx = c.getContext("2d");       // context without alpha channel.
var idata = ctx.createImageData(c.width, c.height); // create image data
var size = 10;

// Canvas Array representation
var board = [];
var next = []
for(var i = 0; i < c.width / size; i++){
    board[i] = [];
    next[i] = [];
}

// Init random screen
function init(){
    for(var i = 0; i < c.width / size; i++){
        for(var j = 0; j < c.height / size; j++){
            board[i][j] = Math.random() < 0.5 ? 0 : 1;
            // colorPixel(i, j, idata, board);
            newColorPixel(i, j, idata, board, size);
        }
    }
    ctx.putImageData(idata, 0, 0);
}

// color and place imagedata according to array representation.
function colorDataImage(arr, ctx, idata){
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[i].length; j++){
            // colorPixel(i, j, idata, arr);
            newColorPixel(i, j, idata, arr, size);
        }
    }
    ctx.putImageData(idata, 0, 0);
}

// Paint a pixel black or white according to representation
function colorPixel(i, j, dataImage, arr) {
        tmp = ((dataImage.width * j) + i) * 4;
        var color;
        if(arr[i][j] === 1){
            color = 0;
        } else {
            color = 255;
        }
        dataImage.data[tmp] = color;
        dataImage.data[tmp + 1] = color;
        dataImage.data[tmp + 2] = color;
        dataImage.data[tmp + 3] = 255;
}

// Full Cellular Automata functionality
function nextGen(ctx, idata) {
    for(var x = 1; x < (c.width / size)-1; x++){
        for(var y = 1; y < (c.height / size)-1; y++){
            
            var neighbors = 0;

            for(var i = -1; i <= 1; i++){
                for(var j =-1; j <=1; j++){
                    neighbors +=  board[x + i][y + j];
                }
            }

            neighbors -= board[x][y];

            if((board[x][y] === 1) && (neighbors <  2)){ 
                next[x][y] = 0;
            } else if((board[x][y] === 1) && (neighbors >  3)){
                next[x][y] = 0;
            } else if((board[x][y] === 0) && (neighbors === 3)){
                next[x][y] = 1;
            } else{
                next[x][y] = board[x][y];
            }
        }
    }
    board = next;
    colorDataImage(board, ctx, idata);
}

init();

// Animation Frame --- fast deploy

// setTimeout(function(){
//     (function loop() {
//     nextGen(ctx, idata);
//     requestAnimationFrame(loop)
//     })()
// }, 1000);

// Long loop --- slow deploy

setTimeout(function(){
    for(var i = 0; i < 1000; i++){
        setTimeout(function(){
            nextGen(ctx, idata)
            console.log('round: ' + i);
        }, 1000*i);
    }
}, 1000);


// Paint a pixel black or white according to representation
function newColorPixel(i, j, dataImage, arr, size) {
    var color;
    if(arr[i][j] === 1){
        color = 0;
    } else {
        color = 255;
    }
    var x = i * size;
    var stopX = x + size;

    for(x; x < stopX; x++){
        var y = j * size;
        var stopY = y + size;
        for(y; y < stopY; y++){
            tmp = ((dataImage.width * y) + x) * 4;
            
            dataImage.data[tmp] = color;
            dataImage.data[tmp + 1] = color;
            dataImage.data[tmp + 2] = color;
            dataImage.data[tmp + 3] = 255;
        }
    }
}