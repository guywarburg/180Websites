$(document).ready(function(){
	var numOfDroplets = 20;

	for (var i = 0; i < numOfDroplets; i++) {
		console.log('i: ' + i);
		setTimeout(function(){
			console.log('TIMEOUT i: ' + i);
			var left = Math.floor(Math.random()* 250);
			var z = (-1)*(Math.floor(Math.random()* 50));
			var droplet = $("<div></div>")
							.addClass('drop animation')
							.attr("id", i)
							.css({"left": left, "z-index": z});
			$('.animate').append(droplet);
		}, (i * 200));
	};

	$('#love').click(function(){
		$('.drop').addClass('heart').removeClass('drop');
	});

	$('#water').click(function(){
		$('.heart').addClass('drop').removeClass('heart');
	});
});