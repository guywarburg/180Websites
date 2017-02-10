$(document).ready(function(){

	$('textarea').one('focus', function(){
		appendCounter();
		removeText();
	});

	$('textarea').keyup(function(){
        if($(this).val().length !== 0){
			var chars = $('#myText').val();
			console.log("chars: " + chars);
			countChar(chars);
		}
	});

	var removeText = function() {
		$('h1, h4').fadeOut('slow');
	}

	var appendCounter = function() {
		var myDiv = "<div></div>";
		$('#myText').after(myDiv);
		$('div').addClass("counter");
	}

	var countChar = function(val) {
        var len = val.length;
        console.log(len);
        if (len >= 40 && len < 75) {
        	$('.counter').css({"background-color": "#fff95e", "color": "#c1c0a4"});
        } else if (len >= 75 && len < 100) {
        	$('.counter').css({"background-color": "#e88f3c", "color": "#3f3f3e"});
        } else if (len >= 100 && len < 120) {
        	$('.counter').css({"background-color": "#f7532e", "color": "#2d2d2c"});
        } else if (len >= 120) {
        	$('.counter').css({"background-color": "#000", "color": "#ef1a3a"});
        }
        var size = (155 / (len) * 8);
        if (size > 155) {
        	size = 155;
        }
    	$('#myText').css("font-size", size + "px");
        $('.counter').text(len + " characters used");
    }
});