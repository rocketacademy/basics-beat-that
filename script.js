// global variables
var diceNumbers = [];
var playerNum = "1";
var gameMode = "";
var gameStage = "";
var player1FinalNumber = "";
var player2FinalNumber = "";
var player1Score = 0;
var player2Score = 0;

var main = function (input) {
  // user selects game mode: highest or lowest
  if (gameMode == "") {
    myOutputValue = gameModeSelection(input);
    return myOutputValue;
  } else {
    if (gameStage == "") {
      // roll the dice for player
      var myOutputValue = gameStart();
      // change the gamestage to choosing the dice order
      gameStage = "choiceOfDice";
      return myOutputValue;
    } else if (gameStage == "choiceOfDice") {
      // check input validation
      if (input != 1 && input != 2) {
        return (
          "You rolled " +
          diceNumbers[0] +
          " for Dice 1 and " +
          diceNumbers[1] +
          " for Dice 2. Please key in only the number 1 or 2 for the chosen dice number to go first."
        );
        // if player 1 is playing, assign choice of dice number to player 1
      } else if (playerNum == "1") {
        player1FinalNumber = choiceOfDice(input);
        myOutputValue = `Player ${playerNum}, you chose Dice
        ${input} first. Your number is ${player1FinalNumber}. It is now Player 2's turn. <br> <br> Please click the submit button to roll the dice for Player 2.`;

        // return variables to default value for player 2
        diceNumbers = [];
        playerNum = "2";
        gameStage = "";
        return myOutputValue;
        // if player 2 is playing, assign choice of dice number to player 2
      } else {
        player2FinalNumber = choiceOfDice(input);
        myOutputValue = `Player ${playerNum}, you chose Dice
        ${input} first. Your number is ${player2FinalNumber}. <br> <br> Please click submit again to check the scores.`;
        // return variables to default value and change gamestage to choose winner
        diceNumbers = [];
        // switch back to player 1
        playerNum = "1";
        gameStage = "winner check";
        return myOutputValue;
      }
    } else {
      myOutputValue = winnerCheck(player1FinalNumber, player2FinalNumber);
      gameStage = "";
      return myOutputValue;
    }
  }
};

var gameModeSelection = function (input) {
  if (input.toLowerCase() == "highest" || input.toLowerCase() == "lowest") {
    gameMode = input.toLowerCase();
    return `You have selected ${gameMode}. Please press submit to roll the dice for Player 1.`;
  } else {
    return "Please kindly select a game mode by keying in highest or lowest.";
  }
};

// Reuse dice roll function to churn out two numbers
var gameStart = function () {
  for (var counter = 0; counter < 2; counter += 1) {
    diceNumbers.push(rollDice());
    console.log(diceNumbers);
  }
  var message =
    "Welcome Player " +
    playerNum +
    ". <br> You rolled " +
    diceNumbers[0] +
    " for Dice 1 and " +
    diceNumbers[1] +
    " for Dice 2. <br> Choose the order of the dice. ";
  return message;
};

// refactored function for arrangement for digits
var choiceOfDice = function (input) {
  if (input == 1) {
    var playerFinalNumber = `${diceNumbers[0]}` + `${diceNumbers[1]}`;
    return playerFinalNumber;
  } else {
    playerFinalNumber = `${diceNumbers[1]}` + `${diceNumbers[0]}`;
    return playerFinalNumber;
  }
};

// check for the winner & output the scores
var winnerCheck = function () {
  var leaderBoard = "";
  var message = "";
  console.log(gameMode);
  // if draw, then return draw; shared condition between lowest & highest mode
  if (player1FinalNumber == player2FinalNumber) {
    message = `It's a draw!`;
  } else if (gameMode == "highest") {
    // if gamemode is higher, higher number wins
    if (player1FinalNumber > player2FinalNumber) {
      player1Score = player1Score + 1;
      message = `Player 1 wins!`;
    } else {
      player2Score = player2Score + 1;
      message = `Player 2 wins!`;
    }
  } else {
    // if gamemode is lower, higher number wins
    if (player1FinalNumber < player2FinalNumber) {
      player1Score = player1Score + 1;
      message = `Player 1 wins!`;
    } else {
      player2Score = player2Score + 1;
      message = `Player 2 wins!`;
    }
  }
  // return leaderboard in decreasing scores
  if (player1Score > player2Score) {
    leaderBoard = `Player 1: ${player1Score} <br> Player 2: ${player2Score}`;
  } else {
    leaderBoard = `Player 2: ${player2Score} <br> Player 1: ${player1Score}`;
  }
  return `${message} <br> Player 1's number is ${player1FinalNumber} and player 2's number is ${player2FinalNumber} <br> ${leaderBoard} <br> It is now player 1's turn. To play again, simply press the submit button.`;
};

// generate random dice rolls
var rollDice = function () {
  var randomInteger = Math.random() * 6;
  var rollDiceNum = Math.floor(randomInteger);
  var finalNum = rollDiceNum + 1;
  return finalNum;
};
