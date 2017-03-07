
var data = {
	myH1: 10,
	grumpy: 10,
	myQuote: 10
}

document.getElementById('myH1').addEventListener("click", function(){
	var shadow = data.myH1 + "px " + data.myH1 + "px 8px grey";
	document.getElementById('myH1').style.textShadow = shadow;
	data.myH1 += 5;
});

document.getElementById('grumpy').addEventListener("click", function(){
	var shadow = data.grumpy + "px " + data.grumpy + "px 8px grey";
	document.getElementById('grumpy').style.boxShadow = shadow;
	data.grumpy += 5;
});

document.getElementById('myQuote').addEventListener("click", function(){
	var shadow = data.myQuote + "px " + data.myQuote + "px 8px grey";
	document.getElementById('myQuote').style.textShadow = shadow;
	data.myQuote += 5;
});