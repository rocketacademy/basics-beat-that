/*
- player 1 rolls two dice and choose the order of the dice
- player 2 rolls two dice and choose the order of the dice
- compare player 1 and player 2 number, state the winner
- reset the game
*/

var gameState = "playerRoll";
var playerRollRecords = [];

// roll dice function
var rollDice = function () {
  let randomDiceNum = Math.floor(Math.random() * 6) + 1;
  //console.log(randomDiceNum);
  return randomDiceNum;
};

// player choose value function
var chooseNumberFunction = function (input) {
  if (input != 1 && input != 2) {
    outputMessage = `Invalid option. 
      For option 1, please key 1.
      For option 2, please key 2.`;
  }
  if (input == 1) {
    var playerPoints =
      String(playerRollRecords[0]) + String(playerRollRecords[1]);
    outputMessage = `Your value is ${playerPoints}`;
  }
  if (input == 2) {
    var playerPoints =
      String(playerRollRecords[1]) + String(playerRollRecords[0]);
    outputMessage = `Your value is ${playerPoints}`;
  }
  return outputMessage;
};

// MAIN FUNCTION!
var main = function (input) {
  //console.log(gameState);
  if (gameState == "playerRoll") {
    while (playerRollRecords.length < 2) {
      playerRollRecords.push(rollDice());
    }
    console.log(playerRollRecords);
    gameState = "playerChooseNumber";
    outputMessage = `You have rolled ${playerRollRecords}. Please choose option 1 or option 2`;
    return outputMessage;
  }
  if (gameState == "playerChooseNumber") {
    outputMessage = chooseNumberFunction(input);
  }
  return outputMessage;
};
