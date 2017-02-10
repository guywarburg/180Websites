$(document).ready(function () {
	$('.message').hide();
	$('form').on('submit', function (event) {
		event.preventDefault();
	
		var total = 0;
		for (var i = 1; i <= 5; i++) {
			total += parseInt($('input[name=q-' + i + ']:checked').val());
			console.log("total = " +total);
		};

		$('.messageTxt').text(total);
		$('.message').show();
	});
});