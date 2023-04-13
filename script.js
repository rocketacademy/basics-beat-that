/*
How many hours did you spend on this assignment?:
4 hours +

What part of the assignment did you spend the most time on?:
Making sure each function worked well

How comfortable did you feel with this assignment? (1-5):
4

Is there anything in this code that you feel pleased about?:
Breaking up the game into functions then reading the winner or loswer based on function outputs of each player

What's one aspect of your code you would like specific, elaborate feedback on?:
Is it ok? Not really sure what is considered good code, or if anything that could be improved on.

*/
var gameState = "pageLoad";
var player1DiceRoll = [];
var player2DiceRoll = [];
var player1TotalScore = 0;
var player2TotalScore = 0;
var player1TotalWins = 0;
var player2TotalWins = 0;
var player1Name = "Player 1";
var player2Name = "Player 2";
var myOutputValue = "";

var main = function (input) {
  // Naming players
  if (gameState == "pageLoad") {
    gameState = "firstClick";
  } else if (gameState == "firstClick") {
    gameState = "keyInPlayer1Name";
    console.log("pageload " + gameState);
    myOutputValue = "Hello stranger! Key in player 1's name";
  } else if (gameState == "keyInPlayer1Name") {
    player1Name = input;
    gameState = "keyInPlayer2Name";
    console.log(gameState);
    myOutputValue = `Hi ${player1Name}! Key in player 2's name`;
  } else if (gameState == "keyInPlayer2Name") {
    player2Name = input;
    gameState = "selectGameMode";
    console.log(gameState);
    myOutputValue = `Hi ${player2Name}! Please select game mode: normal, score or lowest`;
  } else if (gameState == "selectGameMode") {
    // Mode selection
    if (input == "normal") {
      gameState = "normalMode";
    } else if (input == "score") {
      gameState = "scoreMode";
    } else if (input == "lowest") {
      gameState = "lowestMode";
    } else return `Please select mode by keying in normal, score or lowest`;
    console.log("Game State: " + gameState);
  }

  // Normal mode
  if (gameState == "normalMode") {
    var player1Num = "";
    var player2Num = "";
    var message = "";
    player1DiceRoll = getEachPlayerRolls();
    player2DiceRoll = getEachPlayerRolls();
    player1Num = Number(concatToBiggerNum(player1DiceRoll));
    player2Num = Number(concatToBiggerNum(player2DiceRoll));
    if (player1Num > player2Num) {
      player1TotalWins += 1;
      message = `${player1Name} wins!`;
    } else {
      player2TotalWins += 1;
      message = `${player2Name} wins!`;
    }
    myOutputValue =
      message +
      "<br>" +
      `${player1Name} rolled ${player1DiceRoll} while ${player2Name} rolled ${player2DiceRoll}` +
      "<br>" +
      `Highest number for each player - ${player1Name}: ${player1Num} ${player2Name}: ${player2Num}` +
      "<br>" +
      `Total wins - ${player1Name}: ${player1TotalWins} ${player2Name}: ${player2TotalWins}`;
  }

  // Lowest mode
  if (gameState == "lowestMode") {
    var player1Num = "";
    var player2Num = "";
    var message = "";
    player1DiceRoll = getEachPlayerRolls();
    player2DiceRoll = getEachPlayerRolls();
    player1Num = Number(concatToSmallerNum(player1DiceRoll));
    player2Num = Number(concatToSmallerNum(player2DiceRoll));
    if (player1Num < player2Num) {
      player1TotalWins += 1;
      message = `${player1Name} wins!`;
    } else {
      player2TotalWins += 1;
      message = `${player2Name} wins!`;
    }
    myOutputValue =
      message +
      "<br>" +
      `${player1Name} rolled ${player1DiceRoll} while ${player2Name} rolled ${player2DiceRoll}` +
      "<br>" +
      `Lowest number for each player - ${player1Name}: ${player1Num} ${player2Name}: ${player2Num}` +
      "<br>" +
      `Total wins - ${player1Name}: ${player1TotalWins} ${player2Name}: ${player2TotalWins}`;
  }

  // Score
  if (gameState == "scoreMode") {
    var player1Num = "";
    var player2Num = "";
    var message = "";
    player1DiceRoll = getEachPlayerRolls();
    player2DiceRoll = getEachPlayerRolls();
    player1Num = Number(concatToBiggerNum(player1DiceRoll));
    player1TotalScore = player1TotalScore += player1Num;
    player2Num = Number(concatToBiggerNum(player2DiceRoll));
    player2TotalScore = player2TotalScore += player2Num;
    console.log(player2Num);
    if (player1TotalScore > player2TotalScore) {
      player1TotalWins += 1;
      message = `${player1Name} is winning!`;
    } else {
      player2TotalWins += 1;
      message = `${player2Name} is winning!`;
    }
    myOutputValue =
      message +
      "<br>" +
      `${player1Name} rolled ${player1DiceRoll} while ${player2Name} rolled ${player2DiceRoll}` +
      "<br>" +
      `Highest number for each player - ${player1Name}: ${player1Num} ${player2Name}: ${player2Num}` +
      "<br>" +
      `Total accumulative score - ${player1Name}: ${player1TotalScore} ${player2Name}: ${player2TotalScore}`;
  }
  return myOutputValue;
};

//function for random dice roll
var diceRoll = function () {
  var randNum1to6 = Math.ceil(Math.random() * 6);
  return randNum1to6;
};

//function for getting player rolls to an array
var getEachPlayerRolls = function () {
  let diceroll1 = diceRoll();
  let diceroll2 = diceRoll();
  return [diceroll1, diceroll2];
};

//function to automatically concatenate to make BIGGER number
var concatToBiggerNum = function ([num1, num2]) {
  if (num1 > num2) {
    return "" + num1 + num2;
  } else {
    return "" + num2 + num1;
  }
};

//function to automatically concatenate to make SMALLER number
var concatToSmallerNum = function ([num1, num2]) {
  if (num1 > num2) {
    return "" + num2 + num1;
  } else {
    return "" + num1 + num2;
  }
};
