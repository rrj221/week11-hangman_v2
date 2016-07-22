// Both letter.js and word.js should be constructor files:
// word.js should contain all of the methods which will check the letters guessed versus the random word selected.
// letter.js should control whether or not a letter appears as a "_" or as itself on-screen.
// Your game.js file will randomly select a word for the player.
// main.js will contain the logic of your app. Running it in Terminal/Bash will start the game.
// The app should end when a player guesses the correct word or runs out of guesses.

var inquirer = require('inquirer');
var game = require('./game.js');
var word = require('./word.js');
var letter = require('./letter.js');
var player = require('play-sound-v12')(opts = {});


//GAME///////////

player.play('./sounds/welcome.mp3');

console.log('\n////////////////////////////////', '\n');
console.log('Welcome to NBA Hangman by Ryan Jarrell','\n');
console.log('Powered by Node.js\n');

word.WordFunctions.prototype.start();







