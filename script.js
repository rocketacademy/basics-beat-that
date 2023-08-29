var GAME_STATE_DICE_ROLL = "GAME_STATE_DICE_ROLL";
var GAME_STATE_DICE_ORDER = "GAME_STATE_DICE_ORDER";
var modes = GAME_STATE_DICE_ROLL;
var playerRolls = [];

// generate a random integer between 1 to 6
var randomInteger = function () {
  return Math.floor(Math.random() * 6) + 1;
};

var randomDiceRoll = function () {
  playerRolls = [];
  var counter = 0;
  while (counter < 2) {
    var diceRoll = randomInteger();
    playerRolls.push(diceRoll);
    counter += 1;
  }
  modes = GAME_STATE_DICE_ORDER;
  return `dices roll! you rolled ${playerRolls[0]} and ${playerRolls[1]}.`;
};

var numberComparison = function (playerInput) {
  if (playerInput != 1 && playerInput != 2) {
    console.log(`if input != 1 && input != 2`);
    return `choose the order of the dice as the first numeral of the combined number.`;
  }
  if (playerInput == 1) {
    console.log(`if input == 1`);
    var combinedNumber = Number(
      String(playerRolls[0]) + String(playerRolls[1])
    );
    return `you chose dice 1 first. your combined number is ${combinedNumber}.`;
  }
  if (playerInput == 2) {
    console.log(`if input == 2`);
    var combinedNumber = Number(
      String(playerRolls[1]) + String(playerRolls[0])
    );
    return `you chose dice 2 first. your combined number is ${combinedNumber}.`;
  }
};

var main = function (input) {
  var myOutputValue = "";
  if (modes == GAME_STATE_DICE_ROLL) {
    console.log(modes);
    myOutputValue = randomDiceRoll();
    console.log(randomDiceRoll());
  }
  console.log(modes);
  myOutputValue = numberComparison(input);
  return myOutputValue;
};
