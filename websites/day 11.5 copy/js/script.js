var midX = $(document).width()/2;
var midY = $(document).height()/2;

console.log( "midX: " + midX +"& midY: " +midY);

$("#target").mousemove(function(event) {

  var locX = event.pageX;
  var locY = event.pageY;
  
  // Pitagoras to calculate line length
  var cLength = Math.round(Math.sqrt(Math.pow(locX, 2) + Math.pow(locY, 2)));
  console.log("cLength: " + cLength);
  // Assign length
  $('#container').css("width", cLength);
  $('#container').css("left", (720 - (cLength/2)));
});