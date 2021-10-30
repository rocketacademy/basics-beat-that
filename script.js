// BEAT THAT
// Game mode (mode 1. play dice rolls) (mode 2. decide the dice order) (mode 3. decide the winner)
// there are two players, two dices

// global variables
// randomly selected dice for each players
var player1Dice1 = "";
var player1Dice2 = "";
var player2Dice1 = "";
var player2Dice2 = "";

// the numbers that decided by players
var player1Num = "";
var player2Num = "";

//player score
var player1Score = [];
var player2Score = [];

// game mode starts with player 1
var gameMode = "player 1";

// To get random number from dice and cover it to string
var diceRoll = function () {
  var randomNum = Math.floor(Math.random() * 6 + 1);
  return randomNum.toString();
};

//Player 1 plays diceRoll
var Player1DiceRoll = function () {
  player1Dice1 = diceRoll();
  player1Dice2 = diceRoll();
  gameMode = "player 1 position";
  return `Hello Player 1 <br><br> You rolled ( ${player1Dice1} ) for 🎲 one and ( ${player1Dice2} ) for 🎲 two. <br><br> Please choose the order of your dice 🎲 by entering 1 or 2. `;
};

//Player 1 choose dice number order
var player1Choice = function (input) {
  if (input == 1 || input == 2) {
    player1Num = combineDiceRolls(input);
    player1Score.push(player1Num);
    gameMode = "player 2";
    return `Player 1<br><br> Your chosen number is ( ${player1Num} ). <br><br> It is now Player 2's turn. <br><br> Please click 'Submit' to roll the dice `;
  } else {
    return verifyInput(input);
  }
};

//Player 2 plays diceRoll
var Player2DiceRoll = function () {
  player2Dice1 = diceRoll();
  player2Dice2 = diceRoll();
  gameMode = "player 2 position";
  return `Hello Player 2 <br><br> You rolled ( ${player2Dice1} ) for 🎲 one and ( ${player2Dice2} ) for 🎲 two. <br><br> Please choose the order of your dice 🎲 by entering 1 or 2. `;
};

//Player 2 choose dice number order
var player2Choice = function (input) {
  if (input == 1 || input == 2) {
    player2Num = combineDiceRolls(input);
    player2Score.push(player2Num);
    gameMode = "score time";
    return `Player 2<br><br> Your chosen number is ( ${player2Num} ). <br><br> Do you want to know who's the winner?! 🍾  please click 'Submit'`;
  } else {
    return verifyInput(input);
  }
};

//Verify if input is a valid number
var verifyInput = function (input) {
  if (input != 1 || input != 2) {
    return "Please enter 1 or 2 to position your dice roll 🎲";
  }
};

//combine the dice rolls, input 1 (order in 1+2 ) input 2 (order in 2 + 1)
var combineDiceRolls = function (input) {
  if (input == 1 && gameMode == "player 1 position") {
    return player1Dice1 + player1Dice2;
  } else if (input == 1 && gameMode == "player 2 position") {
    return player2Dice1 + player2Dice2;
  } else if (input == 2 && gameMode == "player 1 position") {
    return player1Dice2 + player1Dice1;
  } else if (input == 2 && gameMode == "player 2 position") {
    return player2Dice2 + player2Dice1;
  }
};

// player scoring

var finalScore = function () {
  if (player1Score > player2Score) {
    return `Player 1 wins 🏅 with ${
      player1Score[player1Score.length - 1]
    } and Player 2 loses with ${player2Score[player2Score.length - 1]}`;
  } else if (player1Score < player2Score) {
    return `Player 1 losses with ${
      player1Score[player1Score.length - 1]
    } and Player 2 wins 🏅 with ${player2Score[player2Score.length - 1]}`;
  } else if (player1Score == player2Score) {
    return `It is a draw as Player 1 number is ${
      player1Score[player1Score.length - 1]
    } and Player 2 number is also ${player2Score[player2Score.length - 1]}`;
  }
};

// play continues
var playAgain = function () {
  gameMode = "player 1";
};

// MAIN FUNCTION
var main = function (input) {
  //player 1 rolls dice
  if (gameMode == "player 1") {
    myOutputValue = Player1DiceRoll();
    console.log(`Player 1 dice roll is ${player1Dice1} and ${player1Dice2}`);
    //player 1 choose dice position
  } else if (gameMode == "player 1 position") {
    myOutputValue = player1Choice(input);
    console.log(`Player 1 number is ${player1Num}`);
    // player 2 roll dice
  } else if (gameMode == "player 2") {
    myOutputValue = Player2DiceRoll();
    console.log(`Player 2 dice roll is ${player2Dice1} and ${player2Dice2}`);
    // player 2 choose dice position
  } else if (gameMode == "player 2 position") {
    myOutputValue = player2Choice(input);
    console.log(`player 2 number is ${player2Num}`);
    //who has the bigger number
  } else if (gameMode == "score time") {
    myOutputValue = `${finalScore()} <br><br> Press submit to play again!`;
    console.log(
      `player 1 score in array is ${player1Score} and player 2 is ${player2Score}`
    );

    //continue playing
    playAgain();
  }
  return myOutputValue;
};
