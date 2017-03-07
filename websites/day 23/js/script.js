$(document).ready(function(){
	var running = false;
	var sec = 0;
	var min = 0;
	var hour = 0;

	$('.start').click(function(){
		running = true;
		increment();
		$('.start').attr("disabled", true);
	});	

	$('.stop').click(function(){
		$('.start').attr("disabled", false);
		running = false;
		displayTime();
	});

	$('.reset').click(function(){
		sec = 0;
		min = 0;
		hour = 0;

		running = false;
		$('.start').attr("disabled", false);

		displayTime();
	});

	var increment = function(){
		setTimeout(function(){
			if(running){
				if (sec === 60) {
				sec = 0;
				min += 1;
				}
				if (min === 60) {
					min = 0;
					hour += 1;
				} 
				sec++;
				displayTime();
				increment();
			}
		}, 1000);
	}

	var displayTime = function(){
		setDigit('secUnit', sec % 10);
		setDigit('secDec', sec / 10);

		setDigit('minUnit', min % 10);
		setDigit('minDec', min / 10);

		setDigit('hourUnit', hour % 10);
		setDigit('hourDec', hour / 10);
	}

	var setDigit = function(classStr, val) {
		classStr = "." + classStr;
		switch (val) {
			case 0:
				$(classStr).children().css("visibility", "visible");
				$(classStr).children('.middle').css("visibility", "hidden");
				break;
			case 1:
				$(classStr).children().css("visibility", "hidden");
				$(classStr).children('.right').css("visibility", "visible");
				break;
			case 2:
				$(classStr).children().css("visibility", "visible");
				$(classStr).children('.tl, .br').css("visibility", "hidden");
				break;
			case 3:
				$(classStr).children().css("visibility", "visible");
				$(classStr).children('.left').css("visibility", "hidden");
				break;
			case 4:
				$(classStr).children().css("visibility", "visible");
				$(classStr).children('.top, .bottom, .bl').css("visibility", "hidden");
				break;
			case 5:
				$(classStr).children().css("visibility", "visible");
				$(classStr).children('.tr, .bl').css("visibility", "hidden");
				break;
			case 6:
				$(classStr).children().css("visibility", "visible");
				$(classStr).children('.tr').css("visibility", "hidden");
				break;
			case 7:
				$(classStr).children().css("visibility", "hidden");
				$(classStr).children('.right, .top').css("visibility", "visible");
				break;
			case 8:
				$(classStr).children().css("visibility", "visible");
				break;
			case 9:
				$(classStr).children().css("visibility", "visible");
				$(classStr).children('.bl').css("visibility", "hidden");
				break;
		}
		return;
	}

	displayTime();
});