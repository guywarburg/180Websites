$(document).ready(function(){
	$('form').on('submit', function (event) {
		event.preventDefault();

		var message = $('#teleText').val();
		console.log(message);
		teleprompt(message);
	})

	$('.home').click(resetPage);

	var resetPage = function() {
		$('.container').removeClass("teleBackground");
		$('.content').text("");
		$('.content').removeClass("contentCls prompt");
		$('.container').hide();
	}

	var teleprompt = function(txt) {
		$('.container').show();
		$('.container').addClass("teleBackground");
		$('.content').text(txt);
		$('.content').addClass("contentCls").css("top", "80%");
		var y = $('.content').position().top;
		console.log(y);
		glide(y);
	}

	var glide = function(locY) {
		setTimeout(function(){
			var dHeight = $('.content').height();

			if($('.content').position().top < (-2 * dHeight)) {
				resetPage();
				return;
			}
			locY--;
			$('.content').css("top", locY);
			glide(locY);
		}, 5);
	}
});