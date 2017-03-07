$("#target").mousemove(function(event) {
  var top = event.pageY - 50;
  var left = event.pageX - 50;
  
  console.log("top: " + top);
  console.log("left: " + left);

  $("#container").css("top", top);
  $("#container").css("left", left);
});