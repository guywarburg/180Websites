// variables
const H = 302,
    W = 424;

const canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');

const etch = document.querySelector('.container');

var xLoc = W / 2, // Initial position = center of canvas
    yLoc = H / 2;

document.addEventListener('keydown', function(e){
    e.preventDefault;
    var direction;
    switch (e.which){
        case 37: // left
        if(e.which === 38){
            console.log('hey');
        }
        direction = 'left';
        break;

        case 38: // up
        direction = 'up';
        break;

        case 39: // right
        direction = 'right';
        break;

        case 40: // down
        direction = 'down';
        break;

        default: return; // exit this handler for other keys
    }
    draw(direction);
});

etch.addEventListener('dragleave', function(e){
    this.classList.add('hide');
    clearCanvas();
});

etch.addEventListener('dragend', function(e){
    this.classList.remove('hide');
    
});

canvas.addEventListener('click', function(){
    clearCanvas()
});

var draw = function(direction){
    console.log(direction);
    ctx.beginPath();
    ctx.moveTo(xLoc, yLoc);

    switch (direction){
        case 'left':
        xLoc -= 5;
        break;

        case 'up':
        yLoc -= 5;
        break;

        case 'right':
        xLoc += 5;
        break;

        case 'down': 
        yLoc += 5;
        break;

        default: return; 
    }
    ctx.lineTo(xLoc, yLoc);
    ctx.stroke();
}

var clearCanvas = function(){
    xLoc = W / 2;
    yLoc = H / 2;
    ctx.clearRect(0, 0, W, H);
}

var moveCanvas = function(posX, posY){
    console.log(posX);
    console.log(posY);
}