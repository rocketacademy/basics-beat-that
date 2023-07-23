//Requirements
//There are 2 players and players take turns.
//When a player clicks Submit, the game rolls 2 dice and shows the dice rolls, for example 3 and 6.
//The player picks the order of the dice they want. For example, if they wanted the number 63, they would specify that the 2nd dice goes first. You can choose how the player specifies dice order.
//After both players have rolled and chosen dice order, the player with the higher combined number wins.

//1) a) create a dice game with 2 dices for player 1, b) let player 1 to choose which dice they want to be the first one.
//2) include player 2 and let them do same things as player 1
//3)compare the 2 dice rolls and announce the winner

//Global variables:
var GAME_STATE_ROLL_DICE = "GAME_STATE_ROLL_DICE ";
var GAME_STATE_CHOOSE_DICE_ORDER = "GAME_STATE_CHOOSE_DICE_ORDER";
var gameState = GAME_STATE_ROLL_DICE;

var playerRolls = []; //this array will store the player rolls
//Helper function "Roll the dice"
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceRoll = randomInteger + 1;
  return diceRoll;
};

//Helper function "Roll the dice x2"
var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice()); // adding dice rolls to the player rolls array on line 16
    counter = counter + 1;
  }
  console.log("dice rolls for player 1 ", playerRolls);
  return (
    "Welcome Player 1. You rolled " +
    playerRolls[0] +
    " and " +
    playerRolls[1] +
    ". Now please key in 1 or 2 to choose the corresponding dice as the first digit of your final value."
  );
};

var getPlayerFinalValue = function (input) {
  //input validation:
  if (input != 1 && input != 2) {
    console.log(input);
    console.log("Input is not 1 and not 2", input != 1 && input != 2);
    return (
      "Error! Please only key in 1 or 2 to choose which dice to use as the first digit. Your current dice rolls are " +
      playerRolls[0] +
      " as dice 1 and " +
      playerRolls[1] +
      " as dice 2."
    );
  }
  //condition 1 "if input == 1"
  if (input == 1) {
    console.log("input == 1 ", input == 1);
    var playerFinalValue = Number(`${playerRolls[0]}` + `${playerRolls[1]}`);
    return "Your final value is " + playerFinalValue + ".";
  }

  //condition 2 "if input == 2"
  if (input == 2) {
    console.log("input == 2 ", input == 2);
    var playerFinalValue = Number(`${playerRolls[1]}` + `${playerRolls[0]}`);
    return "Your final value is " + playerFinalValue + ".";
  }
};
var main = function (input) {
  console.log("Game state: ", gameState);
  var myOutputMessage = "";
  if (gameState == GAME_STATE_ROLL_DICE) {
    console.log(
      " game state = roll the dice ",
      gameState == GAME_STATE_ROLL_DICE
    );
    myOutputMessage = rollDiceForPlayer(); // call the roll dice x2 function
    //cnange the game state
    gameState = GAME_STATE_CHOOSE_DICE_ORDER;
    console.log("game state is choose the dice order ", gameState);
  } else if (gameState == GAME_STATE_CHOOSE_DICE_ORDER) {
    myOutputMessage = getPlayerFinalValue(input);
  }
  return myOutputMessage;
};
