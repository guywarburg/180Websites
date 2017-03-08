// Variables
const footerHeight = 30;
const canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext('2d');
var h, w;

////////////
// Objects//
////////////

function Canon(h){
    const locX = 10;
    const locY = h - 10;
    var angle = 45;
    var speed = 50;    

    return {
        draw: function(){
            ctx.fillStyle = "#0898ab";
            ctx.beginPath();
            console.log('drawing circle at: ');
            console.log('(' + locX + ', ' + locY + ')');
            ctx.arc(locX, locY, 15, 0, Math.PI * 2, false);
            ctx.fill();
        }
    };
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
    canon.draw();

    btnStart = document.getElementById('start');

    btnStart.addEventListener('click', function(){
        initGame();
    });
}