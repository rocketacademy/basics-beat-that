// constants for game modes, number of players, and output strings
const ROLL_MODE = "roll";
const CHOOSE_MODE = "choose";
const NUM_PLAYERS = 2;

const CHOOSE_DICE_ORDER_MSG = `Choose the order of the dice.<br>Type 1 to put Dice 1 first, or type 2 to put Dice 2 first.`;

// state variables
var curGameMode = ROLL_MODE;
var diceRoll1 = 0;
var diceRoll2 = 0;
var curPlayer = 1;
var playerScores = [];

var getDiceNumber = function () {
  // generate random integer from 1 to 6
  return Math.ceil(Math.random() * 6);
};

var rollDice = function () {
  // roll two dice and set game mode to choose mode
  diceRoll1 = getDiceNumber();
  diceRoll2 = getDiceNumber();
  curGameMode = CHOOSE_MODE;

  // output msg to user informing them of roll outcomes and how to choose order
  return (
    `Welcome Player ${curPlayer}.<br>You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2.<br><br>` +
    CHOOSE_DICE_ORDER_MSG
  );
};

var getScore = function (firstDie) {
  // calculate score based on user's preference of which dice to use first
  return firstDie == 1
    ? diceRoll1 * 10 + diceRoll2
    : diceRoll2 * 10 + diceRoll1;
};

var resetGameState = function () {
  // helper function to reset game state when one game ends
  curGameMode = ROLL_MODE;
  curPlayer = 1;
  playerScores = [];
};

var generateEndGameOutput = function () {
  // upon each player having rolled dice and chose their order, output each player's number and the winner
  var output = "<br><br>";
  for (var j = 0; j < playerScores.length; j++) {
    output += `Player ${j + 1}'s number is ${playerScores[j]}.<br>`;
  }
  var winner = playerScores.indexOf(Math.max(...playerScores)) + 1;
  output += `The winner is Player ${winner}!`;
  resetGameState();
  return output;
};

var chooseDiceOrder = function (firstDie) {
  if (firstDie != 1 && firstDie != 2) {
    // invalid input, remind user of dice rolls and to only input 1 or 2
    return (
      `Invalid input. You rolled ${diceRoll1} for Dice 1 and ${diceRoll2} for Dice 2.<br><br>` +
      CHOOSE_DICE_ORDER_MSG
    );
  }

  // set game mode back to roll mode in preparation for next player
  // calculate score for cur player and add to playerScores array
  curGameMode = ROLL_MODE;
  var score = getScore(firstDie);
  playerScores.push(score);

  var output = `Player ${curPlayer}, you chose Dice ${firstDie} first.<br>Your number is ${score}.`;
  if (curPlayer < NUM_PLAYERS) {
    // if there are still more players
    curPlayer += 1;
    output += `<br>It is now Player ${curPlayer}'s turn.`;
  } else {
    // no more players, generate end of game output
    output += generateEndGameOutput();
  }
  return output;
};

var main = function (input) {
  if (curGameMode == ROLL_MODE) return rollDice();

  if (curGameMode == CHOOSE_MODE) return chooseDiceOrder(input);
};
