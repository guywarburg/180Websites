// feed > +3 health, -2 love, -1 happiness
// hug > -1 health, +3 love
// play > -1 health, -2 love, +3 happiness.

function Dude (health, love, happiness) {
    this.health = health;
    this.love = love;
    this.happiness = happiness;
    this.feed = function () {
        this.health += 3;
        this.love -= 2;
        this.happiness -= 1;
    };
    this.hug = function () {
        this.love += 3;
        this.health -= 1;
    };
    this.play = function () {
        this.health -= 1;
        this.love -= 2;
        this.happiness += 3;
    };
}
	
$(document).ready(function(){

	var theDude = new Dude (10, 10, 10);

	$('.feedBtn').click(function(){
		theDude.feed();
		updateData();
	});

	$('.hugBtn').click(function(){
		theDude.hug();
		updateData();
	});

	$('.playBtn').click(function(){
		theDude.play();
		updateData();
	});

	var updateData = function() {
		$('.health').text(theDude.health);
		$('.love').text(theDude.love);
		$('.happiness').text(theDude.happiness);

		testSmile();
	}

	var testSmile = function() {
		if(theDude.health <= 6 && $('.smile').hasClass('happy')) {
			$('.smile').fadeOut();
			setTimeout(function(){
				$('.smile').removeClass('happy').addClass('sad');
				$('.smile').fadeIn();
			}, 400);
			
		}

		if(theDude.health > 6 && $('.smile').hasClass('sad')) {
			$('.smile').fadeOut();
			setTimeout(function(){
				$('.smile').removeClass('sad').addClass('happy');
				$('.smile').fadeIn();
			}, 400);
			
		}
	}
});