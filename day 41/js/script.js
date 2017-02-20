(function($){
    $.fn.disableSelection = function() {
        return this
                 .attr('unselectable', 'on')
                 .css('user-select', 'none')
                 .on('selectstart', false);
    };
})(jQuery);

window.onload = function(){
	$('body').disableSelection();
	var click_offset = 0;

	function lights(){
		$('body').toggleClass('on');
		$('#chainOn, #chainOff, #bulbOn, #bulbOff').toggle();
	}

	function drag(posY){
		var location = posY - click_offset;
		console.log('location' + location);
		if (location < 0) {
			return;
		}
		if (location > 200) {
			$('#chainImgs').unbind('mousemove')
				.animate({top: '0'});
			lights();
			return;
		}

		$('#chainImgs').css('top', location + 'px');
	}

	$('#chainImgs').draggable({
		containment: 'parent',
		start: function(e){
			click_offset = e.pageY;
		},
		stop: switchLight
	});

	function switchLight(event, ui){
		var offsetYPos = event.pageY;
		console.log(offsetYPos);
		if (offsetYPos >= click_offset + 150) {
			$('#chainImgs').animate({top: '0'}, 100);
			lights();
		}
	}

	/*** Trial with pure jQuery ***/

	//Might come back to this, was to glitchy so reverted to jQueryUI

	// $('#chainImgs').on({
	// 	mousedown: function(e) {
	// 		console.log('down: ' + e.pageY);
	// 		click_offset = e.pageY;
	// 		$(this).mousemove(function(event){
	// 			//console.log('move: ' + event.pageY);
	// 			drag(event.pageY);
	// 		});	
	// 	},
	// 	click: function() {
	// 		console.log('up');
	// 		$(this).unbind('mousemove');
	// 	}
	// });

};