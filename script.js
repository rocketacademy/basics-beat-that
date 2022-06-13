var main = function (input) {
  console.log(`check game mode when clicking submit, ${gameMode}`);
  var myOutputMessage = "";

  if (gameMode == GAME_MODE_PLAYER_ROLL_DICE) {
    console.log(`game mode is at roll dice`);

    myOutputMessage = rollingDice();
    gameMode = GAME_MODE_PLAYER_CHOOSE_COMBINATION;
  } else if (gameMode == GAME_MODE_PLAYER_CHOOSE_COMBINATION) {
    console.log(`game mode is at choosing dice combination`);

    myOutputMessage = playerCombination(input);
  }

  return myOutputMessage;
};

// var currentPlayer = 1;
var arrRollDice = [];
var player1Combination = 0;

var GAME_MODE_PLAYER_ROLL_DICE = "GAME_MODE_PLAYER_ROLL_DICE";
var GAME_MODE_PLAYER_CHOOSE_COMBINATION = "GAME_MODE_PLAYER_CHOOSE_COMBINATION";

var gameMode = GAME_MODE_PLAYER_ROLL_DICE;

var diceRoll = function () {
  var randomNum = Math.floor(Math.random() * 6) + 1;
  console.log(`roll dice function: ${randomNum}`);
  return randomNum;
};

var rollingDice = function () {
  var counter = 0;

  while (counter < 2) {
    console.log(`game mode player rolled dice`);
    arrRollDice.push(diceRoll().toString());

    counter += 1;
  }
  return `your dice roll are ${arrRollDice[0]} and ${arrRollDice[1]}. please choose combination "1" or "2" for order of dice number.`;
};

var playerCombination = function (playerInput) {
  if (playerInput != 1 && playerInput != 2) {
    return `please enter either "1" or "2" to chose dice combination. your dice roll were ${arrRollDice[0]} and ${arrRollDice[1]}`;
  }
  if (playerInput == 1) {
    console.log(`player choose combi 1`);
    playerChosenCombination = Number(arrRollDice[0] + arrRollDice[1]);

    return `your dice combination is ${playerChosenCombination}`;
  }
  if (playerInput == 2) {
    console.log(`player choose combi 2`);
    playerChosenCombination = Number(arrRollDice[1] + arrRollDice[0]);

    return `your dice combination is ${playerChosenCombination}`;
  }
};

// 1) there will be 2 players playing this game
// 2) when enter website. at Output box "click Submit to start". click submit
// 3) dice roll for player 1, return result dice 1 & dice 2. for example, 3 and 6
// 4) then player 1 choose dice combination order 1 or 2. for example, combi1 36 combi2 63
// 5) dice roll for player 2, return dice rolls result dice 1 & dice 2
// 6) then player 2 choose dice comindation order.
// 7) computer compare result for player 1 and player 2. the player with higher number wins.

// you need - global varibale for game modes, global varibale for current player, roll dice function for dice 1 and 2, global variable array to stall player 1 dice roll, convert dice roll to string
