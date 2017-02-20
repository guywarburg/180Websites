var words = "the be to of and a in that have I it for not on with he as you do at this but his by from they we say her she or an will my one all would there their what so up out if about who get which go me when make can like time no just him know take person into year your good some could them see other than then now look only come its over think also back after use two how our work first well way even new want because any these give day most us";
var wordsArr = words.split(" ");

window.onload = function(){
	generateCards()
};

function generateCards() {
	for(var i = 0; i < wordsArr.length; i++){
		$("<div/>")
		.addClass('card')
		.text(wordsArr[i])
		.css({
			"position": "absolute",
			"top": Math.floor(Math.random() * 150) + 'px',
			"left": Math.floor(Math.random() * 85) + '%'
		}).draggable()
		.appendTo('.messages');
	}
}