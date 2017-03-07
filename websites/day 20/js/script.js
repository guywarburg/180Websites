var counter = 1;

$(document).ready(function(){
	$('body').click(function(e){
		generateBox(e.pageX, e.pageY);
		//$('.square'+(counter-1)).addClass('drop');
	});
});

var generateBox = function(x, y) {
	// Set location
	var size = Math.floor(Math.random() * 50);
	var topLoc = y - (size/2);
	var leftLoc = x - (size/2);

	var color = '#' + Math.random().toString(16).slice(2, 8);

	var elmnt = $("<div></div>").addClass('drop square square'+counter).css({"background-color": color, "height": size, "width": size, 
			"top": topLoc, "left": leftLoc});
	$('body').append(elmnt);
	counter++;
}