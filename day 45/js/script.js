// Variables

const MAX_HUE = 360;
const MAX_LUM = 100;
const MAX_SAT = 100;

var click = 0;

// Functions

function randomColor() {
    var tHue, tLum, tSat; //temp hue sat and lum
    
    tHue = Math.floor(Math.random() * MAX_HUE);
    tLum = Math.floor(Math.random() * MAX_LUM);
    tSat = Math.floor(Math.random() * MAX_SAT);

    return [tHue, tSat, tLum];
}

function getHue(pos) {
    // Get max height
    var scrollHeight;
    scrollHeight = document.body.offsetHeight - window.innerHeight;

    var h = Math.floor((pos / scrollHeight) * MAX_HUE);

    return h;
}

function getColorProperty(el, pos, direction){
    var divLocation = el.getBoundingClientRect()
    var offset, totalSize;

    switch(direction) {
        case 'x':
            offset = divLocation.left;
            totalSize = divLocation.right;
            break;
        case 'y':
        default:
            offset = divLocation.top;
            totalSize = divLocation.bottom;
            pos -= window.scrollY;
            break;
    }

    return ((pos - offset) / (totalSize - offset) * MAX_SAT);
}

function generateHSL(h, s, l){
    var color = "";
    color = "hsl(" + h + "," + s + "%," + l + "%)";
    return color;
}

function victory(){
    var modal = document.getElementById('modal').children;

    modal[1].style.display = 'none'; // hide h2
    modal[2].innerHTML = "Congratulations! You\'ve got it!"; // change h3 text
    modal[3].innerHTML = "It took you just " + click + " tries!";

    for(var i = 4; i < modal.length; i++){
        console.log()
        modal[i].style.display = 'none';
    }

    toggleModal();
}

function updateText(base, h, s, l){
    document.getElementById('textcontainer').style.display = 'block';

    var header = document.getElementById('resultHeader');
    var hueDiff, satDiff, lumDiff;

    hueDiff = getDiff(base[0], h, MAX_HUE);
    satDiff = getDiff(base[1], s, MAX_SAT);
    lumDiff = getDiff(base[2], l, MAX_LUM);

    if(hueDiff == 0 && satDiff == 0 && lumDiff == 0){
        victory();
    } else if ((hueDiff > 1 && satDiff < 1 && lumDiff < 1) ||
            (hueDiff < 1 && satDiff > 1 && lumDiff < 1) ||
            (hueDiff < 1 && satDiff < 1 && lumDiff > 1)) {
        header.innerHTML = 'Getting very close!';
    } else {
        header.innerHTML = 'Nope, you\'re off by:';
    }
    
    document.getElementById('hue').innerHTML = hueDiff + '%';
    document.getElementById('sat').innerHTML = satDiff + '%';
    document.getElementById('lum').innerHTML = lumDiff + '%';
}

function getDiff(orig, user, max){
    var diff = orig - user;
    if(diff < 0){
        diff *= -1;
    }

    return (diff / max * 100).toFixed(2);
}

function toggleModal(){
    var modal = document.getElementById('modal');
    if(modal.style.display == 'block'){
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

// DOM

window.onload = function() {
    var hue = 0;
    var lum, sat;

    //Setup base color and add to DOM
    var baseColor = randomColor();
    document.getElementById('randColor').style.backgroundColor = generateHSL(baseColor[0], baseColor[1], baseColor[2]);

    //Assign eventListeners
    var userDiv = document.getElementById('userColor');

    userDiv.addEventListener('mousemove', function(e){
        sat = getColorProperty(userDiv, e.pageX, 'x');
        lum = getColorProperty(userDiv, e.pageY, 'y');

        userDiv.style.backgroundColor = generateHSL(hue, sat, lum);
    });
    window.addEventListener('scroll', function(e){
        hue = getHue(window.scrollY);

        userDiv.style.backgroundColor = generateHSL(hue, sat, lum);
    });
    userDiv.addEventListener('click', function(e){
        click++;
        updateText(baseColor, hue, sat, lum);
    });

    // Open help view
    document.getElementById('help').addEventListener('click', function(){
        toggleModal();
    });
    document.getElementById('modal').addEventListener('click', function(){
        toggleModal();
    });
}