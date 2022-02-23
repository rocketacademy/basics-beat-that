// Base
// Requirements
// There are 2 players and players take turns.
// When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
// The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
// After both players have rolled and chosen dice order, the player with the higher combined number wins.

var gameMode = "dice roll";
var playerScores = [];
var playerRolls = [];
var myOutputValue = "";
var playerTurn = 1;

// create function that rolls a random dice number
var rollDice = function () {
  // produces a decimal between 0 and 6
  var randomDecimal = Math.random() * 6;
  // take off the decimal
  var randomInteger = Math.floor(randomDecimal);
  // it's a number from 0 - 5 ... add 1
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

// create function that rolls 2 dice for player, stores these numbers in an array and returns a message informing player of the 2 dice numbers
var playerRoll = function () {
  playerRolls.push(rollDice());
  playerRolls.push(rollDice());
  myOutputValue = `Welcome Player ${playerTurn}. <br> Dice 1: ${playerRolls[0]} <br> Dice 2: ${playerRolls[1]} <br> Please choose the order of the dice.`;
  return myOutputValue;
};

var main = function (input) {
  while (playerTurn < 3) {
    // if gameMode == dice roll, call playerRoll function to roll dice
    if (gameMode == "dice roll") {
      myOutputValue = playerRoll();
      gameMode = "choose order";
      return myOutputValue;
    }
    // game asks player to pick order of dice
    if (gameMode == "choose order") {
      if (input !== "1" && input !== "2") {
        return `Please choose an order. <br> Dice 1: ${playerRolls[0]} <br> Dice 2: ${playerRolls[1]}`;
      } else if (input == "1") {
        // if player chooses order 1, concatenate in order dice 1 + dice 2
        // game stores score in playerScores array
        // change player scores to numbers before storing so that you can compare it later
        playerScores.push(
          Number(playerRolls[0].toString() + playerRolls[1].toString())
        );
        myOutputValue = `Player ${playerTurn}, you chose Dice 1 first. Your number is ${
          playerScores[playerTurn - 1]
        }. It is now Player ${playerTurn + 1}'s turn.`;
        gameMode = "dice roll";
        // reset playerRolls
        playerRolls = [];
        playerTurn += 1;
      } else if (input == "2") {
        playerScores.push(
          Number(playerRolls[1].toString() + playerRolls[0].toString())
        );
        myOutputValue = `Player ${playerTurn}, you chose Dice 2 first. Your number is ${
          playerScores[playerTurn - 1]
        }. It is now Player ${playerTurn + 1}'s turn.`;
        gameMode = "dice roll";
        // reset playerRolls
        playerRolls = [];
        playerTurn += 1;
      }
    }
  }

  // if playerOneScore > playerTwoScore, return player one wins
  if (playerScores[0] > playerScores[1]) {
    myOutputValue = `Player 1 scored ${playerScores[0]}. <br> Player 2 scored ${playerScores[1]}. <br> Player 1 wins!`;
  }
  // if playerOneScore < playerTwoScore, return player two wins
  if (playerScores[0] < playerScores[1]) {
    myOutputValue = `Player 1 scored ${playerScores[0]}. <br> Player 2 scored ${playerScores[1]}. <br> Player 2 wins!`;
  }
  if (playerScores[0] == playerScores[1]) {
    myOutputValue = `Player 1 scored ${playerScores[0]}. <br> Player 2 scored ${playerScores[1]}. <br> Player 2 wins!`;
  }
  return myOutputValue;
};

// what if it's a tie?
