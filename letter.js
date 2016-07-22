var main = require('./main.js');
var word = require('./word.js');
var game = require('./game.js');

var displayArrayGlobal = [];


function LetterFunctions () {};


LetterFunctions.prototype.displayToScreen = function (team, guess, guessesArray, guessesRemaining) {
	var upperCaseGuess = guess.toUpperCase();
	var teamArray = team.split('');
	var correct = false;

	//creates new team with underscores to display
	teamArray.forEach(function (letter, i) {
		if (letter === upperCaseGuess) {
			displayArrayGlobal[i] = letter;
			correct = true;
		} 
	});

	var guessesRemainingNew = LetterFunctions.prototype.incrementGuessesIfNeeded(guessesRemaining, correct) 

	console.log('\n////////////////////////////////', '\n');
	console.log('GUESSES REMAINING:', guessesRemainingNew);
	console.log('GUESSES:', LetterFunctions.prototype.allToUpperCase(guessesArray).join(' '), '\n');
	console.log('NBA TEAM:', displayArrayGlobal.join(' '), '\n');

	module.exports.correct = correct;
}

LetterFunctions.prototype.checkIfWon = function () {
	if (displayArrayGlobal.indexOf('_') === -1) {
		console.log('you are a superstar. yes you are.\n');
		return true;
	}
	return false;	
}

LetterFunctions.prototype.lost = function (){	
	console.log('you lost. go get \'em next time!\n');
	game.GameFunctions.prototype.playAgain();
}

LetterFunctions.prototype.initializeDisplayArray = function (team) {
	var displayArray = [];
	for (var i = 0; i < team.length; i++) {
		displayArray.push('_');
	}
	displayArrayGlobal = displayArray;
	return displayArray;
}

LetterFunctions.prototype.allToUpperCase = function (arrayOfChars) {
	var upperCaseArray = [];
	arrayOfChars.forEach(function (letter, i) {
		upperCaseArray.push(letter.toUpperCase());
	});
	return upperCaseArray;
}

LetterFunctions.prototype.incrementGuessesIfNeeded = function (guessesRemaining, guessWasCorrect) {
	if (guessWasCorrect) {
		return guessesRemaining;
	} 
	return guessesRemaining - 1;
}

module.exports.LetterFunctions = LetterFunctions;