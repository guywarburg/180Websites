var sushi = document.getElementById("sushi");

sushi.addEventListener("click", function(){
	sushi.className += "spin";
	setTimeout(function(){
		sushi.className = " ";	
	}, 1000)
});