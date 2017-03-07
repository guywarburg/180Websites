$(document).ready(function(){
	$('h1').attr('unselectable', 'on').css('user-select', 'none');

	var count = 0;

	$(document).click(function(e){
		if(count === 0) {
			$('.image').show();
			setTimeout(function(){
				$('h1').text('That\'s odd. Try clicking somewhere else.');	
			}, 2000);
		} else if (count === 1) {
			$('h1').text('Hmm... Maybe try the other side?');	
			addLoader(e);
		} else if (count === 2) {
			$('h1').text('Oh well, good luck then :)');
			addLoader(e);
			setTimeout(function(){
				$('h1').css('visibility', 'hidden');
			}, 2000);	
		} else {
			addLoader(e);
		}
		count++;
	});

	var addLoader = function(e) {
		var path = 'src="images/' + (Math.floor(Math.random()*10)+1) + '.gif"';
		var style = 'style="top:' + event.pageY + 'px; left:' + event.pageX + 'px;"';
		console.log('path: ' + path + 'style: ' + style);
		var loader = "<img " + path + style+ ">";
		$('body').append(loader);
	}
});