var hour = "00";
var minute = "00";
var second = "00";

var red = "00";
var green = "00";
var blue = "00";
var bgColor = "#" + red + green + blue;

function formatNum(i) { 
	if (i.length < 2) {
		i = "0" + i;
	}
	return i;
}

function setTime(){
	var time = new Date();

	hour = time.getHours().toString();
	hour = formatNum(hour);

	minute = time.getMinutes().toString();
	minute = formatNum(minute);

	second = time.getSeconds().toString();
	second = formatNum(second);

	document.getElementById("hour").innerHTML = hour;
	document.getElementById("minute").innerHTML = minute;
	document.getElementById("second").innerHTML = second;
}

function timeColor(hour, min, sec) {
	red = Math.round(255 * (hour / 23)).toString(16);
	green = Math.round(255 * (min / 59)).toString(16);
	blue = Math.round(255 * (sec / 59)).toString(16);

	red = formatNum(red);
	green = formatNum(green);
	blue = formatNum(blue);

	return (red + green + blue).toUpperCase();
}

function setColor(){
	bgColor = '#' + timeColor(hour, minute, second);
	document.getElementById('body').style.backgroundColor = bgColor;

	document.getElementById('red').innerHTML = red.toUpperCase();
	document.getElementById('green').innerHTML = green.toUpperCase();
	document.getElementById('blue').innerHTML = blue.toUpperCase();
}

setInterval(function(){
	setTime();
	setColor();
}, 1000);

setTime();
setColor();
