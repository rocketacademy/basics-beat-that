outputValue = `Player ${currentPlayer}, your chosen value is ${playerScore}! `;
var gameMode = ""; //Modes: diceroll, getplayerinput, generateresult
var currentPlayer = 1;
var playerDiceRolls = [];
var playerScore = 0;
var outputValue = "";
var allPlayerScores = [];

function rollDice() {
  var diceNumber = Math.ceil(Math.random() * 6);
  return diceNumber;
}

function rollDiceForPlayer() {
  var counter = 0;
  while (counter < 2) {
    playerDiceRolls.push(rollDice());
    counter++;
  }
  return (outputValue = `Player ${currentPlayer}, your dice rolls are ${playerDiceRolls[0]} and ${playerDiceRolls[1]}. <br><br> Please choose the order of the dice by inputting 1 or 2.`);
}

function isValid(input) {
  return input == 1 || input == 2;
}

function generatePlayerScore(playerdicerolls, input) {
  //Generate score based on player choice
  if (input == 2) {
    playerScore = parseInt(playerdicerolls.reverse().join(""));
  } else {
    playerScore = parseInt(playerdicerolls.join(""));
  }
  //Store player score in array
  allPlayerScores.push(playerScore);
  playerDiceRolls = [];
  return playerScore;
}

function generateResult(allPlayerScores) {
  if (allPlayerScores[0] > allPlayerScores[1]) {
    result = "Player 1";
  } else {
    result = "Player 2";
  }
  return result;
}

var main = function (input) {
  // when user hits submit, roll two dice and return dice roll.
  if (gameMode === "diceroll") {
    rollDiceForPlayer();
    gameMode = "getplayerinput";
  } else if (gameMode === "getplayerinput") {
    //Only accept 1 or 2 as valid input
    if (!isValid(input)) {
      return `Sorry, please input 1 or 2 to choose the order.<br><br>Your dice rolls are ${playerDiceRolls[0]} and ${playerDiceRolls[1]}.`;
    }

    //Generate and return player score
    playerScore = generatePlayerScore(playerDiceRolls, input);
    outputValue = `Player ${currentPlayer}, your chosen value is ${playerScore}! `;

    // If player 1 is done, go to player 2's turn
    if (currentPlayer == 1) {
      currentPlayer = 2;
      gameMode = "diceroll";
      return outputValue + "<br><br>It is now player 2's turn!";
    } else {
      //If player 2 is done, generate result
      gameMode = "generateresult";
      return outputValue + "<br><br>Press submit to find out who won!";
    }
  } else if (gameMode === "generateresult") {
    //Find the player with the higher combined number from array
    result = generateResult(allPlayerScores);
    outputValue = `${result} wins! <br><br>Press submit to play again!`;
    currentPlayer = 1;
    gameMode = "diceroll";
  } else {
    outputValue = "Press submit to play game!";
    gameMode = "diceroll";
  }

  return outputValue;
};
