var hour, min;
var date;
var now = new Date(Date.now());
var month = [
"January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December"
];
var answers = [];

$(document).ready(function(){
	$('form').on('submit', function (event) {
		event.preventDefault();
		
		//Test if date was filled and parse

		if($('#bdate').val() == 0) {
			$('.sadFace').css("display", "block");
		} else {
			date = new Date($('#bdate').val());
		}

		//Test if time was filled and parse
		if($('#btime').val() == 0) {
			$('.sadTime').css("display", "block");
		} else {
			parseTime($('#btime').val());
			date.setMinutes(min);
			date.setHours(hour);
		}
		
		//Display Birth Times
		displayBDays();
	});

	function parseTime(bTime) {
		//as time layout is always hh:mm
		var midLocation = bTime.indexOf(":");
		hour = bTime.slice(0, midLocation);
		min = bTime.slice(midLocation+1, bTime.length);
	}

	function displayBDays() {
		answers[0] = getBirthDate();
		console.log(answers[0]);
		answers[1] = getAge(1);
		console.log(answers[1]);
	}

	function getBirthDate(){
		return `Your birthday is ${month[date.getMonth()]}, ${date.getDate()}`;
	}

	function getAge(type) {
		var str = "You are "
		switch (type) {
			case 1: //case years
				str += (now.getFullYear() - date.getFullYear()) + " years old"
				break;
			case 2: //case days
				(now.getFullYear() - date.getFullYear()) + " years old"
				break;
			case 3: //case minutes
				//code
				break;
		}

		return str;
	}
});
