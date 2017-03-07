
$('.box').on("mouseenter", function(){
	$(this).css('background-color', randomColor());
});

function randomColor() {
	return '#' + Math.random().toString(16).slice(2, 8);
};