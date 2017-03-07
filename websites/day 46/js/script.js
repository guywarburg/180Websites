///////////////////////
// Variables
///////////////////////

var h = w = 400;
var intervalSpeed = 100;
var size = 10;

const UP = 0;
const RIGHT = 1;
const DOWN = 2;
const LEFT = 3;

///////////////////////
// Object declarations
///////////////////////

function SnakeNode(posX, posY) {
    this.next = null;
    this.prev = null;
    this.x = posX;
    this.y = posY;
}

function Snake(x, y) {
    var node = new SnakeNode(x, y);
    this._head = node;
    this._tail = node;
    this.direction = RIGHT;
    this.length = 1;

    // _head is the head of the snake - it has no next value.
    // _tail is the snake's tail - it has no prev value.

    this.addNode = function(posX, posY) {
        var tempNode = new SnakeNode(posX, posY);
        this._head.next = tempNode;
        tempNode.prev = this._head;
        this._head = tempNode;

        this.length++;
    }

    this.removeNode = function() {
        this._tail = this._tail.next;
        this._tail.prev = null;

        this.length--;
    }

    this.move = function(increment) {
        var newX, newY;

        switch(this.direction) {
            case UP:
                newX = this._head.x;
                newY = this._head.y - size;
                break;
            case RIGHT:
                newX = this._head.x + size;
                newY = this._head.y;
                break;
            case DOWN:
                newX = this._head.x;
                newY = this._head.y + size;
                break;
            case LEFT:
            default:
                newX = this._head.x - size;
                newY = this._head.y;
                break;
        }
        this.addNode(newX, newY);
    }
}

function Food(posX, posY){
    this.x = posX;
    this.y = posY;
    this.visible = true;

    this.eat = function(){
        this.visible = false;
    }
}

///////////////////////
// Game Setup
///////////////////////

window.onload = function(){
    var canvas = document.getElementById('myCanvas'),
        ctx = canvas.getContext('2d');
    var offsetTop = document.getElementById('game-container').getBoundingClientRect().top;
    var offsetLeft = document.getElementById('game-container').getBoundingClientRect().left;
    var allFood, round, mySnake, gamePlay;

    initGame();
    ///////////////////////
    // The Game
    ///////////////////////
    
    function setGameInterval() {
        gamePlay = setInterval(function(){
            clearRect();
            mySnake.move(allFood);
            if(testForFood()){
                if(noMoreFood()){
                    levelUp();
                }
            } else {
                mySnake.removeNode();
            }
            if(testForWall() || testForSelf()){
                gameOver();
            } 
            drawSnake(mySnake);
            drawFood();
        }, intervalSpeed);
    }

    $(document).keydown(function(e) {
        switch(e.which) {
            case 37: // left
                if(mySnake.direction == RIGHT){
                    break;
                }
                mySnake.direction = LEFT;
                break;

            case 38: // up
                if(mySnake.direction == DOWN){
                    break;
                }
                mySnake.direction = UP;
                break;

            case 39: // right
                if(mySnake.direction == LEFT){
                    break;
                }
                mySnake.direction = RIGHT;
                break;

            case 40: // down
                if(mySnake.direction == UP){
                    break;
                }
                mySnake.direction = DOWN;
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });
    ///////////////////////
    // Game Functions
    ///////////////////////

    function initGame(){
        allFood = [];
        round = 1;
        intervalSpeed = 100;
        mySnake = initSnake(0, 0);
        drawSnake(mySnake);
        allFood = makeFood(round);
        drawFood();
        setGameInterval();
    }

    // returns a snake of length 3
    function initSnake(x, y){
        var snake = new Snake(x, y);
        snake.addNode(x+size, y);
        snake.addNode(x + (size * 2), y);
        return snake;
    }

    function drawSnake(snake){
        var head = snake._head;
        while(snake._head !== null){
            ctx.fillStyle = "#fff";
            ctx.fillRect(snake._head.x, snake._head.y, size, size);
            // move to next node;
            snake._head = snake._head.prev;
        }
        snake._head = head;
    }

    function clearRect(){
        ctx.fillStyle = "#333";
        ctx.rect(0, 0, w, h);
        ctx.fill();
    }

    function makeFood(numOfFood) {
        var arr =  [];
        for(var i = 0; i < numOfFood; i++){
            // random location within the canvas rounded to the nearest tenth.
            arr.push(new Food(getRandFoodLocation(w - size) , getRandFoodLocation(h - size)));
        }
        return arr;
    }

    function drawFood(){
        for(var i = 0; i < allFood.length; i++){
            if(allFood[i].visible){
                ctx.fillStyle = "#45f043";
                ctx.fillRect(allFood[i].x, allFood[i].y, size, size);
            }
        }
    }

    function getRandFoodLocation(max){
        var temp;
        temp = Math.floor(Math.random() * max);
        temp = temp - (temp % 10);

        return temp;
    }

    function testForFood() {
        for(var i = 0; i < allFood.length; i++){
            if(allFood[i].x == mySnake._head.x){
                if(allFood[i].y == mySnake._head.y){
                    allFood[i].visible = false;
                    return true;
                }
            }
        }
        return false;
    }

    function noMoreFood(){
        var count = 0;
        for(var i = 0; i < allFood.length; i++){
            if(!allFood[i].visible){
                count++;
            }
        }
        if(count == allFood.length){
            return true;
        }
        return false;
    }

    function testForWall() {
        if(mySnake._head.x >= w || mySnake._head.x < 0 ||
            mySnake._head.y >= h || mySnake._head.y < 0){
            
            return true;
        } else {
            return false;
        }
    }

    function testForSelf(){
        var head = mySnake._head;
        mySnake._head = mySnake._head.prev;
        while(mySnake._head !== null){
            if (head.x == mySnake._head.x && head.y == mySnake._head.y){
                return true;
            }
            // move to next node;
            mySnake._head = mySnake._head.prev;
        }
        mySnake._head = head;
        return false;
    }

    function gameOver(){
        setTimeout(function(){
            clearRect();
        }, intervalSpeed);
        clearInterval(gamePlay);
        $('#modal').show();
    }

    function levelUp(){
        round++;
        allFood = makeFood(round);
        intervalSpeed *= 0.6;
        $('#level').text(round);
    }

    $('#try-again').click(function(){
        $('#modal').hide();
        initGame()
    });
}


