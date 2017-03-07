$(document).ready(function(){
	var count = 0;
	var maxSpeed = 4;
	var maxWidth = ((window.innerWidth) * 0.6);
	var letters = [];
	var correct = 0;
	var wrong = 0;
	var missed = 0;

	setTimeout(function(){
		$('.modal').fadeOut('slow');
		setInterval(function(){
			var let = new Letter();
			let.add();
				drop(let);
			letters.push(let);
		}, 800);
	}, 2000);


	function Letter() {
		this.id = count;
		this.character = getChar();
		this.speed = Math.floor(Math.random() * maxSpeed) + 3;
		this.pos = Math.floor(Math.random() * maxWidth)+ ((window.innerWidth) * 0.2);

		this.add = function() {
			$('<div/>',{
	    		'id'    : this.id,
	    		'class' : 'letter',
	    		'style' : 'top:' + 0 + 'px;left:'+this.pos+'px;',
	    		'text'	: this.character
				}).appendTo('.container');
			count++;
		}
	}

	var drop = function(let){
		$('#'+let.id).addClass('drop'+let.speed);
		setTimeout(function(){
			if ($('#'+let.id).is(":visible")) {
				$('#'+let.id).hide();
				missed++;
				displyStats();
				testLoss();
			}
		}, let.speed * 1000);
	}

	var getChar = function(){
		
		var possible = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMONPQRSTUVWXYZ!@#$%^&*():;";

		return possible.charAt(Math.floor(Math.random() * possible.length));;
	}

	var displyStats = function() {
		$('.correct').text(correct);
		$('.wrong').text(wrong);
		$('.missed').text(missed);
	}

	$(document).keypress(function(e) {
    	var temp = correct;
    	for(var i = 0; i < letters.length; i++){
    		if(String.fromCharCode(e.which) === letters[i].character){
    			$('#'+letters[i].id).hide();
    			correct++;
    		}
    	}
    	if(correct === temp) {
    		wrong++;
    	}
    	displyStats();
    	testLoss();
	});

	var testLoss = function() {
		if(missed >= 20 || wrong >= 20){
			$('.header').text('You Loose!');
			$('.modal p').hide();
			$('.modal').fadeIn('slow');
		}
	}
});