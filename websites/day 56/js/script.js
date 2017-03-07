// Variables
const MAX_RADIUS = 15;
const MAX_Z = 10;
const MAX_SPEED = 7;
const MAX_CONFETTI = 500;
const canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext("2d");
var allConfetti = [];

function Confetti(maxX, maxY) {
    var radius = Math.floor(Math.random() * MAX_RADIUS) + 1;
    var maxY = maxY - radius;
    var x = Math.random() * (maxX - (2 * MAX_RADIUS)) + MAX_RADIUS;
    var y = Math.random() * 500 - 500;
    var z = Math.floor(Math.random() * MAX_Z);
    var speed = Math.random() * MAX_SPEED + MAX_SPEED;
    var color = 'rgb(' + Math.floor(Math.random() * 255) + ', ' + Math.floor(Math.random() * 255)
        + ', ' + Math.floor(Math.random() * 255) + ')';
    
    return {
        move: function(){
            y += speed;
            if(y > maxY){
                y = maxY;
            }
        },
        draw: function (){
            ctx.fillStyle = color;
            ctx.beginPath()
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.fill();
        }
    };
}

// Set multiple attributes
function setAttributes(el, attrs) {
    for(var key in attrs) {
        el.setAttribute(key, attrs[key]);
        console.log('setting key: ' + key + ', value: ' + attrs[key]);
    }
}

// Create multiple confettis and add to array
function createConfetti(numOfConfetti, h, w){
    for(var i = 0; i < numOfConfetti; i++){
        allConfetti.push(new Confetti(w, h));
    }
}

window.onload = function(){
    // set canvas
    var h = window.innerHeight;
    var w = window.innerWidth;
    setAttributes(canvas, {"height": h, "width": w}); 

    btn = document.getElementById('btn');

    btn.addEventListener('click', function(){
        createConfetti(MAX_CONFETTI, h, w);
        setInterval(function(){
            ctx.clearRect(0, 0, w, h);
            for(var i = 0; i < allConfetti.length; i++){
                allConfetti[i].move();
                allConfetti[i].draw();
            }
        }, 30);
    });
}