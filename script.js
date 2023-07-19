/* How to play the game.

1. 2 players game. Players take turn.
2. Player clicks submit, the game roll 2 dice and shows the dice roll - 3 and 6.
3. Player picks the order of the dice they want to form the biggest number. Eg. make number 63. Dice 2 number appears first.
4. After both players have rolled and chose dice order, the player with the higher number wins.

Ideas on how to solve
1. Rolls 2 dice and return the output for player 1.
2. Player 1 chooses the dice order and forms the number. Get correct return output value. 
3. Add in player 2
4. Implement comparing dice scores and declare winner
5. Reset the game so that the players can play again without refreshing the browser page.
*/

//Create Game State: 1. Roll 2 dice. and 2. Choose Dice Order
// Create Game Modes: 1. Roll 2 dice and 2. Choose Dice Order

var GAME_MODE_ROLL_DICE = 'Roll 2 dices.';
var GAME_MODE_CHOOSE_DICE_ORDER = 'Choose dice order.';
var currentGameMode = GAME_MODE_ROLL_DICE;

// Helper Function - Roll Dice
var rollDice = function () {
  var randomInteger = Math.floor(Math.random() * 6);
  var randomDiceNumber = randomInteger + 1;
  // Convert number to string.
  var convertRandomDiceNumberToString = randomDiceNumber.toString();
  return convertRandomDiceNumberToString;
};

// Store dice values
var playerRolls = [];

// Helper Function - Roll 2 dices
var rollTwoDices = function () {
  playerRolls = []; // Clear previous dice rolls
  var counter = 0;
  var chooseOrderText = 'Please choose the order of the dice by entering 1 or 2.';
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter += 1;
  }
  return (
    'Hi. Your rolls are Dice 1: ' +
    playerRolls[0] +
    ' and Dice 2: ' +
    playerRolls[1] +
    '.' +
    '<br><br>' +
    chooseOrderText
  );
};

// Check Game Mode. Start Game with Dice Roll.
var main = function (input) {
  var outputGameMessage = '';

  if (currentGameMode === GAME_MODE_ROLL_DICE) {
    currentGameMode = GAME_MODE_CHOOSE_DICE_ORDER;
    return (outputGameMessage = rollTwoDices());
  }

  if (currentGameMode === GAME_MODE_CHOOSE_DICE_ORDER) {
    if (input !== '1' && input !== '2') {
      return 'There is a minor <i>glitch</i> here. Please enter either 1 or 2.';
    }

    var showPlayerNumber;
    if (input === '1') {
      showPlayerNumber = Number(playerRolls[0] + playerRolls[1]);
    } else if (input === '2') {
      showPlayerNumber = Number(playerRolls[1] + playerRolls[0]);
    }

    return 'Your number is: ' + showPlayerNumber + '.<br><br>Type anything to play again.';
  }

};
