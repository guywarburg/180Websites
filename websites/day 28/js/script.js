$(document).ready(function(){
	$('.start').click(function(){
		$('.intro').hide();
		$('.container').show();
		gameStart();
	});
	var clicks = 0
	var gameStart = function(){
		$('.overlayR').addClass('spin');
		setTimeout(function(){
			$('.circleRotate').css("z-index", "103").addClass('spin');
			$('.overlayR').hide();
			setTimeout(function(){
				$('.circleRotate').css('transform', 'rotate(180deg) translateX(113px)');
			}, 15000);
		}, 15000);
		$('.numbers').attr('unselectable', 'on').css('user-select', 'none');
		setTimeout(function(){
			$('.container').hide();
			calculateResults();
			$('.results').show();
		}, 30000);
		$('.clicker').click(function(){
			clicks++;
			console.log('clicks: '+ clicks);
			$('.numbers').text(clicks);
		});
	}

	var calculateResults = function(){
		$('.totalScore').text('You clicked ' + clicks + ' times!');
		$('.clicksPerSec').text('That\'s ' + (clicks/30) + ' clicks per second!');
	}
});