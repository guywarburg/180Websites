const Bullets = [];
const Invaders = [];
const canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d");
const MAX_SPEED = 4;

/////////////////
// Objects //////
/////////////////

// Player Object
function Player(x, y) {
    var size = 30;    
    var xLoc = x / 2;
    var yLoc = y - size;
    

    return {
        moveLeft: function(){
            xLoc -= 15;
        },
        moveRight: function(){
            xLoc += 15;
        },
        draw: function(){
            ctx.fillStyle = "#000";
            ctx.fillRect(xLoc, yLoc, size, size);
        },
        getXLoc: function(){
            return (xLoc + (size/2));
        }
    };
}

// Invader Object
function Invader(color, x){
    var color = color, 
        radius = 20,
        xLoc = Math.floor(Math.random() * (x - radius)) + radius, 
        yLoc = 0 - radius, 
        dy = Math.floor(Math.random() * MAX_SPEED) + 1, 
        visible = true;

    return {
        move: function(){
            yLoc += dy;
        },
        isVisible: function(){
            return visible;
        }, 
        draw: function(){
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(xLoc, yLoc, radius, 0, Math.PI * 2);
            ctx.fill();
        }, 
        getLocation: function(){
            return [xLoc, yLoc];
        },
        removeVisibility: function(){
            visible = false;
        }
    };
}

function Bullet(x, y){
    var xLoc = x;
    var yLoc = y;
    var dy = 15;
    var visible = true;

    return {
        move: function(){
            yLoc -= dy;
        },
        isVisible: function(){
            return visible;
        },
        draw: function(){
            ctx.fillStyle = "#ffa500";
            ctx.fillRect(xLoc, yLoc, 5, 20);
        },
        getLocation: function(){
            return [xLoc, yLoc];
        },
        removeVisibility: function(){
            visible = false;
        }
    };
}

/////////////////
// Functions ////
/////////////////

// Set multiple attributes
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
        console.log('setting key: ' + key + ', value: ' + attrs[key]);
    }
}

// Create invaders and add to array
// num is number of required invaders
// maxXLoc is maximum x location for invader placement
function createInvaders(num, maxXLoc){
    for(var i = 0; i < num; i++){
        var color = 'rgb(' + Math.floor(Math.random() * 255) + ', ' +
                       Math.floor(Math.random() * 255) + ',' + Math.floor(Math.random() * 255) + ')';
        Invaders.push(new Invader(color, maxXLoc));
    }
}

// Tests if an invader is present
// if no invaders return true
// if there is an invader removeVisibility of invader and return false
function testForInvaders(bullet){
    var bulletX = bullet.getLocation()[0],
        bulletY = bullet.getLocation()[1];

    for(var i = 0; i < Invaders.length; i++){
        var invaderX = Invaders[i].getLocation()[0],
            invaderY = Invaders[i].getLocation()[1];
        
        if(Invaders[i].isVisible()){
            // if bullet is in the invaders radius...
            if(bulletX >= (invaderX - 15) && bulletX <= (invaderX + 15) &&
            bulletY >= (invaderY - 15) && bulletY <= (invaderY + 15)){
                Invaders[i].removeVisibility();
                return false;
            }
        }
    }
    return true;
}

// initialize game
function init(){
    // Set canvas size
    var h = window.innerHeight - 50; // '-50' is to make slightly smaller than view.
    var w = window.innerWidth - 50;
    setAttributes(canvas, {"height": h, "width": w}); 

    var myPlayer = new Player(w, h);
    
    myPlayer.draw();
    
    createInvaders(30, w);
    for(var i = 0; i < Invaders.length; i++){
        Invaders[i].draw();
    }
    
    document.addEventListener('keydown', function(e){
        // e.preventDefault();
        switch(e.which){
            case 37: // left
                myPlayer.moveLeft();
                console.log('moved L');
                break;
            case 39: // right
                myPlayer.moveRight();
                console.log('moved R');
                break;
            case 32: // space bar == 'shoot'
                Bullets.push(new Bullet(myPlayer.getXLoc(), h - 20));
                console.log(e.which);
                break;
            default:
                console.log(e.which);
                break;
        }
    });
    loop(w, h, myPlayer);
}

init();

// temp loop
function loop(w, h, myPlayer){
    window.setInterval(function(){
        ctx.clearRect(0, 0, w, h);
        myPlayer.draw();
        for(var i = 0; i < Invaders.length; i++){
            if(Invaders[i].isVisible()){
                Invaders[i].move();
            }
        }
        for(var j = 0; j < Bullets.length; j++){
            if(Bullets[j].isVisible()){
                Bullets[j].move();
                if(testForInvaders(Bullets[j])){
                    Bullets[j].draw();
                } else {
                    Bullets[j].removeVisibility();
                    createInvaders(1, w);
                }
            }
        }
        for(var l = 0; l < Invaders.length; l++){
            if(Invaders[l].isVisible()){
                Invaders[l].draw();
            }
        }
    }, 100);
}