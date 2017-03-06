var needToFloor = false;

// Functions
function updateDisplay(str){
    var display = document.querySelector('.display');
    display.innerHTML = str;
}

function result(str){
    let error = "ERR";
    if (str === undefined){
        return error;
    }

    if( typeof str === 'number'){
        if(needToFloor){
            var num = result.toFixed(2);
            needToFloor = false;
        }
        return num;
    }
    var arr = str.split(" ");
    console.log(arr);

    if(arr.length < 1){
        return error;
    }
    for(var i = 0; i+2 < arr.length; i+=2) {
        arr[i+2] = calculate(parseInt(arr[i]), parseInt(arr[i+2]), arr[i+1]);
    }
    console.log(arr[arr.length-1]);
    var result = arr[arr.length-1];
    if(needToFloor){
        result = result.toFixed(2);
        needToFloor = false;
    }
    
    return result;
}

function calculate(num1, num2, op){
    switch(op){
        case '/':
            needToFloor = true;
            return num1 / num2;
            break;
        case '*':
            return num1 * num2;
            break;
        case '-':
            return num1 - num2;
            break;
        case '+':
            return num1 + num2;
            break;
    }
}

function getOperand(val){
    switch(val){
        case 'divide':
            return ' / ';
            break;
        case 'multiply':
            return ' * ';
            break;
        case 'minus':
            return ' - ';
            break;
        case 'plus':
            return ' + ';
            break;
    }
}

function negate(str){
    // TODO - negate will have to parse string for last num and add a minus sign in that location.
    if (str === "") {
        return "-";
    }
    var arr = str.split(" ");

    if(arr.length === 1){
        return (parseInt(arr[0]) * -1);
    }
    arr[arr.length -1] *= -1;
    console.log('negate!');
    console.log(arr[arr.length -1]);

    str = str.slice(0, str.lastIndexOf(" "));
    str += " " + arr[arr.length-1];
    return str;
}

window.onload = function(){
    var currentlyDisplayed = '';

    // add event listener to num buttons
    var buttons = document.querySelectorAll('div.num');
    for(var i = 0; i < buttons.length; i++){
        buttons[i].addEventListener('click', function(){
            currentlyDisplayed += this.id;
            updateDisplay(currentlyDisplayed);
        })
    }
    // add event listener to operand buttons
    var operands = document.querySelectorAll('div.operand');
    for(var i = 0; i < operands.length; i++){
        operands[i].addEventListener('click', function(){
            currentlyDisplayed += getOperand(this.id);
            updateDisplay(currentlyDisplayed);
        })
    }
    // add event listener to dot button
    document.getElementById('dot').addEventListener('click', function(){
        currentlyDisplayed += '.';
        updateDisplay(currentlyDisplayed);
    });
    // add event listener to clear buttons
    var clearers = document.querySelectorAll('div.clear');
    for(var i = 0; i < clearers.length; i++){
        clearers[i].addEventListener('click', function(){
            currentlyDisplayed = '';
            updateDisplay(currentlyDisplayed);
        });
    }
    // add event listener to operand button
    document.getElementById('negate').addEventListener('click', function(){
        currentlyDisplayed = negate(currentlyDisplayed);
        updateDisplay(currentlyDisplayed);
    });
    // add event listener to result button
    document.getElementById('equals').addEventListener('click', function(){
        currentlyDisplayed = result(currentlyDisplayed);
        updateDisplay(currentlyDisplayed);
    });

};