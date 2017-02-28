var c = document.getElementById('myCanvas');
var ctx = c.getContext("2d");       // context without alpha channel.
var idata = ctx.createImageData(c.width, c.height); // create image data

var board = [];
var next = []
for(var i = 0; i < c.width; i++){
    board[i] = [];
    next[i] = [];
}

function init(){
    for(var i = 0; i < c.width; i++){
        for(var j = 0; j < c.height; j++){
            board[i][j] = Math.random() < 0.5 ? 0 : 1;
            colorPixel(i, j, idata, board);
        }
    }
    ctx.putImageData(idata, 0, 0);
}

function colorDataImage(arr, ctx, idata){
    for(var i = 0; i < arr.length; i++){
        for(var j = 0; j < arr[i].length; j++){
            colorPixel(i, j, idata, arr);
        }
    }
    ctx.putImageData(idata, 0, 0);
}


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

function nextGen(ctx, idata) {
    for(var x = 1; x < c.width-1; x++){
        for(var y = 1; y < c.height-1; y++){
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


// function randomColor(){
//     return Math.floor(Math.random() * 256);
// }


// function initCanvas(){
//     for(var i = 0; i < idata.data.length; i += 4){
//         var color = Math.random() < 0.5 ? 0 : 255;
//         idata.data[i] = color;
//         idata.data[i+1] = color; 
//         idata.data[i+2] = color;
//         idata.data[i+3] = 255;
//     }
//     ctx.putImageData(idata, 0, 0);
// }

// window.onload = function(){
//     initCanvas();
//     // colorCanvas();
// }




// const size = 10
// function colorCanvas(){
//     // var newDataImage = ctx.createImageData(c.width, c.height);
//     for(var pixelX = 0; pixelX < c.width/size; pixelX += size){
//         for(var pixelY = 0; pixelY < c.height/size; pixelY += size){
//             setPixelColor(pixelX, pixelY);
//         }
//     }
//     ctx.putImageData(idata, 0, 0);
// }

// function setPixelColor(x, y){
//     var r = randomColor();
//     var g = randomColor();
//     var b = randomColor();
//     for(var i = x; i < x + (size * 4); i += 4){
//         for(var j = y; i < y + (size * 4); j += 4){
//         // var color = Math.floor(Math.random() * 256); // < 0.5 ? 0 : 255;
//         // console.log(color);
//         idata.data[i + j] = r;
//         idata.data[i + j + 1] = g; 
//         idata.data[i + j + 2] = b;
//         idata.data[i + j + 3] = 255;
//         }
//     }
// }