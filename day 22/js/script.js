$(document).ready(function(){
	var level = 1;
	var fMessages = [
		"Too bad",
		":(",
		"Better luck next time",
		"Mua Mua Mua",
		"Close one",
		"I bet you could do better than that"
	];

	var sMessages = [
		"Way to go!",
		"Impressive",
		"That was quick",
		"I bet you couldn't do the next level",
		"You Win!!!"
	]

	$('#start').click(function(){
		$('.message').hide()
		setupGame();
	});

	var setupGame = function() {
		$('.red').addClass('rLevel'+level).removeClass('rlevel' + (level-1));
		$('.path').addClass('pLevel'+level).removeClass('plevel' + (level-1));
		$('.blue').addClass('bLevel'+level).removeClass('blevel' + (level-1));
		$('.game').show();

		$('.red').mouseout(function(){
			if($('.path:hover').length != 0) {
				startGame();
			} else {
				youFailed();
			}
		});
	}

	var startGame = function() {
		$('.path').mouseout(function(){
			if($('.blue:hover').length != 0) {
				success();
			} else {
				youFailed();
			}
		});
	}

	var youFailed = function(){
		$('.red, .path').off('mouseout');
		$('.game').hide();
		$('h1').text("You Failed!");
		$('h3').text(fMessages[Math.floor(Math.random() * fMessages.length)]);
		$('button').text("Try again");
		$('.message').show();
		}

	var success = function(){
		$('.red, .path').off('mouseout');
		$('.game').hide();
		$('h1').text("Congratulations!");
		$('h3').text(sMessages[level - 1]);
		$('button').text("continue");
		$('.message').show();
		if(level === sMessages.length) {
			$('button').hide();
		}

		level++;
	}
});