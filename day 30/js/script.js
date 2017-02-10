$(document).ready(function(){
	setInterval(function(){
		$('.rightPupil').addClass('blink');
		setTimeout(function(){
			$('.rightPupil').removeClass('blink');
		}, 1500);
	}, 10000);
	
})