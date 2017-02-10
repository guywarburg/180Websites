var zCount = 110;
$(document).ready(function(){
	$('.moveable').on({
  		mousedown: function(e) {
  			var location = $(this).offset();
			var diffY = e.pageY - location.top;
			var diffX = e.pageX - location.left;
			$(this).addClass("moving");
			$(this).css("z-index", zCount);
			$('.moving').mousemove(function(eMove){
				$(this).css({top: (eMove.pageY - diffY), left: (eMove.pageX - diffX)});	
			});
  		},
  		click: function() {
  			zCount++;
  			$(this).removeClass("moving");
    		$(this).unbind('mousemove');
  		}
	});
});

var generateShapes = function(){
	var shape = ["leftTri", "circle", "square", "recStand", "recDown", "squarCle"];

	for (var i = 0; i < shape.length; i++) {
		generateShape(shape[i])
	};
}

var generateShape = function(shape) {
	var num = ["one", "two", "three", "four", "five", "six", "seven", "eight"];
	for (var i = 0; i < 8; i++) {
		// leftTri
		var tmpClass = "moveable " + shape + " " + num[i];
		var tmpShape = $("<div></div>").addClass(tmpClass);
		$('#end').before(tmpShape);
	};
}

generateShapes();