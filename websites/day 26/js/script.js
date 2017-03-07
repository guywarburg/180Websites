$(document).ready(function(){
	var sequence = [];
	var level = 0;
	var colorPicker = [
		"blue",
		"green",
		"yellow",
		"red"
	];

	var user = [];
	var count = 0;

	var sequenceGlow = function(i) {
		setTimeout(function(){
			glow(sequence[i]);
		}, i * 1000);
	}

	var playSequence = function() {
		for (var i = 0; i < sequence.length; i++) {
			console.log('glowing ' + sequence[i]);
			sequenceGlow(i);
		};
	}

	var clearUser = function() {
		count = 0;
		user = [];
	}

	var levelUp = function() {
		sequence[level] = colorPicker[Math.floor(Math.random() * 4)];
		console.log('New color is ' + sequence[level]);
		level++;
		setTimeout(function(){
			$('.level').text('Level ' + (level));
			playSequence();
		}, 2000);
	}

	var glow = function(color) {
		var colorClass = "." + color;
		$(colorClass).addClass(color + "G");
		setTimeout(function(){
			$(colorClass).removeClass(color + "G");
		},600);
	};

	$('.blue, .green, .red, .yellow').click(function(){
		gamePlay($(this).attr("id"));
	});

	$('.start').click(function(){
		$('.overlay').fadeOut();
		levelUp();
	});

	var gamePlay = function(color){	
		user[count] = color;
		glow(user[count]);
		console.log('added ' + user[count] + ' to arr and sequence is: ' + sequence[count]);
		if(user[count] !== sequence[count]) {
			console.log('incorrect answer');
			glow('body');
			clearUser();
			$('.level').text('Wrong!');
			setTimeout(function(){
				$('.level').text('Level ' + level);
				playSequence();
			}, 1500);
		} else {
			console.log('correct answer');
			count++;
			if(count === level) {
				clearUser();
				$('.level').text('Congratulations!');
				levelUp();
			}
		}
	}
	$(document).keydown(function(e) {
    switch(e.which) {
        case 37: // left
        	gamePlay('red');
        	break;

        case 38: // up
        	gamePlay('green');
        	break;

        case 39: // right
        	gamePlay('blue');
        	break;

        case 40: // down
        	gamePlay('yellow');
        	break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
});