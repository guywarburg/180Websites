const size = 10;
const canvas = document.getElementById('myCanvas'),
    ctx = canvas.getContext("2d");
// canvas height and width
// TODO - dynamcally fetch.
const h = 300;
const w = 500;
const UP = 0,
    DOWN = 1;

var player_1_score = 0,
    player_2_score = 0;

/*****************/
/** Ball Object **/
/*****************/

function Ball(x, y, color){
    this.x = x;
    this.y = y;
    this.color = color;
    this.dx = Math.floor(Math.random() * size) + 1;
    this.dy = Math.floor(Math.random() * size) + 1;

    // Ball Methods
    this.move = function(){
        if(this.y + this.dy >= h || this.y + this.dy < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
    }

    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, size, size);
    }

    this.getLocation = function(){
        return [this.x, this.y];
    }

    this.changeDirection = function() {
        this.dx = -this.dx;
    }

    this.testPaddle = function(padLoc) {
       
    }
}

/*******************/
/** Paddle Object **/
/*******************/

function Paddle(x, y, id, color){
    this.x = x;
    this.y = y;
    this.pWidth = size;
    this.pLength = size * 5;
    this.id = id;
    this.color = color;

    // Paddle Methods

    this.move = function(direction){
        if(direction) { // down
            if (this.y + size > (h - this.pLength)){
                return false;
            }
            this.y += size;
        } else { // up
            if (this.y - size < 0){
                return false;
            }
            this.y -= size;
        }
        return true;
    }

    this.draw = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.pWidth, this.pLength);
    }

    this.getLocation = function(){
        return [this.x, this.y];
    }

    this.testBall = function(ball){
        if(this.x > 0){
            if((ball.x + ball.dx >= this.x) && 
                (ball.y + ball.dy >= this.y && ball.y + ball.dy < (this.y + size * 5))) {
                    return true;
            }
            return false;
        } else {
            if((ball.x + ball.dx <= this.x) && 
                (ball.y + ball.dy >= this.y && ball.y + ball.dy < (this.y + size * 5))) {
                    return true;
            }
            return false;
        }
    }
}

function testLoss(ball) {
    if(ball.x + ball.dx >= w || ball.x + ball.dx < 0){
        if(ball.x + ball.dx >= w){
            return 1; // Player 1 gained a point
        } else {
            return 2; // Player 2 gained a point
        }
    }
    return false;
}

function updateScore() {
    var player1 = document.getElementById('player-1-score');
    var player2 = document.getElementById('player-2-score');

    player1.innerHTML = player_1_score;
    player2.innerHTML = player_2_score;
}

function roundOver(num) {
    // clear canvas
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, w, h);

    // write to canvas round winner
    txtStr = 'Player ' + num + ' has won the round!';
    ctx.font = '48px monospace';
    ctx.fillStyle = '#3dc828';
    ctx.fillText('Round Over', 120, 100);
    ctx.font = '24px monospace';
    ctx.fillText(txtStr, 80, 150);
    ctx.closePath();

    if(num === 1){
        player_1_score++;
    } else {
        player_2_score++;
    }
}


window.onload = function(){
    var myBall, paddle2, paddle1;
    var myInterval;

    function initGame(){
        myBall = new Ball(0, 0, "#3dc828");
        paddle1 = new Paddle(0, (h/2 - 2 * size), 0, "#3dc828");
        paddle2 = new Paddle((w - size), (h/2 - 2 * size), 1, "#3dc828");

        myInterval = setInterval(function(){
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, w, h);

            paddle1.draw();
            paddle2.draw();

            var currentPaddle;
            if(myBall.dx > 0){
                currentPaddle = paddle2;
            } else {
                currentPaddle = paddle1;
            }
            //myBall.testPaddle(currentPaddle.getLocation())

            if(currentPaddle.testBall(myBall)){
                myBall.changeDirection();
            }

            if(testLoss(myBall)) {
                clearInterval(myInterval);
                roundOver(testLoss(myBall));
                setTimeout(function(){
                    initGame();
                    updateScore();
                }, 1500);
            }

            myBall.move();
            myBall.draw();
        }, 50);
    }

    document.addEventListener('keydown', function(e){
        e.preventDefault();
        switch(e.which){
            case 38:
                paddle2.move(UP);
                break;
            case 40:
                paddle2.move(DOWN);
                break;
            case 87:
                paddle1.move(UP);
                break;
            case 83:
                paddle1.move(DOWN);
                break;
            default:
                break;
        }
    });

    initGame();
}