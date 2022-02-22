var gameModeDiceRoll = "game_state_dice_roll";
var gameStateChooseDiceOrder = "game_state_choose_dice";
var currentGameMode = "game_state_dice_roll";
var userName = "";

//create an array to store the values of the 2 dices
var playerRolls = [];

//creating helper function for dice roll
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal);
  var diceNumber = randomInteger + 1;
  return diceNumber;
};

//creating helper function to roll 2 dice
var rollDiceForPlayer = function () {
  var counter = 0;
  while (counter < 2) {
    playerRolls.push(rollDice());
    counter = counter + 1;
  }
  //after this step, ask player to choose the order
  return `Welcome ${userName}! <br> You rolled ${playerRolls[0]} for Dice 1 and ${playerRolls[1]} for Dice 2. <br> Please choose the dice number (either 1 or 2) to be your first digit of your final value.`;
};

var main = function (input) {
  if (currentGameMode == gameModeDiceRoll) {
    var myOutputValue = "";
    // set the name
    userName = input;
    // now that we have the name for player 1 and rolled 2 dices, switch the mode
    currentGameMode == gameStateChooseDiceOrder;
    myOutputValue = rollDiceForPlayer();
  }

  if (currentGameMode == gameStateChooseDiceOrder) {
    // input validation
    if (input != 1 && input != 2) {
      return `Error! Please only input "1" or "2" to choose your first digit of your final value. <br> Dice 1: ${playerRolls[0]} | Dice 2: ${playerRolls[1]}`;
    }

    // input == 1
    if (input == 1) {
      var playerFinalValue = Number(
        String(playerRolls[0]) + String(playerRolls[1])
      );
      return `${userName}, your final value is ${playerFinalValue}`;
    }

    // input == 2
    if (input == 2) {
      var playerFinalValue = Number(
        String(playerRolls[1]) + String(playerRolls[0])
      );
      return `${userName}, your final value is ${playerFinalValue}`;
    }
  }
};
