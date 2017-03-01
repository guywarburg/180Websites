// Variables
var cards = [];
var attempts = 0,
    matches = 0;

var numOfCards = 30;
var cardContainer = document.getElementById('card-container');

// Card Object Declaration.

function Card(id, value){
    this.id = id;
    this.value = value;

    // TODO - add function - reveal and hide
}

function shuffle(array) {
  var currentIndex = array.length, 
    temporaryValue, 
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function hide(id){
    var el = document.getElementById(id);
    
    el.style.background = '#6d6d6d';
    el.innerHTML = '';
}



function incrementMatch(){
    var matchElement = document.getElementById('match');
    matches++;
    matchElement.innerHTML = matches;
}

function incrementAttempt(){
    var attemptElement = document.getElementById('attempt');
    attempts++;
    attemptElement.innerHTML = attempts;
}

// Setup Game.
function init(){
    // fill cards array with Cards
    for(var i = 0; i < numOfCards; i++){
        // create new Object
        var value = Math.floor(i / 2) + 1;
        var card = new Card(i, value);
        cards.push(card);
    }
    // Shuffle cards array
    cards = shuffle(cards);

    // Create and append elements
    for(var i = 0; i < cards.length; i++){
        var tempDiv = document.createElement('div');
        tempDiv.id = cards[i].id;
        tempDiv.className = 'card';
        cardContainer.appendChild(tempDiv);
    }
}

// Reveal a given card
function reveal(el) {
    var cardID = el.id;

    el.style.background = '#fff';
    el.innerHTML = cards[cardID].value;
}

// Display 'Game-Over' Modal
function endGame(){
    document.getElementById('cover').style.display = 'block';
    var modal = document.getElementById('modal');
    modal.style.display = 'block';

    // Handle game reset
    var btn = document.getElementById('reTry');
    btn.addEventListener('click', function(){
        attempts = -1;
        incrementAttempt();
        matches = -1;
        incrementMatch();

        for(var i = 0; i < cards.length; i++){
            var temp = document.getElementById(cards[i].id);
            // temp.style.display = 'block';
            temp.parentNode.removeChild(temp);
        }
        cards = [];
        modal.style.display = 'none';
        document.getElementById('cover').style.display = 'none';
        init();
        addClickers();
    });
}

// On Load

window.onload = function(){
    init();
    addClickers();
}

var match = function(id1, id2){
    incrementAttempt();
    if(cards[id1].value === cards[id2].value){
        incrementMatch();
        if(matches === cards.length / 2){
            endGame();
        }
        return true;
    }
    return false;
}

function addClickers(){
    var card1 = card2 = -1;
    var cardElements = document.getElementsByClassName('card')
    for(var i = 0; i < cardElements.length; i++){
        cardElements[i].addEventListener('click', function(){
            // reveal card
            reveal(this)
            // store card id
            if(card1 === -1){
                card1 = this.id;
            } else { 
                // test if same card was clicked
                if(this.id === card1){
                    console.log('double click');
                    return;
                }
                // block user from clicking more cards
                var cover = document.getElementById('cover');
                cover.style.display = 'block';
                card2 = this.id;
                if(!match(card1, card2)){
                    setTimeout(function(){
                        hide(card1);
                        hide(card2);
                    }, 1000);
                }
                setTimeout(function(){
                        cover.style.display = 'none';
                        card1 = card2 = -1;
                    }, 1000);
            }
        }, false);
    }
}