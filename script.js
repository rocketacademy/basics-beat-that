//global variables
var gameMode = "rollDice"; //3 modes, get number, combine number, find winner
var diceNumbers = []; //for each set of 2 dice rolls
var chosenNumbersInARound = []; //for all players
var allChosenNumbers = [];
// var playerScore = 0;
var player1Score = 0;
var player2Score = 0;
var playerNumber = 1;
var largerNumber = 0;

//generate random number 1 to 6
function rollDice() {
  return Math.ceil(Math.random() * 6);
}

//roll 2 numbers
function getDiceNumbers() {
  for (i = 0; i < 2; i += 1) {
    diceNumbers.push(rollDice());
  }
  return `Hi, player ${playerNumber}, you rolled ${diceNumbers}! Which number would you choose to go first? Key in '1' or '2' and click submit!`;
}

//arrange number based on user input
function arrangeSequence(firstChosenDice) {
  if (Number(firstChosenDice) === 1) {
    var combinedNumber =
      String(diceNumbers[firstChosenDice - 1]) + String(diceNumbers[1]);
    diceNumbers = []; //think of how not to repeat
  } else {
    combinedNumber =
      String(diceNumbers[firstChosenDice - 1]) + String(diceNumbers[0]);
    diceNumbers = [];
  }
  chosenNumbersInARound.push(combinedNumber);
  allChosenNumbers.push(combinedNumber);
  return combinedNumber;
}

function findWinner() {
  for (i = 0; i < 2; i += 1) {
    if (chosenNumbersInARound[i] === largerNumber) {
      output = `It's a draw!`;
    } else if (chosenNumbersInARound[i] > largerNumber) {
      largerNumber = chosenNumbersInARound[i];
      var winner = i + 1;
      output = `The two numbers are ${chosenNumbersInARound}. Player ${winner} wins this round. Congratulations!`;
    }
  }
  return `${output} <br><br>Score Board:<br>Player 1 score: ${player1Score}<br>Player 2 score: ${player2Score}`;
}

//without resetting winning statistics
function restartGame() {
  gameMode = "rollDice";
  chosenNumbersInARound = [];
  playerNumber = 1;
}

//not used yet
function keepScore(playerNumber, numberOfPlayers) {
  var startingIndex = playerNumber - 1;
  for (i = startingIndex; i < allChosenNumbers.length; i += numberOfPlayers) {
    playerScore = playerScore + allChosenNumbers[i];
  }
  return playerScore;
}

var main = function (input) {
  if (gameMode === "rollDice") {
    var output = getDiceNumbers();
    gameMode = "chooseSequence";
  } else if (gameMode === "chooseSequence") {
    if (!(input == 1 || input == 2)) {
      //input validation
      output = `Please type in '1' or '2' as your choice :)`;
    } else {
      var chosenFirstDice = input; //function here to play game

      var chosenNumber = arrangeSequence(chosenFirstDice);
      if (playerNumber === 1) {
        player1Score = Number(player1Score) + Number(chosenNumber);
        output = `The number chosen by player ${playerNumber} is ${chosenNumber}. Player ${
          playerNumber + 1
        } please click submit again to roll the dice!`;
        gameMode = "rollDice";
        playerNumber += 1;
      } else {
        player2Score = Number(player2Score) + Number(chosenNumber);
        output = `The number chosen by player ${playerNumber} is ${chosenNumber}. Click submit again to see the winner!`;
        gameMode = "findWinner";
      }
    }
  } else if (gameMode === "findWinner") {
    output = findWinner();
    restartGame();
  }
  return output;
};
