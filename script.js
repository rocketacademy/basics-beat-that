var gamestate = "GAME_STATE_DICE_ROLL";
var playerRolls = [];
var allPlayerScores = [];
var currentPlayer = 1;

var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  return randomInteger;
};

var playerRollDice = function () {
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  return `Welcome Player ${currentPlayer}.<br> You rolled ${playerRolls[0]} for Dice 1 and ${playerRolls[1]} for Dice 2.<br> Choose the order of the dice by entering "1" or "2".`;
};

var playerChooseOrder = function (input) {
  var finalNumber = "";
  if (input != 1 && input != 2) {
    return "Please enter '1' or '2'.";
  }
  if (input == 1) {
    finalNumber = Number(String(playerRolls[0]) + String(playerRolls[1]));
    return `You chose Dice ${input} first. Your number is ${finalNumber}. `;
  }
  if (input == 2) {
    finalNumber = Number(String(playerRolls[1]) + String(playerRolls[0]));
    return `You chose Dice ${input} first. Your number is ${finalNumber}. `;
  }
  allPlayerScores.push(finalNumber);
};

var compareScore = function () {
  console.log(allPlayerScores);
  var output;
  if (allPlayerScores[0] > allPlayerScores[1]) {
    output = "The winner is Player 1";
  }
  if (allPlayerScores[1] > allPlayerScores[0]) {
    output = "The winner is Player 2";
  }
  if (allPlayerScores[1] == allPlayerScores[0]) {
    output = "It's a tie!";
  }
  return output;
};

var main = function (input) {
  var myOutputValue = "";
  if (gamestate == "GAME_STATE_DICE_ROLL") {
    myOutputValue = playerRollDice();
    console.log(myOutputValue);

    gamestate = "GAME_STATE_CHOOSE_DICE_ORDER";
    return myOutputValue;
  }

  if (gamestate == "GAME_STATE_CHOOSE_DICE_ORDER") {
    myOutputValue = playerChooseOrder(input);

    if (currentPlayer == 1) {
      currentPlayer = 2;
      playerRolls = [];
      gamestate = "GAME_STATE_DICE_ROLL";
      return myOutputValue + "<br> It's now player 2's turn!";
    }
    if (currentPlayer == 2) {
      gamestate = "GAME_STATE_COMPARE_SCORES";
    }
  }
  if (gamestate == "GAME_STATE_COMPARE_SCORES") {
    myOutputValue = compareScore();
    gamestate = "GAME_STATE_DICE_ROLL";
    playerRolls = [];
    allPlayerScores = [];
    currentPlayer = 1;
    return myOutputValue + "<br><br> Press submit to restart the game.";
  }
  return myOutputValue;
};
