//global variables
var currentGameMode = "player one rolls";
var playerOneFirst = 0;
var playerOneSecond = 0;
var playerTwoFirst = 0;
var playerTwoSecond = 0;
var playerOneFinal = 0;
var playerTwoFinal = 0;
var playerOneWinCounter = 0;
var playerTwoWinCounter = 0;

// function to roll a random number
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;

  return diceNumber;
};

//gameplay of rolling 2 dices

var rollByPlayers = function () {
  var playerOneRolls = [];
  var playerTwoRolls = [];
  var myOutputValue = ``;
  var newDiceRolls = [rollDice(), rollDice()];
  if (currentGameMode == "player one rolls") {
    playerOneRolls = newDiceRolls;
    playerOneFirst = playerOneRolls[0];
    playerOneSecond = playerOneRolls[1];
    currentGameMode = "player one choose order";
    myOutputValue = `🎲<b> WELCOME PLAYER 1 </b>🎲 <br> You rolled ${playerOneFirst} for dice one and ${playerOneSecond} for dice two. <br> Choose the order of the dice by entering "1" or "2".`;
    return myOutputValue;
  } else if (currentGameMode == "player two rolls") {
    playerTwoRolls = newDiceRolls;
    playerTwoFirst = playerTwoRolls[0];
    playerTwoSecond = playerTwoRolls[1];
    currentGameMode = "player two choose order";
    myOutputValue = `🎲<b> WELCOME PLAYER 2 </b>🎲 <br> You rolled ${playerTwoFirst} for dice one and ${playerTwoSecond} for dice two. <br> Choose the order of the dice by entering "1" or "2".`;
    return myOutputValue;
  }
};

// choosing order for 2 players
var chooseOrder = function (input) {
  if (currentGameMode == "player one choose order" && input == 1) {
    playerOneFinal = Number(String(playerOneFirst) + String(playerOneSecond));
    currentGameMode = "player two rolls";
    return `🎲<b> Player 1</b>🎲 <br> Your final number is ${playerOneFinal}. Player 2, please click on the 'Submit' button above to proceed.`;
  } else if (currentGameMode == "player one choose order" && input == 2) {
    playerOneFinal = Number(String(playerOneSecond) + String(playerOneFirst));
    currentGameMode = "player two rolls";
    return `🎲<b> Player 1</b>🎲 <br> Your final number is ${playerOneFinal}. Player 2, please click on the 'Submit' button above to proceed.`;
  } else if (currentGameMode == "player two choose order" && input == 1) {
    playerTwoFinal = Number(String(playerTwoFirst) + String(playerTwoSecond));
    currentGameMode = "final results";
    return `🎲<b> Player 2</b>🎲 <br> Your final number is ${playerTwoFinal}. Click on the 'Submit' button above for the results.`;
  } else if (currentGameMode == "player two choose order" && input == 2) {
    playerTwoFinal = Number(String(playerTwoSecond) + String(playerTwoFirst));
    currentGameMode = "final results";
    return `🎲<b> Player 2</b>🎲 <br> Your final number is ${playerTwoFinal}. Click on the 'Submit' button above for the results.`;
  }
};

//win or lose

var whoWon = function () {
  if (playerOneFinal > playerTwoFinal) {
    playerOneWinCounter += 1;
    myOutputValue = `<b>Player 1 has won! </b><br><br> Player 1 final number: ${playerOneFinal}<br> Player 2 final number: ${playerTwoFinal}<br><br> <b>Scores:</b> <br> Player 1: ${playerOneWinCounter}<br>Player 2: ${playerTwoWinCounter}<br><br>Click 'Submit' to play again.`;
  } else if (playerOneFinal < playerTwoFinal) {
    playerTwoWinCounter += 1;
    myOutputValue = `<b>Player 2 has won! </b><br><br> Player 1 final number: ${playerOneFinal}<br> Player 2 final number: ${playerTwoFinal}<br><br> <b>Scores:</b> <br> Player 1: ${playerOneWinCounter}<br>Player 2: ${playerTwoWinCounter}<br><br>Click 'Submit' to play again.`;
  } else {
    myOutputValue = `<b>The 2 players have tied!</b><br><br> Player 1 final number: ${playerOneFinal}<br> Player 2 final number: ${playerTwoFinal}<br><br> <b>Scores:</b> <br> Player 1: ${playerOneWinCounter}<br>Player 2: ${playerTwoWinCounter}<br><br>Click 'Submit' to play again.`;
  }
  return myOutputValue;
};

var main = function (input) {
  var myOutputValue = ``;
  if (
    currentGameMode == "player one rolls" ||
    currentGameMode == "player two rolls"
  ) {
    myOutputValue = rollByPlayers();
    return myOutputValue;
  } else if (
    currentGameMode == "player one choose order" ||
    currentGameMode == "player two choose order"
  ) {
    if (input == 1 || input == 2) {
      myOutputValue = chooseOrder(input);
    } else
      myOutputValue = `You have entered an invalid input. Please enter '1' or '2'.`;
    return myOutputValue;
  } else if ((currentGameMode = "final results")) {
    myOutputValue = whoWon();
    currentGameMode = "player one rolls";
    return myOutputValue;
  }
};
