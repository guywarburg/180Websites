// Variables

const canvas = document.getElementById("myCanvas"),
    ctx = canvas.getContext("2d");
var h, w; // hold screen height and width
var myLoop;
const Paratroopers = [];
var round = 0;

/////////////////
// Objects  /////
/////////////////

// Plane
function Plane(xLoc){
    var xLoc = xLoc;
    var yLoc = 100;
    var speed = 10;
    var plane = document.getElementById('plane');
    
    return {
        move: function(){
            if( xLoc <= w) {
                xLoc += speed;
            } else {
                xLoc = -190;
            }
            
        },
        setSpeed: function(newSpeed){
            speed = newSpeed;
        },
        getSpeed: function(){
            return speed;
        },
        getLocation: function(){
            return xLoc;
        },
        draw: function(){
            ctx.drawImage(plane, xLoc, yLoc);
        }
    };
}

// Island
function Island(xLoc){
    var width = 200;
    var height = 40;
    var xLoc = xLoc;
    var yLoc = h;
    var treeXLoc = 100;
    var treeHeight = 130;
    var tree = document.getElementById('tree');
    
    return {
        getLocation: function(){
            return {x: xLoc, width: width, height: height};
        },
        draw: function(){
            ctx.fillStyle = '#e88d15';
            ctx.beginPath();
            ctx.moveTo(xLoc, yLoc);
            ctx.quadraticCurveTo(xLoc + (width / 2), (yLoc - height), xLoc + width, yLoc);
            ctx.lineTo(xLoc + width, yLoc);
            // ctx.lineTo(20, 90);
            ctx.fill();
            ctx.drawImage(tree, xLoc + treeXLoc, yLoc - treeHeight);
        }
    };
}

// Paratrooper
function Paratrooper(xLoc, xSpeed){
    var xLoc = xLoc;
    var yLoc = 100;
    var dy = 10;
    var dx = xSpeed * 2;
    var troop = document.getElementById('troop');
    var visible = true;
    
    return {
        move: function(){
            xLoc += dx;
            yLoc += dy;
            dy *= 1.1;
            dx *= 0.9;
            if(yLoc > h){
                visible = false;
            }
        },
        getLocation: function(){
            return {x: xLoc, y: yLoc};
        },
        draw: function(){
            ctx.drawImage(troop, xLoc, yLoc, 80, 80); // set image height to 80px
        },
        isVisible: function(){
            return visible;
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

// Test if Paratrooper landed on island
// tested only after y location has been verified
function paratrooperLanded(troop, island) {
    if(troop.x >= island.x && troop.x <= (island.x + island.width)) {
        return true;
    }
    return false;
}

// Update score on screen
function updateScore() {
    let score = document.getElementById('score');
    score.innerHTML = (parseInt(score.innerHTML) + 1);
}

function updateLives() {
    let lives = document.getElementById('lives');
    lives.innerHTML = (parseInt(lives.innerHTML) - 1);
    if(parseInt(lives.innerHTML) === 0){
        gameOver();
    }
}

function gameOver() {
    let modalElements = document.getElementById('modal').childNodes;
    
    ctx.clearRect(0, 0, w, h);
    clearInterval(myLoop);

    // edit header
    modalElements[0].innerHTML = "Game Over";
    // edit next line
    modalElements[1].innerHTML = "All of your paratroopers have died";
    // hide second line
    modalElements[2].innerHTML = "Your final score was: " + document.getElementById('score').innerHTML;
    // edit button
    modalElements[3].innerHTML = "Try Again";
    // show modal
    document.getElementById('modal').style.display = 'block';

    resetGame();
}

function resetGame(){
    document.getElementById('score').innerHTML = '0';
    document.getElementById('lives').innerHTML = '3';
    document.removeEventListener('keydown');
      Paratroopers.length = 0;
}

// initialize game
function init(myPlane, myIsland){
    // Set canvas size
    setAttributes(canvas, {"height": h, "width": w}); 

    // Set event listeners
    document.addEventListener('keydown', function(e){
        // e.preventDefault();
        switch(e.which){
            case 32: // space bar == 'jump'
                Paratroopers.push(new Paratrooper(myPlane.getLocation(), myPlane.getSpeed()));
                break;
            default:
                break;
        }
    });   
    loop(myPlane, myIsland);
}

function loop(myPlane, myIsland){
    myLoop = window.setInterval(function(){
        ctx.clearRect(0, 0, w, h);
        myPlane.move();
        myPlane.draw();
        myIsland.draw();
        for(troop in Paratroopers){
            if(Paratroopers[troop].isVisible()){
                if(Paratroopers[troop].getLocation().y > h - myIsland.getLocation().height) {
                    if(paratrooperLanded(Paratroopers[troop].getLocation(), myIsland.getLocation())) {
                        console.log('Landed!');
                        updateScore();
                    } else {
                        console.log('life lost')
                        updateLives();
                    }
                    Paratroopers[troop].removeVisibility();
                } else {
                    Paratroopers[troop].move();
                    Paratroopers[troop].draw();
                }
            }
        }
    }, 80);
}

/////////////////
// On-Load //////
/////////////////

window.onload = function(){
    h = window.innerHeight - 40; // remove footer height
    w = window.innerWidth;

    var myPlane = new Plane(50);
    var myIsland = new Island(w / 2);
    myIsland.draw();
    document.getElementById('start').addEventListener('click', function(){
        document.getElementById('modal').style.display = 'none';
        init(myPlane, myIsland); 
    })     
}