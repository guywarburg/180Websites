$('#clicker').click(function(){
	$('.die').addClass("shake");
	changeText();
	$('#myH1').addClass("shakeText");
	randomize();
	removeShake();
});

function removeShake() {
	setTimeout(function(){
		$('.die').removeClass("shake");
		$('#myH1').removeClass("shakeText");
	}, 1000);
}

function changeText() {
	$('#myH1').text("Shake! Shake! Shake!");
	console.log("shake shake shake");
}

function randomize() {
	var dieValue1 = Math.floor(Math.random() * 6) + 1;
	var dieValue2 = Math.floor(Math.random() * 6) + 1; 
	setTimeout(function(){
		setDieNum(1, dieValue1);
		setDieNum(2, dieValue2);
	},1000);
	setHeader(dieValue1 + dieValue2);
}

function setHeader(value) {
	setTimeout(function(){
		$('#myH1').text(value);
	}, 1000);
}

function setDieNum(die, value) {
	var dieName = "die" + die;
	for (var i = 1; i <= 9; i++) {
		if (i === 2 || i === 8) {
			continue;
		}
		$(`#${dieName}_pip${i}`).addClass("hidden");
	};

	switch(value) {
		case 1:
			$(`#${dieName}_pip5`).removeClass("hidden");
			break;
		case 2:
			$(`#${dieName}_pip1`).removeClass("hidden");
			$(`#${dieName}_pip9`).removeClass("hidden");
			break;
		case 3:
			$(`#${dieName}_pip1`).removeClass("hidden");
			$(`#${dieName}_pip5`).removeClass("hidden");
			$(`#${dieName}_pip9`).removeClass("hidden");
			break;
		case 4:
			$(`#${dieName}_pip1`).removeClass("hidden");
			$(`#${dieName}_pip3`).removeClass("hidden");
			$(`#${dieName}_pip7`).removeClass("hidden");
			$(`#${dieName}_pip9`).removeClass("hidden");
			break;
		case 5:
			$(`#${dieName}_pip1`).removeClass("hidden");
			$(`#${dieName}_pip3`).removeClass("hidden");
			$(`#${dieName}_pip5`).removeClass("hidden");
			$(`#${dieName}_pip7`).removeClass("hidden");
			$(`#${dieName}_pip9`).removeClass("hidden");
			break;
		case 6:
			$(`#${dieName}_pip1`).removeClass("hidden");
			$(`#${dieName}_pip3`).removeClass("hidden");
			$(`#${dieName}_pip4`).removeClass("hidden");
			$(`#${dieName}_pip6`).removeClass("hidden");
			$(`#${dieName}_pip7`).removeClass("hidden");
			$(`#${dieName}_pip9`).removeClass("hidden");
			break;
		default: 
			$(`#${dieName}_pip1`).removeClass("hidden");
			$(`#${dieName}_pip3`).removeClass("hidden");
			$(`#${dieName}_pip4`).removeClass("hidden");
			$(`#${dieName}_pip5`).removeClass("hidden");
			$(`#${dieName}_pip6`).removeClass("hidden");
			$(`#${dieName}_pip7`).removeClass("hidden");
			$(`#${dieName}_pip9`).removeClass("hidden");
			break;
	}












}