$(document).ready(function(){
	var answers = [
		"It is certain",
		"It is decidedly so",
		"Without a doubt",
		"Yes, definitely",
		"You may rely on it",
		"As I see it, yes",
		"Most likely",
		"Outlook good",
		"Yes",
		"Signs point to yes",
		"Reply hazy try again",
		"Ask again later",
		"Better not tell you now",
		"Cannot predict now",
		"Concentrate and ask again",
		"Don't count on it",
		"My reply is no",
		"My sources say no",
		"Outlook not so good",
		"Very doubtful",
	];

	$('form').on('submit', function(e){
		e.preventDefault();
		$('.triangle, .textInitial').fadeOut("slow");
		$('.eight').css("background-color", "#0f223f");
		$('.triangle').fadeIn("slow");

		setTimeout(function(){
			$('.textInitial').addClass('textAnswer').css("left", "175px");
			$('.textInitial').text(answers[Math.floor(Math.random() * answers.length)]);	
			$('.textInitial').fadeIn();
		}, 1000);
	});

});