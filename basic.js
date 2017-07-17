// Load the NPM Package inquirer
var inquirer = require("inquirer");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var fs = require("fs");

var correctAnswers = 0;
var wrongAnswers = 0;

//starts the game by asking user to select choice on cli
var startGame = function () {

	inquirer.prompt([
	{
		type: 'list',
		name: 'userChoice',
		message: 'Please select from following choices',
		choices: ['basic-quiz', 'cloze-quiz', 'quit']
	}
	
	]).then(function(answer) {

		if (answer.userChoice === 'basic-quiz') {
			quiz('log.txt', 0);
		}
		else if (answer.userChoice === 'cloze-quiz') {
			quiz('cloze-log.txt', 0);
		}
		else if (answer.userChoice === 'quit') {
			console.log('Thanks for playing! See you soon.');
		}
	});
}

var quiz = function(fileName, x) {

	fs.readFile(fileName, "utf-8", function(error, data) {

		var content = JSON.parse(data);
		
		if (x < content.length) {

			if (content[x].hasOwnProperty("front")) {
				var gameCard = new BasicCard(content[x].front, content[x].back);
				var gameQuestion = gameCard.front;
				var gameAnswer = gameCard.back.toLowerCase();
			}
			else {
				var gameCard = new ClozeCard(content[x].text, content[x].cloze);
				var gameQuestion = gameCard.partial;
				var gameAnswer = gameCard.cloze.toLowerCase();
			}

			inquirer.prompt([{
				name: "question",
				message: gameQuestion,
				validate: function(value) {
					if (value.length > 0) {
						return true;
					}
					return 'Take a guess!';
				}
			}]).then(function(answers) {
				if (answers.question.toLowerCase().indexOf(gameAnswer) > -1) {
					console.log('Correct!');
					correctAnswers++;
					x++;
					quiz(fileName, x);
				}
				else {
					console.log('Wrong! Correct answer is: ' + gameAnswer);
					wrongAnswers++;
					x++;
					quiz(fileName, x);
				}
			})

		} 
		//after asking all the questions in the file
		else {
			console.log("Let's see how you did!");
			console.log('Correct Answers: ' + correctAnswers);
			console.log('Wrong Answers: ' + wrongAnswers);
			correctAnswers = 0;
			wrong = 0;
			startGame();
		}
	});
};

startGame();
