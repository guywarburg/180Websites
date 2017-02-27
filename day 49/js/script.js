var form = document.getElementById("myForm");
var atTop = false;

function moveForm(el){
    el.animate([
    // keyframes
    { transform: 'translateY(0px)' }, 
    { transform: 'translateY(-400%)' }
    ], { 
    // timing options
    duration: 1000
    });
    setTimeout(function(){
        form.style.marginTop = '10%';
    }, 1000);
}

$('#myForm').submit(function(e){
    e. preventDefault();

    var str = "http://api.openweathermap.org/data/2.5/weather?appid=2f1be23ad8a5ae7903bb955ddf8293cb&units=metric&q=";

    if(!atTop){
        moveForm(form);
        atTop = true;
    }
    if($('#search_name').val()){
        str += $('#search_name').val();
    }
    apiGet(str);
})

function showWeather(temp, desc){
    $('#temperature').text(temp).append("<span>&deg;C</30span>");
    $('#weather').text(desc);
    if(atTop){
        setTimeout(function(){
            $('#result').fadeIn();        
        },1000);
    }
}

function setBgColor(temp){
    var color;
    if( temp >= 40) {
        color = "#f5524b"; // red
    } else if(temp >= 30) {
        color = "#f5ae4b"; // Orange
    } else if(temp >= 20) {
        color = "#f5ea4b"; // Yellow
    } else if(temp >= 10) {
        color = "#4bf555"; // Green
    } else if(temp >= 0) {
        color = "#4bcef5"; // light blue
    } else { // lower than zero
        color = "#4b86f5"; // Blue
    }

    $('body').css('background-color', color);
}

function apiGet(str) {
    $.ajax({
        url: str,
        method: "GET",
        success: function(data){
            showWeather(data.main.temp, data.weather[0].main);
            setBgColor(data.main.temp);
            console.log(data);
        }
    });
}


window.onload = function() {
    // setTimeout(function(){
    //     moveForm(form);
    // }, 3000);
}