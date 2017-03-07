var start = document.getElementById('start');
var modal = document.getElementById('modal');
var w, h; // canvas size
var round = 1;	
var lives = 3;

//populate buttons
for (var i = 1; i <= 30; i++){
	$("<div />")
		.addClass('btn')
		.attr('id', i)
		.text(i)
		.appendTo('#btn-container');
}

//Initialize canvas size
window.onload = function(){
	var w = window.innerWidth * 0.5;
	var h = 300;

	var canvas = document.getElementById("myCanvas"),
		c = canvas.getContext("2d");

	setAttributes(canvas, {"height": h, "width": w});

	// Remove Modal
	start.addEventListener('click', function(){
		modal.style.display = 'none';
		initGame();
	})

	// Set multiple attributes
	function setAttributes(el, attrs) {
		for(var key in attrs) {
			el.setAttribute(key, attrs[key]);
			console.log('setting key: ' + key + ', value: ' + attrs[key]);
		}
	}

	/*** GamePlay ***/
	var ballsToDisplay;

	function initGame() {
		initRound();
		$('.btn').click(function(){
			if($(this).attr('id') == ballsToDisplay) {
				levelUp();
				console.log("yay!");
			} else {
				levelDown();
				console.log("boo");
			}
		});
	}

	function initRound(){
		var balls = [];
		// randomize number of balls per round
		var minBalls = ((round < 5 )? 1 : round - 5);
		ballsToDisplay = getRandomInt(round + 5, minBalls);
		balls = generateBalls(ballsToDisplay);
		displayBalls(balls);
	}

	// Ball Class

	function Ball() {
		this.radius = 10;
		this.posX = Math.floor(Math.random() * (w - this.radius));
		this.posY = Math.floor(Math.random() * (h - this.radius));

		this.draw = function(){
			console.log("drawing at x: " + this.posX + ', y: ' + this.posY + ', radius: ' + this.radius);
			c.fillStyle = "#ffffff";
			c.beginPath();
			c.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
			c.fill(); 	
		}
	}

	function generateBalls(numOfBalls) {
		var ballsArr = [];
		for(var i = 0; i < numOfBalls; i++){
			ballsArr.push(new Ball);	
		}
		return ballsArr;
	}

	function displayBalls(balls) {
		setTimeout(function(){
			for(var i = 0; i < balls.length; i++){
				balls[i].draw();
			}
		}, 1000);

		setTimeout(function(){
			c.clearRect(0, 0, w, h);
		}, 1500);
	}

	function levelUp() {
		displayMessage("Congartualtions!");
		round++;
		$('.round').text(round);
		setTimeout(initRound(), 1500);
	}

	function levelDown() {
		lives--;
		if(lives < 0){
			displayMessage("Mua Mua Mua...");
			setTimeout(youLose, 2000);
		} else {
			displayMessage("Wrong... Get ready");
			$('.lives').text(lives);
			setTimeout(initRound(), 1500);
		}
	}

	function youLose(){
		var modalChildren = modal.children;
		//h1
		modalChildren[0].innerHTML = 'You\'ve lost, Sorry';
		//first p element
		modalChildren[1].innerHTML = 'Want to give it another shot?';
		//2nd p element
		modalChildren[2].style.display = 'none';
		//button text
		modalChildren[3].innerHTML = 'Try again';
		modal.style.display = 'block';

		//reset game
		round = 1;
		lives = 3;
		c.clearRect(0, 0, w, h);

	}

	function displayMessage(text){
		c.font = "20px serif";
		c.fillStyle = "#fff";
		c.textAlign = "center";
		c.fillText(text, 100, 150);
		setTimeout(function(){
			c.fillStyle = "#303030";
			c.fillRect(0, 0, w, h);
		},1000);
	}

	function getRandomInt(max, min){
		return (Math.floor(Math.random() * (max - min)) + min);
	}
}
