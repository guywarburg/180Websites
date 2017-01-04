/*
//set default color to white
var myColor = "white";

//Color picker options
//blue
document.getElementById("blue").onclick = function(){
	myColor = "blue";
};

//red
document.getElementById("red").onclick = function(){
	myColor = "red";
};

//yellow
document.getElementById("yellow").onclick = function(){
	myColor = "yellow";
};

document.getElementById("white").onclick = function(){
	myColor = "white";
};

document.getElementsByTagName("H1").onclick = function(){
	console.log("hi");
};
*/

$(document).ready(function () {

	var myColor = "white";

	$(".color-picker").on("click", function () {
		myColor = $(this).css('background-color');
	})

	$('.empty-space').on('click', function () {

		$(this).css("background-color", myColor );
	});

});