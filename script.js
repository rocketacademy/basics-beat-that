// setting base
var numOfPlayers = 2;
var numOfDice = 2;
var currentPlayer = 1;
var playerOneScore;
var playerTwoScore;

//// game modes
// var GAME_MODE_DICE_ROLL = "game mode dice roll";
// var GAME_MODE_DICE_ORDER = "game mode dice order";

// var GAME_MODE_DICE_ROLL;
// var GAME_MODE_DICE_ORDER;

// current game mode
var gameMode = "dice roll";

// dice rolling
var diceRolls = [];
var diceOneRoll = Math.floor(Math.random() * 6 + 1);
var diceTwoRoll = Math.floor(Math.random() * 6 + 1);
var diceThreeRoll = Math.floor(Math.random() * 6 + 1);
var diceFourRoll = Math.floor(Math.random() * 6 + 1);
// var diceOne = [];
// var diceTwo = [];
// var getDiceRolls = function () {
//   Math.floor(Math.random() * 6 + 1);
// };
// var diceOneRoll = getDiceRolls();
// var diceTwoRoll = getDiceRolls();
// console.log(`first comp dice ${diceOneRoll}, second comp dice ${diceTwoRoll}`);
// main
var main = function (input) {
  var output = "";

  if (gameMode == "dice roll") {
    if (currentPlayer == 1) {
      console.log(`current player is ${currentPlayer}`);
      output = `Hi Player ${currentPlayer}!<br><br>Here are your dice rolls:
    <br>Dice 1: ${diceOneRoll}
    <br> Dice 2: ${diceTwoRoll}
    <br><br>Please select the order of the dice. Which dice will be your first order?`;
      gameMode = "dice order";
    } else if (currentPlayer == 2) {
      console.log(`current player is ${currentPlayer}`);
      output = `Hi Player ${currentPlayer}!<br><br>Here are your dice rolls:
    <br>Dice 1: ${diceThreeRoll}
    <br> Dice 2: ${diceFourRoll}
    <br><br>Please select the order of the dice. Which dice will be your first order?`;
      gameMode = "dice order";
    }
    return output;
  }

  if (gameMode == "dice order") {
    console.log(`current player is ${currentPlayer}`);
    if (currentPlayer == 1) {
      if (input == "1") {
        console.log(
          `first comp dice ${diceOneRoll}, second comp dice ${diceTwoRoll}`
        );
        output = `You chose ${diceOneRoll}${diceTwoRoll}. Now it's time for Player 2's turn!`;
        playerOneScore = `${diceOneRoll}${diceTwoRoll}`;
      } else if (input == "2") {
        output = `You chose ${diceTwoRoll}${diceOneRoll}. Now it's time for Player 2's turn!`;
        playerOneScore = `${diceTwoRoll}${diceOneRoll}`;
      } else if (input > 2 || isNaN(Number(input)) == true) {
        // to do validation
        output = `Sorry, we don't recognise that. Please input "1" or "2".`;
      }
      currentPlayer = 2;
      gameMode = "dice roll";
      return output;
    }

    if (currentPlayer == 2) {
      if (input == "1") {
        output = `You chose ${diceThreeRoll}${diceFourRoll}. Let's see who wins!`;
        playerTwoScore = `${diceThreeRoll}${diceFourRoll}`;
      } else if (input == "2") {
        output = `You chose ${diceFourRoll}${diceThreeRoll}. Let's see who wins!`;
        playerTwoScore = `${diceFourRoll}${diceThreeRoll}`;
      } else if (input > 2 || isNaN(Number(input)) == true) {
        // to do validation
        output = `Sorry, we don't recognise that. Please input "1" or "2".`;
      }
      gameMode = "compare results";
      return output;
    }
  }

  if (gameMode == "compare results") {
    if (playerOneScore > playerTwoScore) {
      output = `Player one wins!<br><br>The score is ${playerOneScore} - ${playerTwoScore}. Refresh the page to try again!`;
    } else if (playerTwoScore > playerOneScore) {
      output = `Player two wins!<br><br>The score is ${playerTwoScore} - ${playerOneScore}.<br><br>Refresh the page to try again!`;
    }
    return output;
  }
};
