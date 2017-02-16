$(document).ready(function(){
	var on = true;
	var ready = false;

	var words = getWordsArray();

	// **** CODE TO GENERATE RANDOM WORD **** 
	// var randomizer = function(){
		
	// 	// Create a random word

	// 	var length = Math.floor((Math.random() * 6) + 4);
	// 	var word = "";
	// 	var possible = "abcdefghijklmnopqrstuvwxyz";

	// 	for(var i = 0; i < length; i++){
	// 		word += possible.charAt(Math.floor(Math.random() * possible.length));
	// 	}

	// 	return word;
	// }

	$('.myButton').click(function(){
		on = !on;
		$(this).toggleClass('start');
		$(this).toggleClass('stop');
	});

	setInterval(function(){
		if(on && ready) {
			var word = words[(Math.floor(Math.random() * words.length))];	
			$('.myWord').text(word);
		}
	}, 100);

	function getWordsArray() {
		var array;

		$.ajax({
			type: 'GET',
			url: 'words.html',
			async: false,
			success: function (data) {
				array = data.split(" ");
				ready = true;	
			}
		});

		return array
	};
});

//TODO - switch to a api of real words.