//2 players who take turns
//when player clicks submit, game roll 2 dice and show dice result

//global variables
var playerOneDiceRolls = [];
var playerTwoDiceRolls = [];
var gameMode = `player one`;
var userNamePlayerOne = ``;
var userNamePlayerTwo = ``;
var playerOneDiceRoll1 = ``;
var playerOneDiceRoll2 = ``;
var playerOneChosenOrder = ``;
var playerTwoDiceRoll1 = ``;
var playerTwoDiceRoll2 = ``;
var playerTwoChosenOrder = ``;
var myOutputValue = ``;
var numberOfGamesPlayed = 0;
var playerOneRunningScore = 0;
var playerTwoRunningScore = 0;

//dice roll
var diceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var randomDiceRoll = randomInteger + 1;
  return randomDiceRoll;
};

//input validation for username
var checkIfInputIsValid = function (input) {
  if (isNaN(Number(input))) {
    return true;
  }
  return false;
};

//input validation for order of dice
var checkIfOrderInputIsValid = function (input) {
  if (input == "left" || input == "right") {
    return true;
  }
  return false;
};

//check if game is a draw
var checkIfGameDraw = function (playerOneChosenOrder, playerTwoChosenOrder) {
  if (playerOneChosenOrder == playerTwoChosenOrder) {
    return true;
  }
  return false;
};

//beat that game
var main = function (input) {
  if (gameMode == `player one`) {
    //input validation for player one username
    var isUserNameInputValid = checkIfInputIsValid(input);
    if (!isUserNameInputValid) {
      return `Invalid input - please enter your name to play the game!`;
    }
    //following global variables are being reset to facilitate replaying of the game
    playerOneDiceRolls = [];
    playerTwoDiceRolls = [];
    userNamePlayerOne = ``;
    userNamePlayerTwo = ``;
    playerOneDiceRoll1 = ``;
    playerOneDiceRoll2 = ``;
    playerOneChosenOrder = ``;
    playerTwoDiceRoll1 = ``;
    playerTwoDiceRoll2 = ``;
    playerTwoChosenOrder = ``;

    //start the game - player one enters name and rolls the dice
    userNamePlayerOne = input;
    playerOneDiceRoll1 = diceRoll();
    playerOneDiceRoll2 = diceRoll();
    playerOneDiceRolls.push(playerOneDiceRoll1, playerOneDiceRoll2);
    myOutputValue = `🎲Hi ${userNamePlayerOne}, You have rolled dice ${playerOneDiceRolls}🎲 <br> Please indicate the order of dice by choosing "left" or "right" - the biggest number will win!`;
    gameMode = `player one deciding order`;
    return myOutputValue;
  }

  //player one deciding order of dice
  if (gameMode == `player one deciding order`) {
    //checking if deciding order input is valid
    var isDiceOrderInputValid = checkIfOrderInputIsValid(input);
    if (!isDiceOrderInputValid) {
      return `Invalid input - please enter either 'left' or 'right!`;
    } else {
      var playerOneChoice = input;
    }
    gameMode = `player two`;
    if (playerOneChoice == "left") {
      playerOneChosenOrder = `${playerOneDiceRoll1}${playerOneDiceRoll2}`;
    }
    if (playerOneChoice == "right") {
      playerOneChosenOrder = `${playerOneDiceRoll2}${playerOneDiceRoll1}`;
    }
    myOutputValue = `${userNamePlayerOne}, you have chosen **. <br> (shhh🤫...keep it a secret! - Player 2 will now play the game!)`;
    return myOutputValue;
  }

  //player two enters name and rolls the dice
  if (gameMode == `player two`) {
    numberOfGamesPlayed = numberOfGamesPlayed + 1;

    //input validation for player two username
    var isUserNameInputValid = checkIfInputIsValid(input);
    if (!isUserNameInputValid) {
      return `Invalid input - please enter your name to play the game!`;
    }
    userNamePlayerTwo = input;
    playerTwoDiceRoll1 = diceRoll();
    playerTwoDiceRoll2 = diceRoll();
    playerTwoDiceRolls.push(playerTwoDiceRoll1, playerTwoDiceRoll2);
    myOutputValue = `🎲Hi ${userNamePlayerTwo}, You have rolled dice ${playerTwoDiceRolls}🎲<br> Please indicate the order of dice by choosing "left" or "right" - the biggest number will win!`;
    gameMode = `player two deciding order`;
    return myOutputValue;
  }

  //player two deciding order of dice
  if (gameMode == `player two deciding order`) {
    var isDiceOrderInputValid = checkIfOrderInputIsValid(input);
    if (!isDiceOrderInputValid) {
      return `Invalid input - please enter either 'left' or 'right!`;
    } else {
      var playerTwoChoice = input;
    }
    gameMode = `deciding winner`;
    if (playerTwoChoice == "left") {
      playerTwoChosenOrder = `${playerTwoDiceRoll1}${playerTwoDiceRoll2}`;
    }
    if (playerTwoChoice == "right") {
      playerTwoChosenOrder = `${playerTwoDiceRoll2}${playerTwoDiceRoll1}`;
    }
    myOutputValue = `${userNamePlayerTwo}, you have chosen ${playerTwoChosenOrder} - and the winner is...*drumrolls* 🙌 <br>Click the 'Submit' button to find out!`;
    return myOutputValue;
  }

  //showing who is the winner
  if (gameMode == `deciding winner`) {
    playerOneRunningScore =
      playerOneRunningScore + Number(playerOneChosenOrder);
    playerTwoRunningScore =
      playerTwoRunningScore + Number(playerTwoChosenOrder);

    gameMode = "player one";

    //general scoreboard statement
    var scoreboardStatement = `<br><u>Current Scoreboard</u><br>Total Number of Games Played: ${numberOfGamesPlayed}<br>${userNamePlayerOne}'s Dice Roll Score: ${playerOneRunningScore} <br> ${userNamePlayerTwo}'s Dice Roll Score: ${playerTwoRunningScore}`;

    //generating leaderboard order
    var orderOfLeaderboard = function (
      playerOneRunningScore,
      playerTwoRunningScore
    ) {
      var leaderboardStatement = ``;
      if (playerOneRunningScore > playerTwoRunningScore) {
        leaderboardStatement = `<br><u>Leaderboard</u><br>1. ${userNamePlayerOne}<br>2. ${userNamePlayerTwo}`;
      }
      if (playerOneRunningScore < playerTwoRunningScore) {
        leaderboardStatement = `<br><u>Leaderboard</u><br>1. ${userNamePlayerTwo}<br>2. ${userNamePlayerOne}`;
      }
      if (playerOneRunningScore == playerTwoRunningScore) {
        leaderboardStatement = `<br><u>Leaderboard</u><br>Competition is tight - there is currently no clear winner!<br>${userNamePlayerTwo}:${playerTwoRunningScore}<br>${userNamePlayerOne}:${playerOneRunningScore}`;
      }
      return leaderboardStatement;
    };
    var showLeaderboard = orderOfLeaderboard(
      playerOneRunningScore,
      playerTwoRunningScore
    );

    //checking if game is a draw
    var isGameADraw = checkIfGameDraw(
      playerOneChosenOrder,
      playerTwoChosenOrder
    );

    //output if game is a draw
    if (isGameADraw) {
      return `${userNamePlayerOne} has chosen ${playerOneChosenOrder} while ${userNamePlayerTwo} has chosen ${playerTwoChosenOrder}. <br>It's a draw!🤣<br> Let's play the game again!<br>${scoreboardStatement}<br>${showLeaderboard}`;
    }

    //otherwise checking which player won
    if (Number(playerOneChosenOrder) > Number(playerTwoChosenOrder)) {
      return `${userNamePlayerOne} has chosen ${playerOneChosenOrder} while ${userNamePlayerTwo} has chosen ${playerTwoChosenOrder}. <br>${userNamePlayerOne}, you have won!🎉✨<br> Let's play the game again!<br>${scoreboardStatement}<br>${showLeaderboard}`;
    } else {
      return `${userNamePlayerTwo} has chosen ${playerTwoChosenOrder} while ${userNamePlayerOne} has chosen ${playerOneChosenOrder}. <br>${userNamePlayerTwo}, you have won!🎉✨<br> Let's play the game again!<br>${scoreboardStatement}<br>${showLeaderboard}`;
    }
  }
};
