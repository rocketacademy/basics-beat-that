// generate dice number
var rollDice = function () {
  var randomInteger = Math.floor(Math.random() * 6);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//common variable
var playerNumber = "";
var playerOneNumber = "";
var playerTwoNumber = "";
var playerOnePhaseOne = true;
var playerOnePhaseTwo = true;
var playerTwoPhaseOne = false;
var playerTwoPhaseTwo = false;
var diceOne = "";
var diceTwo = "";

var main = function (input) {
  //phase one of the game, rolling 2 dices
  if (playerOnePhaseOne == true || playerTwoPhaseOne == true) {
    diceOne = rollDice();
    diceTwo = rollDice();
    console.log(`player1 phase one: ${playerOnePhaseOne}`);
    console.log(diceOne);
    console.log(diceTwo);
    var initialMessageForPlayerOne = `Welcome Player 1!<br><br>You rolled ${diceOne} for Dice 1 and ${diceTwo} for Dice 2. Select the order of the dice.`;
    var initialMessageForPlayerTwo = `Welcome Player 2!<br><br>You rolled ${diceOne} for Dice 1 and ${diceTwo} for Dice 2. Select the order of the dice.`;
    if (playerOnePhaseOne == true) {
      playerOnePhaseOne = false;
      return initialMessageForPlayerOne;
    } else {
      playerTwoPhaseOne = false;
      playerTwoPhaseTwo = true;
      // console.log(playerTwoPhaseTwo);
      // console.log(playerTwoPhaseOne);
      // console.log(playerTwoPhaseOne);
      return initialMessageForPlayerTwo;
    }
  }
  //phase 2 of the game, choosing the order of the dice
  if (playerOnePhaseTwo == true || playerTwoPhaseTwo == true) {
    // input validation
    if (input == 1 || input == 2) {
      //condition if input is "1" or "2"
      if (input == 1) {
        playerNumber = diceOne.toString() + diceTwo.toString();
        var endMessageForPlayerOne = `Player 1, you chose Dice 1 first.<br><br>Your number is ${playerNumber}.<br><br>It is now Player 2's turn.`;
        var endMessageForPlayerTwo = `Player 2, you chose Dice 1 first.<br><br>Your number is ${playerNumber}.`;
      }
      if (input == 2) {
        playerNumber = diceTwo.toString() + diceOne.toString();
        var endMessageForPlayerOne = `Player 1, you chose Dice 2 first.<br><br>Your number is ${playerNumber}.<br><br>It is now Player 2's turn.`;
        var endMessageForPlayerTwo = `Player 2, you chose Dice 2 first.<br><br>Your number is ${playerNumber}.`;
      }

      // console.log(playerOnePhaseTwo);
      // console.log(playerNumber);
      if (playerOnePhaseTwo == true) {
        playerOnePhaseTwo = false;
        playerTwoPhaseOne = true;
        playerOneNumber = Number(playerNumber);
        // console.log(playerOnePhaseOne);
        return endMessageForPlayerOne;
      } else {
        playerTwoNumber = Number(playerNumber);
        playerTwoPhaseTwo = false;
        playerOnePhaseOne = true;
        playerOnePhaseTwo = true;
        // console.log(playerOnePhaseOne);
        if (playerOneNumber > playerTwoNumber) {
          return (
            endMessageForPlayerTwo +
            "<br><br>The winner is Player 1.<br><br>Press 'Submit' to play again"
          );
        } else {
          endMessageForPlayerTwo +
            "<br><br>The winner is Player 2.<br><br>Press 'Submit' to play again";
        }
      }
    } else {
      return `invalid input, please enter number "1" or "2"`;
    }
  }
};
