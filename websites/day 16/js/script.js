var numberOfCircles = 20;

$(document).ready(function(){
	for (var i = 0; i < numberOfCircles; i++) {
		var color = randColor();
		var size = Math.floor(Math.random() * 100);
		var speed = Math.floor(Math.random() * 8) + "s";
		var speedStr = "left " + speed + ", top " + speed;
		var circleClass = "circle spot" + i;
		var elmnt = $("<div></div>").addClass(circleClass).css({"background-color": color, "height": size, "width": size, 
			"transition": speedStr});
		$('body').append(elmnt);
	};
});

$(document).mousemove(function(event){
	for (var i = 0; i < numberOfCircles; i++) {
		$('.circle').css({"left": event.pageX, "top": event.pageY,})
	}
});

function randColor() {
	return '#' + Math.random().toString(16).slice(2, 8);
}