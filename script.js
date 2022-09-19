// requirement//
// There are 2 players and players take turns.

// (game mode : roll 2 dices) When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// (first message) Welcome Player 1. <br> You rolled 3 for Dice 1 and 6 for Dice 2. <br> Choose the order of the dice.

// (game mode : choose dice order) The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// (second message) Player 1, you chose Dice 2 first. <br> Your number is 63. <br> It is now Player 2's turn.

// (game mode : compare numbers and see who is winner) After both players have rolled and chosen dice order, the player with the higher combined number wins.

// ***steps
//1) player 1 rolls dice and return with the output of each dice roll result. + choose the dice order and place the combined number result
//2) change to player 2 and play same as 1
//3) compare player 1 result and player 2 result to compare and find out who is the winner
//4) go back to beginning to reset the game without refreshing the HTML

//global variables//
var gameModeDiceRoll = "Game Mode : Dice Roll";
var gameModeChooseDice = "Game Mode : Choose Dice";
var gameCurrentMode = gameModeDiceRoll;

var playerRoll = [];

//All functions here //
var rollDice = function () {
  console.log("check : random dice roll start!");
  // produce a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // remove the decimal
  var randomInteger = Math.floor(randomDecimal);
  // add 1 to get a number between 1 and 6 inclusive
  var diceNumber = randomInteger + 1;
  console.log("Dice rolled result : " + diceNumber);
  return diceNumber;
};

var rollDiceForPlayer = function () {
  console.log("time to roll dice for player");
  var counter = 0;
  while (counter < 2) {
    playerRoll.push(rollDice());
    counter += 1;
  }
  console.log("played 2 times for player's dice roll data : " + playerRoll);
  return (
    "Hello, <br><br> " +
    "You rolled <br>" +
    "Dice 1 : " +
    playerRoll[0] +
    "<br>" +
    "Dice 2 : " +
    playerRoll[1] +
    "<br><br>" +
    "Now, please choose which dice you want to place as your placement. Input 1 for dice 1. Input 2 for dice 2. "
  );
};

var getPlayerScore = function (input) {
  // input validation
  if (input != 1 && input != 2) {
    console.log(
      "User input neither 1 or 2, so time to show them the data invalidation"
    );
    return (
      "Wrong data input! <br>" +
      "Please input either 1 or 2. <br>" +
      "You have rolled Dice 1 was " +
      playerRoll[0] +
      " and Dice 2 was " +
      playerRoll[1]
    );
  }
  // input == 1
  if (input == 1) {
    console.log("input == 1st dice");
    var playerScore = Number(String(playerRoll[0]) + String(playerRoll[1]));

    return (
      "okay, you choose 1st dice to be placed first. <br>" +
      "Your result : " +
      playerScore
    );
  }

  // input == 2
  if (input == 2) {
    console.log("playerInput == 2nd dice");
    var playerScore = Number(String(playerRoll[1]) + String(playerRoll[0]));

    return (
      "okay, you choose 2nd dice to be placed first. <br>" +
      "Your result : " +
      playerScore
    );
  }
};

var main = function (input) {
  console.log("check / game mode : " + gameCurrentMode);
  var myOutputValue = "";

  if (gameCurrentMode == gameModeDiceRoll) {
    console.log("current status : game mode is at DICE ROLL");
    // let the player roll 2 times dice and display the message instruction
    myOutputValue = rollDiceForPlayer();
    //change game mode to choose dice
    gameCurrentMode = gameModeChooseDice;
    return myOutputValue;
  }

  if (gameCurrentMode == gameModeChooseDice) {
    console.log("current game mode change to : choose dice mode");
    myOutputValue = getPlayerScore(input);
  }
  return myOutputValue;
};
