// canvas size
var w = 500;
var h = 500;

window.onload = function(){

/*** Canvas Setup ***/

	var canvas = document.getElementById("myCanvas"),
		ctx = canvas.getContext("2d");

	setAttributes(canvas, {"height": h, "width": w});

	// Set multiple attributes
	function setAttributes(el, attrs) {
		for(var key in attrs) {
			el.setAttribute(key, attrs[key]);
			console.log('setting key: ' + key + ', value: ' + attrs[key]);
		}
	}

/*** Layout ***/
    function drawLayout(x, y, radius, dots, drawNumbers){
        var interval = Math.PI * 2 / dots;
        var oneDegree = Math.PI * 2 / 360;
        var startAngle = interval;
        var endAngle = startAngle + oneDegree;
        var num = 4; // Starting at hour 4

        while(startAngle < (Math.PI*2 + oneDegree)){
            console.log('startAngle: ' + startAngle);
            console.log('drawing ' + num);
            if(drawNumbers){
                drawText(x, y, radius, startAngle, num);
            } else{
                drawCircle(x, y, radius, startAngle, 1);
            }
            
            startAngle += interval;
            endAngle +=interval;
            //Fix hour count
            num = (num >= dots) ? 1 : num+1 ;
        }
        
    }
    function drawCircle(centerX, centerY, radius, angle, size){
        var x = centerX + radius * Math.cos(angle);
        var y = centerY + radius * Math.sin(angle);
        
		ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2, false);
        ctx.fill();
    }

    function drawText(centerX, centerY, radius, angle, text){
        var x = centerX + radius * Math.cos(angle);
        var y = centerY + radius * Math.sin(angle);
        //Add offset to center text
        x -= 5;
        y += 7;
        //TODO add dynamically via lineheight 

		ctx.font = "20px serif";
		ctx.fillStyle = "#fff";
		ctx.fillText(text, x, y);
    }

    function drawCompleteLayout(){
        drawLayout(250,250,100, 60, false);
        drawLayout(250,250,150, 60, false);
        drawLayout(250,250,225, 12, true);
    }

/*** Time ***/

setInterval(function(){
    // reset
    ctx.fillStyle = "#000";
    ctx.rect(0,0,w,h);
    ctx.fill();

    drawCompleteLayout();
    drawSec();
    drawMin();
    drawHour();
}, 1000);

    function drawSec(){
        var currTime = new Date(); 
        var sec = currTime.getSeconds();
        var angle = Math.PI * 2 / 60 * sec;
        // fix angle to start at hour 12
        angle = (angle < 0.5 * Math.PI) ?(angle + (1.5 * Math.PI )) : (angle - (0.5 * Math.PI));
        
        drawCircle(250, 250, 100, angle, 5);
    }

    function drawMin() {
        var currTime = new Date(); 
        var sec = currTime.getSeconds();
        var min = currTime.getMinutes();
        var angle = Math.PI * 2 / 60 * min;
        angle += Math.PI * 2 / 60 * (sec / 60);
        // fix angle to start at hour 12
        angle = (angle < 0.5 * Math.PI) ?(angle + (1.5 * Math.PI )) : (angle - (0.5 * Math.PI));
        //min
        drawCircle(250, 250, 150, angle, 8);
    }

    function drawHour(){
        var currTime = new Date(); 
        var sec = currTime.getSeconds();
        var min = currTime.getMinutes();
        var hour = currTime.getHours();
        var angle = Math.PI * 2 / 12 * hour;
        
        //angle += Math.PI * 2 / 12 * (sec / 60);
        angle += (Math.PI * 2 / 12) * (min / 60);

        // fix angle to start at hour 12
        angle = (angle < 0.5 * Math.PI) ?(angle + (1.5 * Math.PI )) : (angle - (0.5 * Math.PI));
        
        drawCircle(250, 250, 225, angle, 10);
    }

};