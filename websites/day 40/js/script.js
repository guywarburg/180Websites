window.onload = function(){

	var w = window.innerWidth;
	var h = window.innerHeight;
	var bubbles = [];
	var maxHeight = 75;
	var maxSpeed = 5;

	var canvas = document.getElementById("myCanvas"),
		c = canvas.getContext("2d");

	function setAttributes(el, attrs) {
  		for(var key in attrs) {
			el.setAttribute(key, attrs[key]);
			console.log('setting key: ' + key + ', value: ' + attrs[key]);
		}
	}

	//Initialize canvas size
	setAttributes(canvas, {"height": h, "width": w});

	// Buble Class
	function Bubble(){
		this.radius = Math.floor(Math.random() * maxHeight) + 5;
		this.speed = Math.floor(Math.random() * maxSpeed) + 1;
		this.posX = Math.floor(Math.random() * w);
		this.posY = h;
		this.visible = true;

		this.draw = function(){
			var my_gradient = c.createLinearGradient(this.posX, this.posY, (this.posX + (this.radius/2)), (this.posY + (this.radius/2)));
			my_gradient.addColorStop(0, "#54a9f7");
			my_gradient.addColorStop(1,"#abd1f4");
			//my_gradient.addColorStop(0,"black");
			//my_gradient.addColorStop(1,"white");
			c.fillStyle = my_gradient;
			c.beginPath();
			c.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
			c.fill(); 	
		}

		this.move = function(){
			if(this.posY > 0){
				this.posY -= this.speed;	
			} else {
				this.posY = h + this.radius;
			}
			
			if(this.visible){
				this.draw();
			}
		}
	}

	function createBubble(numOfBubbles) {
		for(var i = 0; i < numOfBubbles; i++){
			var bub = new Bubble();
			bubbles.push(bub);
		}
	}

	function init(){
		createBubble(20);

		window.setInterval(function(){
			c.clearRect(0, 0, w, h);
			for(var i = 0; i < bubbles.length; i++)
				bubbles[i].move();

		}, 30);
	}

	init();
	
	// Pop bubbles on click
	canvas.addEventListener('click', function(event) {
    	var x = event.pageX,
        	y = event.pageY;

    	// Collision detection between clicked offset and element.
    	bubbles.forEach(function(bubble) {
	        if (y > bubble.posY - bubble.radius && y < bubble.posY + bubble.radius
	            && x > bubble.posX - bubble.radius && x < bubble.posX + bubble.radius) {
	        	bubble.visible = false;
	        	console.log('pop');
        	}
    	});

	}, false);

	var btn = document.getElementById('moreBubbles');

	btn.addEventListener('click', function(){
		window.setTimeout(function(){
			createBubble(Math.floor(Math.random() * 20 + 1));
		}, 1000);
	}, false);

};