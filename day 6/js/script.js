var date = new Date();

var weekday = [
	"sun",
	"mon",
	"tue",
	"wed",
	"thur",
	"fri",
	"sat"];

var message = [
	"דיכאון",
	"עצבני",
	"לא נגמר",
	"מיותר",
	"מצב רוח חופשי",
	"את יודעת...",
	"והזמן זז לאט"
]

var day = weekday[date.getDay()];
console.log("Day is " + day);
document.getElementById(day).setAttribute("id", "active");
document.getElementById('message').innerHTML = message[date.getDay()];