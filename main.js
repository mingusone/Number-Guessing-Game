var theNumber = 0;
var guess = 3;
var hint = 3;
var guessed = [];

var guessedBefore = function (foo){
	for (var i = 0; i < guessed.length; i++) {
		if(foo === guessed[i]){
			return true;
		}
	};
	return false;
}

var rollNumber = function(){
	theNumber = Math.round((Math.random() * (100)) + 1);
};
var reRollNumber = function(){
	theNumber += Math.round((Math.random() * (6)) - 3);
	if (theNumber > 100){theNumber=100;}
	if (theNumber < 0){theNumber=1;}	
};
var resetGame = function(){
	rollNumber();
	hint = 3;
	guess = 3;
	updateBtns();
};
var updateBtns = function(){
	$("#guess").text("Guess : " + guess);
	$("#hint").text("Hints : " + hint);
};

var updateNewsFeed = function(text){
	$("#newsFeed").text(text);
};
var winGame = function(){
	updateNewsFeed("VICTORY! Now guess what the next one is for double oxygen.");
	resetGame();
};

//GUESS
$("#guess").on('click', guessCallback);
$("#input").on('keypress', function(event){
	var key = event.which;
	if (key == 13){ // 13 is the keycode for enter
		guessCallback();
	}
});

//Separated this because there can be multiple ways to guess (press enter or click guess)
var guessCallback = function(){
	if (guess > 1){
		var theGuess = parseInt($("#input").val(), 10);
		//Guessed before?
		var duplicate = guessedBefore(theGuess);
		if(duplicate === false){ // if it's a new guess, add it to the arr of guesses
			guessed.push(theGuess);
		}
		if (duplicate === true){ //typeof does not work here because typeof NaN === "number"
			updateNewsFeed("You've already guessed that.");
		}
		//other conditionals start here.
		else if (isNaN(theGuess)){ //typeof does not work here because typeof NaN === "number"
			updateNewsFeed("Numbers only please. Serious.");
		}
		else if (theGuess < 0 || theGuess > 100){
			updateNewsFeed("The number can only between 0 and 100");
		}
		else if(theGuess > theNumber){
			updateNewsFeed("Too High");
			guess--;
			updateBtns();
		}
		else if (theGuess < theNumber){
			updateNewsFeed("Too Low");
			guess--;
			updateBtns();
		}
		else{
			winGame();
			audio.play();
		}		
	}
	else{
		if (theGuess === theNumber){
			winGame();
		}
		else{
		resetGame();
		updateNewsFeed("Game over! Play again? Try to guess this one!");			
		}
	}

}

//Hint
$("#hint").on('click', function(){
	var high = theNumber + hint + guess; //The lower you are, the more power you get.
	var low = theNumber - hint - guess;
	if (high > 100){high=100;}
	if (low < 0){low=0;}
	var theNews = ("The number is between "+high+" and "+low+".");
	console.log(theNumber);
	var theDissapointment = ("You have no hints left.");
	if(hint > 0){
		updateNewsFeed(theNews);
		hint--;
		updateBtns();
	}
	else{
		updateNewsFeed(theDissapointment);
	}
});

//Rerolling changes the number but also give +1 hint and +1 guess
//REROLL
$("#reroll").on('click', function(){
	reRollNumber();
	if(hint < 3){
		hint++;
	}
	if(guess < 3){
		guess++;
	}
	updateNewsFeed("New number is old number plus or minus three.");
	updateBtns();
});


//SURRENDER
$("#giveup").on('click', function(){
	resetGame();
	updateNewsFeed("Play again? Take a guess!");
});

//LET THE GAMES BEGIN
$(document).ready(rollNumber);
var audio = document.getElementById("audio");
audio.volume = 0.5;









