$(document).ready(function(){

	var width = window.innerWidth;
	var height = window.innerHeight;

	var canvas = document.getElementById("myCanvas"),
		c = canvas.getContext("2d");

	var color = "#000";
	var size = 10;

	var offset = canvas.getBoundingClientRect();
	var offsetTop = offset.top;
	var offsetLeft = offset.left;


	function setAttributes(el, attrs) {
  		for(var key in attrs) {
			el.setAttribute(key, attrs[key]);
			console.log('setting key: ' + key + ', value: ' + attrs[key]);
		}
	}

	//Initialize canvas size
	setAttributes(canvas, {"height":height-100, "width":width*0.9});


	//Drawing functionalities
	function draw(posX, posY) {
		c.fillStyle = color;
		c.fillRect(posX - offsetLeft, posY - offsetTop, size, size);	
	}

	$('#myCanvas').on({
		mousedown: function() {
			$(this).mousemove(function(event){
				draw(event.pageX, event.pageY);
			});	
		},
		click: function() {
			$(this).unbind('mousemove');
		}
	});

	//Button functionality

	$('#color').on('input', function(){
		color = $(this).val();
	});

	$('#size').on('input', function(){
		size = $(this).val();
	});

	$('.eraser').on('mousedown', function(event){
		color = "#fff";
		draw(event.pageX, event.pageY);
	});

	$('.clearCanvas').click(function(){
		c.fillStyle = "#ffffff";
		c.fillRect(0, 0, canvas.width, canvas.height);
	});
});

// TODO - create a custom cursor to display the color and size of the current 'brush'

