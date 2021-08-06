//set global variables and modes
//set number of players, dice rolls and choices
var diceRoll1 = [];
var diceRoll2 = [];
var player1Choice = [];
var player2Choice = [];

//mode to start the game
var gameMode = "start_the_game";

//mode to pick the dice order
var gameModeOrder = "pick_dice_order";

//Player1 to start the game each time
var currentPlayer = 1;

//generate a random number between 1 and 6
var genDiceRoll = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.ceil(randomDecimal);
  return randomInteger;
};

var main = function (input) {
  var myOutputValue = "";
  if (gameMode == "start_the_game") {
    diceRoll1 = genDiceRoll();
    diceRoll2 = genDiceRoll();
    myOutputValue = `Player 1, your Dice 1 is ${diceRoll1} and <br> Dice 2 🎲is ${diceRoll2}. <br><br> Please indicate either '1' or '2' to choose the order of your dice.<br><br> User with the highest number will win. Good luck!`;
    gameMode = "pick_dice_order";
    return myOutputValue;
  }
  if (gameModeOrder == "pick_dice_order") {
    if (currentPlayer == 1) {
      if (input == "1") {
        player1Choice = `${diceRoll1}${diceRoll2}`;
        console.log("player1Choice");
        myOutputValue = `You have chosen Dice 1 and your number is ${diceRoll1}${diceRoll2}.`;
      }
    } else if (input == "2") {
      myOutputValue = `You have chosen Dice 2 and your number is ${diceRoll2}${diceRoll1}.`;
    }
    gameMode = "start_the_game";
    currentPlayer = 2;
  } else if (currentPlayer == 2) {
    if (input == "1") {
      player2Choice = `${diceRoll1}${diceRoll2}`;
      console.log("player2Choice");
      myOutputValue = `You have chosen Dice 1 and your number is ${diceRoll1}${diceRoll2}.`;
    } else if (input == "2") {
      myOutputValue = `You have chosen Dice 2 and your number is ${diceRoll2}${diceRoll1}.`;
    }
    gameMode = "determineWinner";
  }
  return myOutputValue;
};
if (gameMode == "start_the_game") {
  rollDice1 = randomDigit();
  rollDice2 = randomDigit();
  myOutputValue = `Player 2, your Dice 1 is ${rrollDice1} and Dice 2 is ${rollDice2}. <br><br> Please indicate either '1' or '2' to choose the order of your dice.<br><br> User with the highest number will win. Good luck!`;
  gameMode = "pick_dice_order";
  return myOutputValue;
}
if (gameMode == "determineWinner") {
  if (player1Choice > player2Choice) {
    myOutputValue = `Player 1, your score is ${player1Choice} and <br><br>Player 2, your score is ${player2Choice}. <br><br> Player 1, you win! Woot`;
  } else if (player1Choice < player2Choice) {
    myOutputValue = `Player 1, your score is ${player1Choice} and Player 2, your score is ${player2Choice}. <br><br>Player 2, you win! Yay`;
  }
  return myOutputValue;
}
