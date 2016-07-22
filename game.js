var inquirer = require('inquirer');
var main = require('./main.js');
var word = require('./word.js');

var currentTeamIndex;

var teams = ["BLAZERS", "BUCKS", "BULLETS", "BULLS", "CAVALIERS", "CELTICS", "CLIPPERS",
			 "GRIZZLIES", "HAWKS", "HEAT", "HORNETS", "JAZZ", "KINGS", "KNICKS", 
			 "LAKERS", "MAGIC", "MAVERICKS", "NETS", "NUGGETS", "PACERS", "PELICANS", 
			 "PISTONS", "RAPTORS", "ROCKETS", "SIXERS", "SONICS", "SPURS", "SUNS",
			 "TIMBERWOLVES", "THUNDER", "WARRIORS", "WIZARDS"];

function GameFunctions () {};

GameFunctions.prototype.chooseRandomTeam = function () {
	// Create code to randomly choose one of the 30 teams 
	currentTeamIndex = Math.floor(Math.random()*teams.length);
	var currentTeam = teams[currentTeamIndex];	
	return currentTeam;
}	

GameFunctions.prototype.playAgain = function () {
	inquirer.prompt([{
		type: 'confirm',
		name: 'playAgain',
		message: 'would you like to play again?'
	}]).then(function (answers) {
		if (answers.playAgain) {
			word.WordFunctions.prototype.chooseDifficulty();
		} else {
			console.log('maybe later... :(');
		}
	});
}


// function chooseRandomTeam() {
// 	// Create code to randomly choose one of the 30 teams 
// 	currentTeamIndex = Math.floor(Math.random()*teams.length);
// 	var currentTeam = teams[currentTeamIndex];	
// 	return currentTeam;
// }	

// function playAgain() {
// 	inquirer.prompt([{
// 		type: 'confirm',
// 		name: 'playAgain',
// 		message: 'would you like to play again?'
// 	}]).then(function (answers) {
// 		if (answers.playAgain) {
// 			word.chooseDifficulty();
// 		} else {
// 			console.log('maybe later... :(');
// 		}
// 	});
// }

//EXPORTS
// module.exports.chooseRandomTeam = chooseRandomTeam;
// module.exports.playAgain = playAgain;
module.exports.GameFunctions = GameFunctions;