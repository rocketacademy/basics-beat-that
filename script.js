//default player game mode
var gameMode = "roll dice";
var rollDice = "roll dice";
var chooseDiceOrder = "choose dice order";
var playerMode = "Player 1";

//array to store dice number rolled by player 1 & player 2
var player1Rolls = [];
var player2Rolls = [];

//create rolling dice function
var randomNumber = function () {
  var numberRolled = Math.floor(Math.random() * 6 + 1);
  console.log(`number rolled: ${numberRolled}`);
  return numberRolled;
};

//create rolling dice function for player 1
var rollDiceForPlayer1 = function () {
  var player1Dice1 = randomNumber();
  player1Rolls.push(player1Dice1);
  var player1Dice2 = randomNumber();
  player1Rolls.push(player1Dice2);
  myOutputValue = `You rolled ${player1Dice1} for Dice 1 and ${player1Dice2} for Dice 2.<br>Choose the order of the dice by typing "1" or "2".`;
};

//create function to keep track of player score
var playerScore = function (playerInput) {
  if (playerInput == 1) {
    var player1Number = Number(
      String(player1Rolls[0]) + String(player1Rolls[1])
    );
    console.log(player1Rolls[0]);
    console.log(player1Rolls[1]);
    return `Player 1, you chose Dice 1 first. <br>Your number is ${player1Number}. <br>It is now Player 2's turn.`;
  }
  if (playerInput == 2) {
    var player1Number = Number(
      String(player1Rolls[1]) + String(player1Rolls[0])
    );
    console.log(player1Rolls[1]);
    console.log(player1Rolls[0]);
    return `Player 1, you chose Dice 2 first. <br>Your number is ${player1Number}. <br>It is now Player 2's turn.`;
  }
  //input validation
  if (playerInput != 1 && playerInput !== 2) {
    return `Sorry, please enter either "1" or "2".`;
  }
};

var main = function (input) {
  console.log(`Current game mode: ${gameMode}`);
  var myOutputValue = "";
  if (gameMode == rollDice) {
    myOutputValue = rollDiceForPlayer1();
    //change game mode to ask user to select order of dice
    gameMode = "choose dice order";
    console.log(`Current game mode: choose dice order`);
    return myOutputValue;
  }
  if (gameMode == chooseDiceOrder) {
    //call player score function to display message
    myOutputValue = playerScore(input);
    return myOutputValue;
  }
  // if (input == 1) {
  // //player 1 roll dice
  // if (input == "start") {
  //   gameMode = "start";
  //   playerMode = "Player 1";
  // }
  // if (gameMode == "start") {
  //   var player1Dice1 = randomNumber();
  //   player1Rolls.push(player1Dice1);
  //   var player1Dice2 = randomNumber();
  //   player1Rolls.push(player1Dice2);
  //   myOutputValue = `You rolled ${player1Dice1} for Dice 1 and ${player1Dice2} for Dice 2.<br>Choose the order of the dice by typing "1" or "2".`;
  // }
  // //show dice results for option 1
  // var playerNumber = Number(
  //   String(player1Rolls[0]) + String(player1Rolls[1])
  // );
  // console.log(player1Rolls[0]);
  // console.log(player1Rolls[1]);
  // myOutputValue = `Player 1, you chose Dice 1 first. <br>Your number is ${playerNumber}. <br>It is now Player 2's turn. Enter "start" to begin Player 2's turn.`;
};
// //show dice results for option 2
// if (input == 2) {
//   var playerNumber = Number(
//     String(player1Rolls[1]) + String(player1Rolls[0])
//   );
//   console.log(player1Rolls[1]);
//   console.log(player1Rolls[0]);
//   myOutputValue = `Player 1, you chose Dice 2 first. <br>Your number is ${playerNumber}. <br>It is now Player 2's turn. Enter "start" to begin Player 2's turn.`;
//   var playerMode = "Player 2";
// }
// if ((playerMode = "Player 2")) {
//   var player2Dice1 = randomNumber();
//   player2Rolls.push(player2Dice1);
//   var player2Dice2 = randomNumber();
//   player2Rolls.push(player2Dice2);
//   myOutputValue = `You rolled ${player2Dice1} for Dice 1 and ${player2Dice2} for Dice 2.<br>Choose the order of the dice by typing "1" or "2".`;
// }
