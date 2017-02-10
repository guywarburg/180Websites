// Variables
var comp;
var usr;

// Main

$('.userBtn').click(function(){
	console.log('click');
	usr = $(this).attr('id');
	animate();
	comp = setRandValue();
	setTimeout(function(){
		displayResult();	
	}, 2000);
});

function animate() {
	var counter = 3;
	$('.message').html(counter.toString());
	countDown;
	var countDown = setInterval(function(){
		$('.message').html(counter.toString());
		counter--;
	}, 500);
	setTimeout(function(){
		clearInterval(countDown);
		$('.choice').removeClass('shake');
	},1500);
	$('.choice').addClass('shake');
	console.log('animate');

}

function setRandValue() {
	var compChoice = Math.floor(Math.random() * 3);
	switch(compChoice) {
		case 0:
			return "rock";
		case 1:
			return "paper";
		case 2:
			return "scissors";
		default:
			return "rock";
	}
}

function displayResult() {
	$('.choice').css('display','none');
	$('.right.' + usr).css('display','block');
	$('.left.' + comp).css('display','block');
	if(usr === comp) {
		$('.message').html("It's a tie!");
	} else if(usr === "rock" && comp === "scissors" || 
			usr === "paper" && comp === "rock" || 
			usr === "scissors" && comp === "paper") {
		$('.message').html("You win!");
	} else {
		$('.message').html("You lose :(");
	}
}