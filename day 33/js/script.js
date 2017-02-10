$(document).ready(function(){
	var on = true;
	var ready = false;

	// Async request doesn't work...

	var getWordsArray = function() {
		var arr;
		$.get("words.html", function(data) {
			arr = data.split(" ");
			// console.log(arr[1]);
			// console.log('success');
		}).done(function(data){
			ready = true;
		});

		return arr;
	}

	var words = getWordsArray();
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
			console.log(words[0]);
			console.log('hey');
			var word = words[(Math.floor(Math.random() * words.length))];	
			console.log(word);
			$('.myWord').text(word);
		}
	}, 100);

	// function getWordsArray() {
	// 	var array;

	// 	$.ajax({
	// 		type: 'GET',
	// 		url: 'words.html',
	// 		async: false,
	// 		success: function (data) {
	// 			array = data.split(" ");
	// 			ready = true;	
	// 		}
	// 	});

	// 	return array
	// };
});

//TODO - switch to a api of real words.