var advice = ["That's terrible! You should knock that off!",
				  "Seriously? Why don't you grow the hell up?!",
				  "Aren't you a little old for that crap?",
				  "You are bad and you should feel bad!",
				  "Gross. You are gross.",
				  "Are you going to suck all your life?",
				  "What? Who does that?!",
				  "I thought you were better than that.",
				  "My disapproval is overwhelming.",
				  " ಠ__ಠ ",
				  "Are you freaking kidding me?",
				  "NO! Bad!",
				  "And when do you plan on becoming an adult?",
				  "That is totally unacceptable.",
				  "You should be utterly ashamed.",
				  "Ugh! That's horrible!",
				  "A kitten dies everytime you do that.",
				  "I can't believe you are that disgusting."];

$('form').on('submit', function (event) {
	event.preventDefault();
	var bad_habit = $('.formText').val();

	if (bad_habit == '') {
		bad_habit = "don't fill in forms"
	}

	bad_habit = parseHabit(bad_habit);

	$('#message').html(bad_habit + "?");
	$('#answer').html(advice[Math.floor(Math.random()*18)]);
});

function parseHabit(str) {
	var newStr;
	str = str.toLowerCase();

	console.log("Entered parseHabit with: " + str);
	if (str.substr(0, 2) === "i "){
		newStr = str.replace(/i /gi, "You ");
	} else if (str.substr(0, 3) === "my "){
		newStr = str.replace(/my /gi, "Your ");
	} else {
		newStr = "You " + str;
	}

	newStr = newStr.replace(/ i /gi, " you ");
	newStr = newStr.replace(/ my /gi, " your ");
	return newStr;
}

//TODO - parse string
// TODO - CSS edit forms (remove highlight and locate placeholder)