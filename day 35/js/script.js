$(document).ready(function(){
	var btnNum = 0;
	var buttons = 3

    var viewportWidth = $("body").innerWidth() - 150;
    var viewportHeight = $("body").innerHeight() - 150;
    var top, left;

	$('.btn').click(function(){
		top = Math.floor(Math.random() * viewportHeight);
	    left = Math.floor(Math.random() * viewportWidth);
		$(this).fadeOut();
		setTimeout(function(){
			$('.btn').removeClass('btn'+btnNum);
			btnNum = Math.floor(Math.random() * buttons);
			console.log('btnNum: ' +btnNum);
			$('.btn').addClass('btn'+ btnNum).css({'top': top + 'px', 'left': left + 'px'});
			$('.btn').fadeIn();
		},1000);
	});

});