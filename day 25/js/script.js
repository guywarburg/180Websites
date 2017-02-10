$(document).ready(function(){

    var word;
    var scrambled;
    var tries = 2;
    var score = 0;
    var level = 1;
    
    window.RandomWordComplete = function(data){
        if(data.Word.length > 11) {
            console.log('retreiving new word...');
            randomWord();
        } else {
            word = data.Word;
            console.log("Random word has been retrieved and is " + word);
            $('.start').attr("disabled", false)  ;  
        }
        
    };

    var randomWord = function() {
            console.log("entered ajax")
            var requestStr = "http://randomword.setgetgo.com/get.php";
            var wordLen = Math.floor(Math.random()* 6) + 5;

            $('.start').attr("disabled", true)
            $.ajax({
                type: "GET",
                url: requestStr,
                dataType: "jsonp",
                jsonpCallback: 'RandomWordComplete'
            });
    };

    randomWord();

    $('.start').click(function(){
        setupGame();
        $('.explanation').fadeOut(function(){
            $('.game').fadeIn();
        });
    });

    function toArray(tmpWord) {
        var wordArr = [];

        for (var i = 0; i < tmpWord.length; i++) {
            wordArr[i] = tmpWord.charAt(i);
        };

        return wordArr;
    }

    /** Scramble Words for game **/
    function scrambleWord() {
        var scrambledArr = toArray(word);
        var tmpChar = 'a';
        for (var i = scrambledArr.length - 1; i >= 0; i--) {
            tmpChar = scrambledArr[i];
            var tmplocation = Math.floor(Math.random() * (scrambledArr.length - i));
            scrambledArr[i] = scrambledArr[tmplocation];
            scrambledArr[tmplocation] = tmpChar;
        };

        scrambled = scrambledArr.toString();
        scrambled = scrambled.toUpperCase().replace(/,/g, ' ');
    }

    /** Initialize Game **/
    function setupGame() {
        console.log("Random word is " + word);
        scrambleWord();
        console.log("Scrambled word is " + scrambled);

        $('.score').text("Score: " + score);
        $('.letters').text(scrambled);

        if(level === 1) {
            $('.gameTxt').text("Good Luck!");
        } else {
            $('.gameTxt').text("Your on level: " + level);
        }
    }

    $('form').on('submit', function(event){
        event.preventDefault();

        if($('input').val() === word) {
            levelUp();
        } else if (tries > 0) {
            tries--;
            anotherTry();
        } else {
            youLose();
        }
    });

    function levelUp() {
        //retrieve new word
        randomWord();

        score += 3;
        level++;
        $('.mainTxt').text("Congratulations!");
        $('.start').text("Next Level");
        $('.game').fadeOut(function(){
            $('.explanation').fadeIn();
        });

        $('input').val('');
    }

    function anotherTry() {
        score--;
        $('.score').text("Score: " + score);
        $('.gameTxt').text("Incorrect! You have " + (tries+1) + " left.");
    }

    function youLose() {
        randomWord();

        $('.mainTxt').text("You loose :(");
        $('.start').text("Try again!");
        $('.game').fadeOut(function(){
            $('.explanation').fadeIn();
        });

        tries = 2;
        level = 1;
        score = 0;
    }

    /** Ajax Request **/
});