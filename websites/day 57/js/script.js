// Variables
const footerHeight = 30;
const canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');
var h, w;
const canonOffset = 50;
const Bullets = [];
const bugs = [];

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
        }
    }
}

// Bug object
function Bug(maxX, maxY) {
    const locX = (Math.random() * (maxX - canonOffset)) + canonOffset;
    const locY = Math.random() * (maxY - canonOffset);
    var visible = true;
    const bug = document.getElementById('bug');

    return {
        isVisible: function() {
            return visible;
        },
        draw: function(){
            ctx.drawImage(bug, locX, locY, 80, 50);
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

///////////////
// On Load ////
///////////////

window.onload = function(){
    // set canvas
    var h = window.innerHeight - footerHeight;
    var w = window.innerWidth;
    setAttributes(canvas, {"height": h, "width": w}); 

    canon = new Canon(h);
    // canon.draw();
    for(var j = 0; j < 3; j++){
            bugs.push(new Bug(w, h));
    }
    window.setInterval(function(){
        ctx.clearRect(0, 0, w, h);
        for(var j = 0; j < bugs.length; j++){
            bugs[j].draw();
        }
        if (Bullets.length > 0){
            for(var i = 0; i < Bullets.length; i++){
                Bullets[i].move();
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
                break;
            default:
                break;
        }
    });
}