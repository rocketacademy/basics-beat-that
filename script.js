//default player game mode
var mode = "waiting";

//create random number
var randomNumber = function () {
  var numberRolled = Math.floor(Math.random() * 6 + 1);
  return numberRolled;
};

//array to store dice number rolled by player
var playerRolls = [];

var main = function (input) {
  var myOutputValue = "";
  if (input == "") {
    myOutputValue = `Welcome! Please enter "Player 1" or "Player 2" to begin.`;
  }
  //switch to player 1
  if (input == "Player 1") {
    myOutputValue = `Welcome Player 1! <br>To roll the dice, please enter "start". <br> To switch players, please enter "Player 2".`;
  }
  //switch to player 2
  if (input == "Player 2") {
    myOutputValue = `Welcome Player 2! <br>To roll the dice, please enter "start". <br> To switch players, please enter "Player 1".`;
  }
  if (input == "start") {
    mode = "start";
    var dice1 = randomNumber();
    playerRolls.push(dice1);
    var dice2 = randomNumber();
    playerRolls.push(dice2);
    myOutputValue = `You rolled ${dice1} for Dice 1 and ${dice2} for Dice 2.<br>Choose the order of the dice by typing "1" or "2".`;
  }
  if (input == 1) {
    var playerNumber = Number(String(playerRolls[0]) + String(playerRolls[1]));
    console.log(playerRolls[0]);
    console.log(playerRolls[1]);
    myOutputValue = `Player 1, you chose Dice 1 first. <br>Your number is ${playerNumber}. <br>It is now Player 2's turn.`;
  }
  if (input == 2) {
    var playerNumber = Number(String(playerRolls[1]) + String(playerRolls[0]));
    console.log(playerRolls[1]);
    console.log(playerRolls[0]);
    myOutputValue = `Player 1, you chose Dice 2 first. <br>Your number is ${playerNumber}. <br>It is now Player 2's turn.`;
  }
  return myOutputValue;
};

//You should get the random number outside of the guessing function and add it through a parameter.
