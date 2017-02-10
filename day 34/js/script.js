$(document).ready(function(){
	var flip = false;

	$('.body, .head').click(function(){
		var image = "";
		if(flip){
			image = "images/groot_body.jpg";
		} else {
			image = "images/groot_body2.jpg";
		}
		$('.body').attr('src', image);
		flip = !flip;
	})
});