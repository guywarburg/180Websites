// Variables
const footerHeight = 30;
const canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');
var h, w;
const canonOffset = 50;
const Bullets = [];
const bugs = [];
var myInterval;
var level = 1;

////////////
// Levels //
////////////

const dataJSON = {
    1: {
        bugs: 3,
        bullets: 10
    },
    2: {
        bugs: 5,
        bullets: 10
    },
    3: {
        bugs: 7,
        bullets: 10
    }
}

////////////
// Objects//
////////////

// Canon object
function Canon(h){
    const locX = 50;
    const locY = h - 50;
    const radius = 20;
    var angle = 45;
    var speed = 50;
    const speedView = document.getElementById('pLevel');

    return {
        draw: function(){
            ctx.fillStyle = "#067988";
            ctx.setTransform(1, 0, 0, 1, locX, locY);
            ctx.rotate((- angle) * (Math.PI / 180))
            ctx.fillRect(0, 0 - radius, 75, (2 * radius));
            ctx.fillStyle = "#0898ab";
            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.setTransform(1, 0, 0, 1, 0, 0);
        },
        moveUp: function(){
            angle += 5;
        },
        moveDown: function(){
            angle -= 5;
        },
        increaseSpeed: function(){
            speed += 1;
            speedView.innerHTML = speed;
        },
        decreaseSpeed: function(){
            speed -= 1;
            speedView.innerHTML = speed;
        },
        getAngle: function(){
            return angle;
        },
        getSpeed: function(){
            return speed;
        }
    };
}

// Bullet object
function Bullet(h, angle, speed){
    var locX = canonOffset;
    var locY = h - canonOffset;
    var dx = speed * Math.cos(angle * (Math.PI / 180));
    var dy = - (speed * Math.sin(angle * (Math.PI / 180)));
    const radius = 8;
    const color = "#000";
    var visible = true;

    return {
        draw: function(){
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(locX, locY, radius, 0, Math.PI * 2, false);
            ctx.fill();
        },
        move: function(){
            locX += dx;
            locY += dy;
            dy += 3;

            if(locX > w || locY > h) {
                this.removeVisibility();
            }
        },
        getXLoc: function(){
            return locX;
        },
        getYLoc: function(){
            return locY;
        },
        isVisible: function(){
            return visible;
        },
        removeVisibility: function(){
            visible = false;
        }
    }
}

// Bug object
function Bug(maxX, maxY) {
    /**
     * set bugs to sit in grid.
     */
    const locX = (Math.random() * (maxX - canonOffset)) + canonOffset;
    const locY = Math.random() * (maxY - canonOffset);
    var visible = true;
    const bug = document.getElementById('bug');

    return {
        isVisible: function() {
            return visible;
        },
        removeVisibility: function(){
            visible = false;
        },
        draw: function(){
            ctx.drawImage(bug, locX, locY, 80, 50);
        },
        getXLoc: function(){
            return locX;
        },
        getYLoc: function(){
            return locY;
        }
    }
}

// Basic State implementation
function State(x, y) {
    const board = [];
    const cellHeight = 50;
    const cellWidth = 80;
    // initialize empty board
    // set 1st dimention of array to y axis
    for(var i = 0; i < y / cellHeight; i++){
        board[i] = [];
        for (var j = 0; j < x / cellWidth; j++){
            // fill the board with no bugs
            board[i][j] = {bug: false, id: -1};
        }
    }
    // Convert x,y location to board grid
    function fitToGrid(x, y) {
        var gridX = Math.floor(x / cellWidth);
        var gridY = Math.floor(y / cellHeight);
        
        return {x: gridX, y: gridY};
    }
    

    return {
        addBug: function(LocX, LocY, id){
            var location = fitToGrid(LocX, LocY);
            console.log('Added bug to x: ' + location.x + ' and y: ' + location.y);
            board[location.y][location.x] = {bug: true, id: id};
            // console.log('Added bug to x: ' + location.x + ' and y: ' + location.y);
        },
        testForBug: function(LocX, LocY){
            var location = fitToGrid(LocX, LocY);
            if(location.y >= board.length || location.x >= board[location.y].length){
                return false;
            }
            console.log('Is a bug in x: ' + location.x + ' and y: ' + location.y + '?');
            console.log(board[location.y][location.x].bug);
            return board[location.y][location.x].bug;
        },
        getBugId: function(LocX, LocY){
            var location = fitToGrid(LocX, LocY);

            return board[location.y][location.x].id;
        }
    }
}

///////////////
// Functions //
///////////////

// Set multiple attributes
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
        console.log('setting key: ' + key + ', value: ' + attrs[key]);
    }
}

// Level up
function levelUp(){
    alert('Congratulations, You\'ve won the round!');
}

// game over
function gameOver(){
    clearInterval(myInterval);
    alert('Sorry, you lose');
}

// Update ui with bullet count
function removeBullet(){
    var remainingBullets = document.getElementById('remaining-bullets');
    bulletCount = parseInt(remainingBullets.innerHTML);
    if(bulletCount === 0){
        gameOver();
        return;
    }
    remainingBullets.innerHTML = --bulletCount;
}

// set up screen
function init(){

}

///////////////
// On Load ////
///////////////

window.onload = function() {
    // set canvas
    var h = window.innerHeight - footerHeight;
    var w = window.innerWidth;
    setAttributes(canvas, {"height": h, "width": w});
    var totalBugs = 3; 


    var canon = new Canon(h);
    var gameState = new State(w, h);
    
    for(var j = 0; j < totalBugs; j++){
            bugs.push(new Bug(w, h));
            gameState.addBug(bugs[j].getXLoc(), bugs[j].getYLoc(), j);
    }
    myInterval = window.setInterval(function(){
        ctx.clearRect(0, 0, w, h);
        var counter = 0; // test how many bugs remaining
        for(var j = 0; j < bugs.length; j++){
            if(bugs[j].isVisible()){
                bugs[j].draw();
                counter++;
            }
        }
        if(counter === 0) {
            clearInterval(myInterval);
            levelUp();
        }
        for(var i = 0; i < Bullets.length; i++){
            if(Bullets[i].isVisible()){
                Bullets[i].move();
                if (gameState.testForBug(Bullets[i].getXLoc(), Bullets[i].getYLoc())){
                    bugs[gameState.getBugId(Bullets[i].getXLoc(), Bullets[i].getYLoc())].removeVisibility();
                }
                Bullets[i].draw();
            }
        }
        canon.draw();
    }, 50);

    btnStart = document.getElementById('start');

    btnStart.addEventListener('click', function(){
        initGame();
    });
    window.addEventListener('keydown', function(e){
        switch(e.which){
            case 38:
                canon.moveUp();
                canon.draw();
                break;
            case 40:
                canon.moveDown();
                canon.draw();
                break;
            case 39:
                canon.increaseSpeed();
                break;
            case 37:
                canon.decreaseSpeed();
                break;
            case 32:
                Bullets.push(new Bullet(h, canon.getAngle(), canon.getSpeed()));
                removeBullet();
                break;
            default:
                break;
        }
    });
};