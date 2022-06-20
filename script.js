// INPUT VALIDATION NEEDS WORK... AAAARGH!

// GLOBAL VARIABLES

var gameModeDiceRoll = "dice roll";
var gameModeChooseOrder = "player choice";
var gameModeCompareScores = "compare scores";
var gameMode = gameModeDiceRoll;
var currentPlayer = 1;

// ARRAYS
var currentPlayerRolls = [];
var allScores = [];

//helper functions
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

var getPlayerHand = function () {
  var counter = 0;
  while (counter < 2) {
    currentPlayerRolls.push(rollDice());
    counter += 1;
  }
  return `Welcome Player ${currentPlayer}. <br><br> You rolled ${currentPlayerRolls[0]} for Dice 1 and ${currentPlayerRolls[1]} for Dice 2. <br><br> Please choose the order of the dice by typing 1 or 2 and clicking submit to indicate which dice you want to use as your first number.<br><br> Remember, the larger your score, the greater your chances of winning.`;
};

var choosePlayerScoreOrder = function (playerSelection) {
  var playerScore = "";
  if (playerSelection == "1") {
    playerScore = String(currentPlayerRolls[0]) + String(currentPlayerRolls[1]);
    allScores.push(Math.floor(playerScore));
    myOutputValue = `Player ${currentPlayer}, you have selected ${playerSelection} and your score is ${playerScore}. `;
    currentPlayerRolls = [];
    gameMode = gameModeDiceRoll;
    return myOutputValue;
  } else if (playerSelection == "2") {
    playerScore = String(currentPlayerRolls[1]) + String(currentPlayerRolls[0]);
    allScores.push(Math.floor(playerScore));
    myOutputValue = `Player ${currentPlayer}, you have selected ${playerSelection} and your score is ${playerScore}. `;
    currentPlayerRolls = [];
    gameMode = gameModeDiceRoll;
    return myOutputValue;
  } else {
    myOutputValue = `Your input was invalid, please enter either "1" to use ${currentPlayerRolls[0]} or "2" to use ${currentPlayerRolls[1]} as the first number of the dice score.`;
  }

  return myOutputValue;
};

var resetGameModeClearScores = function () {
  gameMode = gameModeDiceRoll;
  currentPlayer = 1;
  currentPlayerRolls = [];
  allScores = [];
};

var checkiInputValidation = function(input, gameMode){
  if (gameMode == "choose order" && input =="1"){
var validInput = input;
  return validInput;
}

var main = function (input) {
  var myOutputValue = "";

  if (currentPlayer == "1" && gameMode == "dice roll") {
    myOutputValue = getPlayerHand();
    gameMode = gameModeChooseOrder;
    return myOutputValue;
  }

  if (currentPlayer == "1" && gameMode == "player choice") {
    myOutputValue = choosePlayerScoreOrder(input);
    currentPlayer = 2;
    return (
      myOutputValue +
      "<br><br> It is now player 2's turn. Click submit to roll the dice, Player 2!"
    );
  }

  if (currentPlayer == "2" && gameMode == "dice roll") {
    myOutputValue = getPlayerHand();
    gameMode = gameModeChooseOrder;
    return myOutputValue + "";
  }

  if (currentPlayer == "2" && gameMode == "player choice") {
    myOutputValue = choosePlayerScoreOrder(input);
    gameMode = gameModeCompareScores;
    return myOutputValue + "<br><br> click submit to see who's won!";
  }

  if (currentPlayer == "2" && gameMode == "compare scores") {
    

    myOutputValue =
      "Player 1,  your score was " +
      allScores[0] +
      ".<br> Player 2, your score was " +
      allScores[1] +
      ".";

    if (allScores[0] > allScores[1]) {
      myOutputValue =
        myOutputValue + "<br> Player 1 wins!😎<br> Press submit to play again.";
    } else if (allScores[1] > allScores[0]) {
      myOutputValue =
        myOutputValue + "<br> Player 2 wins!😎<br> Press submit to play again.";
    } else if ((allScores[0] = allScores[1])) {
      myOutputValue =
        myOutputValue + "<br> 🙌It's a tie!🙌<br> Press submit to play again.";
    }
    resetGameModeClearScores();
    console.log(gameMode);
    console.log(currentPlayer);
    console.log(allScores);
    return myOutputValue;
  }

  return myOutputValue;
};
