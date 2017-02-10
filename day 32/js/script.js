$(document).ready(function(){
	//Variables
	var numOfCircles = 1000;
	var width = 40;
	var height = 25;
	// Functions
	var generateCircles = function(){
		for(var i = 0; i < height; i++) {
			for(var j = 0; j < width; j++) {
				
				var left = 8 + (j * 18);
				var top = 8 + (i * 18);
				var id = j + (i * 40);

				$('<div/>',{
	    		'id'    : id,
	    		'class' : 'circle',
	    		'style' : 'top:' + top + 'px;left:'+left+'px;'
				}).appendTo('.container');
			}
		}
	};

	var pounceCirlces = function(elementID, speed) {
		elementID = Number(elementID); // Cast to int
		//
		if($('#'+elementID).hasClass('pounce')) {
			return;
		}
		console.log('pouncer called with: ' + elementID);
		$('#'+elementID).addClass('pounce');
		setTimeout(function(){
			$('#'+elementID).removeClass('pounce');
		}, 1000);
		var below = elementID + 40;
		var above = elementID - 40;
		var right = elementID + 1;
		var left = elementID - 1;
		//console.log('above: ' + above + ', below: ' + below + ', right: ' + right + ', left: ' + left);

		// Test for edges of screen
		if (below > 1000) {
			below -= 1000;
			return;
		}
		if (above < 0) {
			above += 1000;
			return;
		}
		if (right > 1000) {
			return;
		}
		if (left < 0) {
			return;
		}
		
		// Recursive calls
		setTimeout(function(){
			pounceCirlces(right, (speed * 1.1));
			pounceCirlces(left, (speed * 1.1));
			pounceCirlces(above, (speed * 1.1));
			pounceCirlces(below, (speed * 1.1));
			//TEST - create circle affect
			// pounceCirlces(elementID - 1 - 40, (speed * 1.2));
			// pounceCirlces(elementID + 1 - 40, (speed * 1.2));
			// pounceCirlces(elementID - 1 + 40, (speed * 1.2));
			// pounceCirlces(elementID +1 + 40, (speed * 1.2));
		}, speed);
	}

	// Calls
	$('.container').hide();
	generateCircles();
	$('.container').show();
	$('.circle').click(function(){
		pounceCirlces($(this).attr('id'), 100);
	});
});