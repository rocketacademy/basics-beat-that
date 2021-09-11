// /There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

// game mode for player 1 - start
var mode1 = "Welcome, player 1"
var mode1A = "Player 1 roll dice";
// game mode for player 1 - pick dice
var mode1B = "Player 1 pick which dice to go first"
var mode1C = "Show player 1 score"

// game mode for player 2
var mode2A = "Time for player to roll 2 dice";
// game mode for player 2
var mode2B = "Player 2 pick which dice to go first";

// hold the players' scores
var playerOneScore = 0
var playerTwoScore = 0



currentGameMode = mode1;

 // roll dice function, return random number 1-6
  var rollDice = function () {
  var resultDice = Math.ceil(Math.random() * 6);
  return resultDice;}

var main = function (input) {

  if (currentGameMode == mode1) {
    currentGameMode = mode1A;
    console.log (currentGameMode)
    return "Welcome, player 1. Click submit to roll 2 dice.";
  }
 
  // start: player 1 clicks submit to roll 2 dice
  if (currentGameMode == mode1A) {
    var diceOne = rollDice();
    playerOneRollOne = diceOne;
    console.log ("Player 1 dice roll 1 is " + diceOne) 

    var diceTwo = rollDice();
    playerOneRollTwo = diceTwo;
    console.log ("Player 1 dice roll 2 is " + diceTwo) 

    currentGameMode = mode1B
    console.log (currentGameMode)
    return "Player 1: dice roll 1 is " + diceOne + " and dice roll 2 is " + diceTwo + ". <br><br> Enter 1 or 2 to select if dice 1 or 2 goes first.";
  }

  // player 1 picks roll 1 to go first
  if (currentGameMode = mode1C) {
    if (input == "1") {
      playerOneScore = (playerOneRollOne * 10) + playerOneRollTwo;
      console.log ("player 1 score is " + playerOneScore);
      currentGameMode = mode2A;
      console.log (currentGameMode)
      return "Player 1 score: " + playerOneScore + ". <br><br> Now it's player 2's turn. <br><br> Player 2, click submit to roll 2 dice."
    } 
  }

  // player 1 picks roll 2 to go first
  if (currentGameMode = mode1C) {
    if (input == "2") {
      playerOneScore = (playerOneRollTwo * 10) + playerOneRollOne;
      console.log ("player 1 score is " + playerOneScore);
      currentGameMode = mode2A;
      console.log (currentGameMode)
      return "Player 1 score: " + playerOneScore + ". <br><br> Now it's player 2's turn. <br><br> Player 2, click submit to roll 2 dice."
    } 

  // player 2 clicks submit to roll 2 dice
  if (currentGameMode == mode2A) {
    var diceOne = rollDice();
    playerTwoRollOne = diceOne;
    console.log ("Player 2 dice roll 1 is " + diceOne) 

    var diceTwo = rollDice();
    playerTwoRollTwo = diceTwo;
    console.log ("Player 2 dice roll 2 is " + diceTwo) 

    currentGameMode = mode2B
    console.log (currentGameMode)
    return "Player 2: dice roll 1 is " + diceOne + " and dice roll 2 is " + diceTwo + ". <br><br> Enter 1 or 2 to select if dice 1 or 2 goes first.";
  }

};
  

}