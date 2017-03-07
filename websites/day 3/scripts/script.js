document.getElementById('btn1').onclick = function(){
	document.getElementById('hello').style.color = randomColor();
};

function randomColor() {
	return '#' + Math.random().toString(16).slice(2, 8);
};