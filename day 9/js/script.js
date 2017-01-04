function increaseSpeed() {
	bounceSpeed = bounceSpeed / 2;
	var newSpeed = bounceSpeed.toString() + "s";
	document.getElementById('ball').style.animationDuration = newSpeed;
}
var count = 0;
var message = [
	"Wow!",
	"Impressive!",
	"No Way...",
	"That's just amazing!"
];

function displayMessage() {
	// clear previous message
	var node = document.getElementById('congratulations');
	while (node.hasChildNodes()) {
    	node.removeChild(node.firstChild);
	}
	// Display new message
	document.getElementById('ball').style.display = "none";
	document.getElementById('congratulations').style.display = "block";
	document.getElementById('congratulations').innerHTML = message[count];
	setTimeout(function(){
		document.getElementById('ball').style.display = "block";
		document.getElementById('congratulations').style.display = "none";
	}, 1000);
	count++;
}

var bounceSpeed = 4;

document.getElementById('ball').addEventListener("click", function(){
	increaseSpeed(ball, bounceSpeed);
	displayMessage();
});